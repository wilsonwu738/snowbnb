import React, { useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

function DayPickerWrapper({ selectedRange, setSelectedRange, reservedDates, showCalendar, setShowCalendar, onSelect, alwaysShow }) {
  

  const modifiers = {
    disabled: reservedDates.map(dateStr => new Date(dateStr))
  };



  return (
    <div>
        <DayPicker 
          mode="range"
          selected={selectedRange}
          onSelect={onSelect}
          modifiers={modifiers}
          numberOfMonths={2}
        />
    </div>
  );
}

export default DayPickerWrapper;

