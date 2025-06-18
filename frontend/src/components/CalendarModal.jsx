// src/components/CalendarModal.jsx
import React, { useState, useEffect } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";
import { axiosInstance } from "../api";  // your configured instance

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
  const [events, setEvents] = useState({});

  // 1️⃣ Fetch events when modal opens
  useEffect(() => {
    if (!isOpen) return;
    axiosInstance
      .get("/events")
      .then((res) => {
        // res.data: [{ _id, userId, date, text, color }, ...]
        const formatted = {};
        res.data.forEach(({ date, text, color }) => {
          formatted[date] = formatted[date] || [];
          formatted[date].push({ text, color });
        });
        setEvents(formatted);
      })
      .catch((err) => console.error("Failed to load events:", err));
  }, [isOpen]);

  // 2️⃣ Add a new event
  const addEvent = async () => {
    const text = eventText.trim();
    if (!text) return;

    const dateKey = getLocalDateKey(selectedDate);
    const color = getColor();

    try {
      await axiosInstance.post("/events", { date: dateKey, text, color });
      setEvents((prev) => ({
        ...prev,
        [dateKey]: [...(prev[dateKey] || []), { text, color }],
      }));
      setEventText("");
    } catch (err) {
      console.error("Failed to add event:", err);
    }
  };

  // Calendar utility functions
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

  const formatMonthYear = (date) =>
    date.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);

    const days = [];

    // previous month's tail
    const prevDays = getDaysInMonth(new Date(year, month - 1, 1));
    for (let i = prevDays - firstDayOfMonth + 1; i <= prevDays; i++) {
      days.push({ date: new Date(year, month - 1, i), isCurrentMonth: false });
    }

    // current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    // next month's head
    while (days.length < 42) {
      const nextDay = days.length - (firstDayOfMonth + daysInMonth) + 1;
      days.push({ date: new Date(year, month + 1, nextDay), isCurrentMonth: false });
    }

    return days;
  };

  const days = generateCalendarDays();
  const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-gradient-to-br from-amber-100/70 via-rose-100/70 to-blue-100/70" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white/90 backdrop-blur-md rounded-3xl w-full max-w-5xl p-6 relative shadow-2xl border-2 border-white transform scale-[0.95] md:scale-100">
          {/* Decorative blobs */}
          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-amber-200/30 to-orange-300/30 blur-xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-r from-sky-200/30 to-blue-300/30 blur-xl" />

          {/* Close button */}
          <button
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gradient-to-r from-rose-100 to-pink-200 flex items-center justify-center text-pink-500 border border-pink-100 hover:scale-105 transition-all"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>

          {/* Title */}
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-tight">
              Adventure Planner
            </h2>
            <p className="text-sm text-gray-600 mt-1 font-medium">
              Mark your travel moments ✈️
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Calendar */}
            <div className="lg:w-3/4">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100">
                    <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                  </button>
                  <h3 className="text-lg font-bold text-gray-700">
                    {formatMonthYear(currentDate)}
                  </h3>
                  <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100">
                    <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Weekday labels */}
                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {weekdays.map((d) => (
                    <div key={d} className="text-center py-1 text-xs font-medium text-gray-500">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Days */}
                <div className="grid grid-cols-7 gap-0.5">
                  {days.map((day, idx) => {
                    const key = getLocalDateKey(day.date);
                    const isSelected = getLocalDateKey(selectedDate) === key;
                    const dayEvents = events[key] || [];

                    return (
                      <button
                        key={idx}
                        className={twMerge(
                          "h-12 flex flex-col items-center justify-center rounded-lg text-xs font-medium",
                          day.isCurrentMonth ? "text-gray-700" : "text-gray-400",
                          isSelected ? "bg-blue-100 ring-1 ring-blue-300" : "hover:bg-gray-100"
                        )}
                        onClick={() => {
                          setSelectedDate(day.date);
                          if (!day.isCurrentMonth) {
                            setCurrentDate(
                              new Date(day.date.getFullYear(), day.date.getMonth(), 1)
                            );
                          }
                        }}
                      >
                        <span>{day.date.getDate()}</span>
                        {dayEvents.length > 0 && (
                          <div className="mt-0.5 flex gap-0.5 flex-wrap justify-center">
                            {dayEvents.map((ev, i) => (
                              <div key={i} className={twMerge("w-1.5 h-1.5 rounded-full", ev.color)} />
                            ))}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Input + Add */}
              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder={`✏️ What's happening on ${getLocalDateKey(selectedDate)}?`}
                  className="flex-1 border-0 bg-gray-100/70 rounded-lg px-3 py-2 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-300 placeholder:text-gray-500 text-sm font-medium"
                  value={eventText}
                  onChange={(e) => setEventText(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addEvent()}
                />
                <button
                  onClick={addEvent}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-bold shadow transform hover:-translate-y-0.5 transition-all duration-150 text-sm"
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
                    {Object.entries(events).map(([date, evArr]) =>
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

          {/* Bottom stripe */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-rose-300 to-blue-300 rounded-b-3xl" />
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
