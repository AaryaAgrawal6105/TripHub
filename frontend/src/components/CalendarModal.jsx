import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { twMerge } from "tailwind-merge";

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

  const addEvent = () => {
    if (!eventText.trim()) return;
    const key = getLocalDateKey(selectedDate);
    setEvents((prev) => ({
      ...prev,
      [key]: [
        ...(prev[key] || []),
        { text: eventText, color: getColor() }
      ]
    }));
    setEventText("");
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDayOfMonth = getFirstDayOfMonth(currentDate);
    const days = [];

    const prevMonthDays = getDaysInMonth(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    for (let i = prevMonthDays - firstDayOfMonth + 1; i <= prevMonthDays; i++) {
      days.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, i),
        isCurrentMonth: false
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        date: new Date(currentDate.getFullYear(), currentDate.getMonth(), i),
        isCurrentMonth: true
      });
    }

    const totalCells = 42;
    if (days.length < totalCells) {
      const nextMonthDays = totalCells - days.length;
      for (let i = 1; i <= nextMonthDays; i++) {
        days.push({
          date: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i),
          isCurrentMonth: false
        });
      }
    }

    return days;
  };

  const days = generateCalendarDays();
  const weekdays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
      <div className="fixed inset-0 bg-gradient-to-br from-amber-100/70 via-rose-100/70 to-blue-100/70" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white/90 backdrop-blur-md rounded-3xl w-full max-w-5xl p-6 relative shadow-2xl shadow-blue-200/50 border-2 border-white overflow-hidden transform scale-95 md:scale-[.98] lg:scale-100">

          <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-gradient-to-r from-amber-200/30 to-orange-300/30 blur-xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-gradient-to-r from-sky-200/30 to-blue-300/30 blur-xl"></div>

          <button
            className="absolute right-4 top-4 w-8 h-8 rounded-full bg-gradient-to-r from-rose-100 to-pink-200 flex items-center justify-center text-pink-500 hover:from-rose-200 hover:to-pink-300 shadow-sm border border-pink-100 hover:scale-105 transition-all"
            onClick={() => setIsOpen(false)}
          >
            <XMarkIcon className="w-4 h-4" />
          </button>

          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 tracking-tight">
              Trip Hub Calendar
            </h2>
            <p className="text-sm text-gray-600 mt-1 font-medium">
              Mark your travel moments ✈️
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-3/4 flex flex-col">
              <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-100 shadow-md w-full">
                <div className="flex items-center justify-between mb-4">
                  <button onClick={prevMonth} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronLeftIcon className="w-4 h-4 text-gray-600" />
                  </button>
                  <h3 className="text-lg font-bold text-gray-700">{formatMonthYear(currentDate)}</h3>
                  <button onClick={nextMonth} className="p-1 rounded-full hover:bg-gray-100 transition-colors">
                    <ChevronRightIcon className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-0.5 mb-1">
                  {weekdays.map((day) => (
                    <div key={day} className="text-center py-1 text-xs font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-0.5">
                  {days.map((day, index) => {
                    const key = getLocalDateKey(day.date);
                    const isSelected = getLocalDateKey(selectedDate) === key;
                    const hasEvent = events[key]?.length > 0;

                    return (
                      <button
                        key={index}
                        className={twMerge(
                          "h-12 flex flex-col items-center justify-center rounded-lg text-xs font-medium transition-all",
                          day.isCurrentMonth ? "text-gray-700" : "text-gray-400",
                          isSelected ? "bg-blue-100 ring-1 ring-blue-300" : "hover:bg-gray-100"
                        )}
                        onClick={() => {
                          setSelectedDate(day.date);
                          if (!day.isCurrentMonth) {
                            setCurrentDate(new Date(day.date.getFullYear(), day.date.getMonth(), 1));
                          }
                        }}
                      >
                        <span>{day.date.getDate()}</span>
                        {hasEvent && (
                          <div className={twMerge("w-1.5 h-1.5 rounded-full mt-0.5", events[key][0].color)} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <input
                  type="text"
                  placeholder={`✏️ What's happening on ${getLocalDateKey(selectedDate)}?`}
                  className="flex-1 border-0 bg-gray-100/70 rounded-lg px-3 py-2 shadow-inner focus:outline-none focus:ring-1 focus:ring-blue-300 placeholder:text-gray-500 text-sm font-medium"
                  value={eventText}
                  onChange={(e) => setEventText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addEvent()}
                />
                <button
                  onClick={addEvent}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-bold shadow transform hover:-translate-y-0.5 transition-all duration-150 text-sm"
                >
                  Add +
                </button>
              </div>
            </div>

            <div className="lg:w-1/4">
              {Object.keys(events).length > 0 ? (
                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100 shadow-sm h-full">
                  <h3 className="font-bold text-gray-700 text-base mb-2 pb-1 border-b border-gray-200">Your Plans:</h3>
                  <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1 py-1">
                    {Object.entries(events).map(([date, eventList]) => (
                      <div key={date} className="flex flex-col px-3 py-2 rounded-lg bg-gradient-to-r from-gray-50 to-white border border-gray-100 shadow-sm hover:shadow transition-all">
                        <span className="text-xs font-bold text-gray-700">{date}</span>
                        <div className="mt-1 space-y-1">
                          {eventList.map((event, idx) => (
                            <div key={idx} className={twMerge("text-xs px-3 py-1.5 rounded-full font-medium", event.color)}>
                              {event.text}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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

          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-300 via-rose-300 to-blue-300 rounded-b-3xl"></div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
