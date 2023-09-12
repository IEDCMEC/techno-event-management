import React from 'react';

const ParticipantCard = ({ name, email, avatar }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <img
        src={avatar}
        alt={`${name}'s avatar`}
        className="w-full h-40 object-cover object-center"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{name}</h2>
        <p className="text-gray-600">{email}</p>
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
          View Profile
        </button>
      </div>
    </div>
  );
};

export default ParticipantCard;
