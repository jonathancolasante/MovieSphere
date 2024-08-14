import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const generateEvents = (startDate, endDate) => {
  let events = [];
  let currentDate = new Date(startDate);
  
  while(currentDate <= endDate) {
    // Set 1: days with even date
    if(currentDate.getDate() % 2 === 0) {
      events.push(
        {
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 8, 0),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 10, 0),
        },
        {
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 14, 0),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 16, 0),
        },
        {
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0),
        }
      );
    } else {  // Set 2: days with odd date
      events.push(
        {
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 9, 0),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 11, 0),
        },
        {
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 13, 0),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 15, 0),
        },
        {
          start: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 17, 0),
          end: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 19, 0),
        }
      );
    }
    // Increase currentDate by 1 day
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return events;
};

// Generate events for 1 month starting from July 6, 2023
const events = generateEvents(new Date(2023, 6, 6), new Date(2023, 9, 6));

export default function MyCalendar() {

    const [currentDate, setCurrentDate] = useState(new Date());

    const handleNavigate = (newDate) => {
      // Prevent navigation if newDate is not in the current week
      if (moment(newDate).isSame(currentDate, 'week')) {
        setCurrentDate(newDate);
      }
    };

    const minTime = new Date();
    minTime.setHours(7, 0, 0);
    const maxTime = new Date();
    maxTime.setHours(22, 0, 0);

    return (
        <div style={{ height: 500 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500, margin: '50px', fontSize: '10px' }}
            defaultView='week'
            date={currentDate}
            onNavigate={handleNavigate}
            toolbar={false}
            min={minTime}
            max={maxTime}
          />
        </div>
      );
}
