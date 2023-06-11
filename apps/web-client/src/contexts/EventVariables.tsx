import React from 'react';
import { createContext } from 'react';
import { eventDummy, partDummy } from '@/Dummy/Events';
type context = {
  events: any;
  participants: any;
  setParticipants: Function;
  setEvents: Function;
};
export const eventContext = createContext<context>({
  events: eventDummy,
  setEvents: () => {},
  participants: partDummy,
  setParticipants: () => {},
});
const EventVariables = ({ children }: any) => {
  const [events, setEvents] = React.useState(eventDummy);
  const [participants, setParticipants] = React.useState(partDummy);
  return (
    <eventContext.Provider value={{ events, setEvents, participants, setParticipants }}>
      {children}
    </eventContext.Provider>
  );
};
export default EventVariables;
