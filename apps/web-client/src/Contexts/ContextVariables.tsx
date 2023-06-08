import React from 'react';
import { createContext } from 'react';

type context = {
  open: boolean;
  setOpen: Function;
};
export const themeContext = createContext<context>({
  open: false,
  setOpen: () => {},
});
const ContextVariables = ({ children }: any) => {
  const [open, setOpen] = React.useState(false);
  return <themeContext.Provider value={{ open, setOpen }}>{children}</themeContext.Provider>;
};

export default ContextVariables;
