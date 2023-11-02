import React, { useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function DayPickerWrapper({ selectedRange, setSelectedRange, reservedDates, showCalendar, setShowCalendar, onSelect, alwaysShow }) {
  const calendarRef = useRef();

  const modifiers = {
    disabled: reservedDates.map(dateStr => new Date(dateStr))
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCalendar]);

  return (
    <div ref={calendarRef}>
      {(showCalendar || alwaysShow) && (
        <DayPicker 
          mode="range"
          selected={selectedRange}
          modifiers={modifiers}
          onSelect={onSelect}
          numberOfMonths={2}
        />
      )}
    </div>
  );
}

export default DayPickerWrapper;

