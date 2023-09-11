import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-72 h-full p-4 flex flex-col justify-start items-start gap-4 text-2xl font-semibold tracking-wide text-neutral-500">
      <button>Events</button>
      <button>Settings</button>
    </div>
  );
};

export default Sidebar;
