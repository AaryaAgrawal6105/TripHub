// src/components/CalendarModal.jsx
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import {
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import { axiosInstance } from "../api";

const COLORS = [
  "bg-gradient-to-r from-sky-300 to-blue-500 text-white",
  "bg-gradient-to-r from-emerald-300 to-teal-500 text-white",
  "bg-gradient-to-r from-amber-300 to-orange-500 text-white",
  "bg-gradient-to-r from-violet-300 to-purple-500 text-white",
  "bg-gradient-to-r from-rose-300 to-pink-500 text-white",
];

function getColor() {
  return COLORS[Math.floor(Math.random() * COLORS.length)];
}

const getLocalDateKey = (date) =>
  date.toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

export default function CalendarModal({ isOpen, setIsOpen }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventText, setEventText] = useState("");
  const [events, setEvents] = useState({}); // { 'yyyy-mm-dd': [{_id, text, color}] }

  useEffect(() => {
    if (!isOpen) return;
    axiosInstance
      .get("/events")
      .then((res) => {
        const formatted = {};
        res.data
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .forEach(({ _id, date, text, color }) => {
            formatted[date] = formatted[date] || [];
            formatted[date].push({ _id, text, color });
          });
        setEvents(formatted);
      })
      .catch((err) => console.error("Failed to load events:", err));
  }, [isOpen]);

  const addEvent = async () => {
    const text = eventText.trim();
    const dateKey = getLocalDateKey(selectedDate);
    const todayKey = getLocalDateKey(new Date());

    if (!text) return;
    if (selectedDate < new Date(todayKey)) {
      alert("Cannot add events in the past.");
      return;
    }

    const color = getColor();

    try {
      const res = await axiosInstance.post("/events", {
        date: dateKey,
        text,
        color,
      });
      const newEvent = res.data;

      setEvents((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), newEvent],
      }));
      setEventText("");
    } catch (err) {
      console.error("Failed to add event:", err);
    }
  };

  const deleteEvent = async (eventId, dateKey) => {
    try {
      await axiosInstance.delete(`/events/${eventId}`);
      setEvents((prev) => {
        const updated = { ...prev };
        updated[dateKey] = updated[dateKey].filter((ev) => ev._id !== eventId);
        if (updated[dateKey].length === 0) delete updated[dateKey];
        return updated;
      });
    } catch (error) {
      console.error("Failed to delete event:", error);
    }
  };

  const getDaysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const prevMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    );
  const nextMonth = () =>
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    );

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    const days = [];
    const prevDays = getDaysInMonth(new Date(year, month - 1, 1));
    for (let i = prevDays - firstDayOfMonth + 1; i <= prevDays; i++) {
      days.push({ date: new Date(year, month - 1, i), isCurrentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }
    while (days.length < 42) {
      const nextDay = days.length - (firstDayOfMonth + daysInMonth) + 1;
      days.push({ date: new Date(year, month + 1, nextDay), isCurrentMonth: false });
    }
    return days;
  };

  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const todayKey = getLocalDateKey(new Date());

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="z-50 relative">
      <div className="fixed inset-0 bg-gradient-to-br from-yellow-100 via-rose-100 to-blue-100" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-5xl p-6 bg-white rounded-3xl shadow-xl backdrop-blur-md">
          {/* Close */}
          <button
            className="absolute top-4 right-4 bg-pink-200 p-2 rounded-full hover:scale-105 transition"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="w-4 h-4 text-pink-600" />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Adventure Planner
            </h2>
            <p className="text-gray-600 text-sm">Mark your travel moments ✈️</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Calendar */}
            <div className="lg:w-3/4">
              <div className="bg-white p-4 rounded-2xl shadow border">
                <div className="flex justify-between items-center mb-4">
                  <button onClick={prevMonth}>
                    <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="font-bold text-lg text-gray-800">
                    {currentDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}
                  </h3>
                  <button onClick={nextMonth}>
                    <ChevronRightIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 mb-1">
                  {weekdays.map((d) => (
                    <div key={d} className="text-xs text-center font-semibold text-gray-500">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1">
                  {generateCalendarDays().map((day, idx) => {
                    const key = getLocalDateKey(day.date);
                    const isSelected = getLocalDateKey(selectedDate) === key;
                    const isToday = key === todayKey;
                    const dayEvents = events[key] || [];

                    return (
                      <button
                        key={idx}
                        disabled={day.date < new Date(todayKey)}
                        className={twMerge(
                          "h-12 text-xs flex flex-col items-center justify-center rounded-md",
                          day.isCurrentMonth ? "text-gray-700" : "text-gray-400",
                          isSelected ? "bg-blue-200 ring-2 ring-blue-400" : "hover:bg-gray-100",
                          day.date < new Date(todayKey) ? "opacity-60 cursor-not-allowed" : ""
                        )}
                        onClick={() => setSelectedDate(day.date)}
                      >
                        <span>{day.date.getDate()}</span>
                        {dayEvents.length > 0 && (
                          <div className="flex mt-1 gap-0.5">
                            {dayEvents.map((ev, i) => (
                              <div
                                key={i}
                                className={twMerge("w-1.5 h-1.5 rounded-full", ev.color)}
                              />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Add Event */}
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  className="w-full border px-3 py-2 rounded shadow-sm text-sm"
                  placeholder={`What's happening on ${getLocalDateKey(selectedDate)}?`}
                  value={eventText}
                  onChange={(e) => setEventText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addEvent()}
                />
                <button
                  onClick={addEvent}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
                >
                  Add +
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              {Object.keys(events).length > 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100 shadow-sm h-full">
                  <h3 className="font-bold text-gray-700 text-base mb-2 pb-1 border-b border-gray-200">
                    Your Plans:
                  </h3>
                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 py-1">
                    {Object.entries(events)
                      .sort(
                        ([dateA], [dateB]) =>
                          new Date(dateA).getTime() - new Date(dateB).getTime()
                      )
                      .map(([date, evArr]) =>
                        evArr.map((ev, i) => (
                          <div
                            key={`${date}-${i}`}
                            className="flex flex-col px-3 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow transition-all"
                          >
                            <span className="text-xs font-bold text-gray-700">{date}</span>
                            <span
                              className={twMerge(
                                "mt-1 text-xs px-3 py-1.5 rounded-full font-medium",
                                ev.color
                              )}
                            >
                              {ev.text}
                            </span>
                          </div>
                        ))
                      )}
                  </div>
                </div>
              ) : (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-100 shadow-sm h-full flex flex-col items-center justify-center text-center">
                  <div className="bg-gray-200 border border-dashed rounded-lg w-12 h-12 mb-2" />
                  <h3 className="font-bold text-gray-700 text-base mb-1">No plans yet!</h3>
                  <p className="text-gray-500 text-xs">Add events to see them here</p>
                </div>
              )}
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
