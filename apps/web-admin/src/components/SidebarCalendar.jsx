import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { inter } from './ui/fonts';

const SidebarCalendar = ({ scale }) => {
  const [date, setDate] = useState(new Date());
  return (
    <div style={{ marginTop: '10px' }}>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        scale={scale}
        className={`${inter.className}`}
      />
    </div>
  );
};

export default SidebarCalendar;
