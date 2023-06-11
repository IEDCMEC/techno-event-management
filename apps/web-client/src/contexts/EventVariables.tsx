import React from 'react';
import { createContext } from 'react';
import { eventDummy, partDummy } from '@/Dummy/Events';
type context = {
  events: any;
  participants: any;
  setParticipants: Function;
  setEvents: Function;
  checkPage: boolean;
  setcheckPage: Function;
};
export const eventContext = createContext<context>({
  events: eventDummy,
  setEvents: () => {},
  participants: partDummy,
  setParticipants: () => {},
  checkPage: false,
  setcheckPage: () => {},
});
const EventVariables = ({ children }: any) => {
  const [events, setEvents] = React.useState(eventDummy);
  const [participants, setParticipants] = React.useState(partDummy);
  const [checkPage, setcheckPage] = React.useState(false);
  return (
    <eventContext.Provider
      value={{ events, setEvents, participants, setParticipants, checkPage, setcheckPage }}
    >
      {children}
    </eventContext.Provider>
  );
};
export default EventVariables;
