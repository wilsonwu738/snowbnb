import React, { useRef, useEffect } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './DayPickerWrapper.css'

function DayPickerWrapper({ selectedRange, setSelectedRange, showCalendar, setShowCalendar, onSelect, reservationRanges }) {
  
  const modifiers = {
    disabled: reservationRanges
  };

  const modifiersStyles = {
    disabled: {
      textDecoration: 'line-through',
      color: 'grey',
    },
  };



  return (
    <div>
        <DayPicker 
          mode="range"
          selected={selectedRange}
          onSelect={onSelect || setSelectedRange}
          modifiers={modifiers}
          modifiersStyles={modifiersStyles}
          numberOfMonths={2}
         
        />
    </div>
  );
}

export default DayPickerWrapper;

