import React from 'react';

const EventCard = () => {
  return (
    <div className="h-fit w-[80%] md:w-[30%] bg-[#252B3C] flex flex-col py-4 px-4 justify-center items-center">
      <div className="flex justify-center items-center bg-[#252B3C] w-full h-fit">
        <img src="/event_image.svg" height="140" width="150" alt="event image" />
      </div>
      <div className="flex items-start w-full h-fit py-0.5">
        <h1 className="text-blue-400 font-bold text-2xl">Technohack</h1>
      </div>

      <div className="flex items-start flex-row w-full h-full py-0.5">
        <p className="text-white font-semibold text-lg">Venue:</p>
      </div>
      <div className="flex items-start w-full h-fit pb-4">
        <p className="text-white font-light">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </div>

      <div className="w-[40%] h-fit bg-blue-400 rounded-sm flex justify-center items-center py-1">
        <button>Register</button>
      </div>
    </div>
  );
};

export default EventCard;
