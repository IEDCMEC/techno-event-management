import React from 'react';
import { createContext } from 'react';
import { useDisclosure } from '@chakra-ui/react';
type context = {
  open: boolean;
  setOpen: Function;
};
export const themeContext = createContext<context>({
  open: false,
  setOpen: () => {},
});
export default function ContextVariables({ children }: any) {
  const [open, setOpen] = React.useState(false);
  return <themeContext.Provider value={{ open, setOpen }}>{children}</themeContext.Provider>;
}
