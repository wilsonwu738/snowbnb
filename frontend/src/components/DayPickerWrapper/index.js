import React from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import './DayPickerWrapper.css';
import { startOfDay } from 'date-fns';

function DayPickerWrapper({ selectedRange, setSelectedRange, showCalendar, setShowCalendar, onSelect, reservationRanges }) {
  
  const today = startOfDay(new Date());

  const modifiers = {
    disabled: [...reservationRanges, {before: today}]
  };

  const modifiersStyles = {
    disabled: {
      textDecoration: 'line-through',
      color: 'grey',
    },
    selected: {
      backgroundColor: 'lightgrey',
      color: 'black',
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

