import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

const SidebarCalendar = ({ scale }) => {
  const [date, setDate] = useState(new Date());
  return (
    <div style={{ marginTop: '10px' }}>
      <Calendar mode="single" selected={date} onSelect={setDate} scale={scale} />
    </div>
  );
};

export default SidebarCalendar;
