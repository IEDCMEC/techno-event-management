import React from 'react';
import { createContext } from 'react';
import { useDisclosure } from '@chakra-ui/react';
interface Signup {
  Name: String;
  Password: String;
  Email: String;
}
type context = {
  open: boolean;
  setOpen: Function;
  form: Signup;
  setForm: Function;
  formError: boolean;
  setformError: Function;
  open2: boolean;
  setOpen2: Function;
  routeChange: boolean;
  setrouteChange: Function;
  constructor: any;
  route: string;
  setRoute: Function;
};
let constructor =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const themeContext = createContext<context>({
  open: false,
  setOpen: () => {},
  form: { Name: '', Email: '', Password: '' },
  setForm: () => {},
  formError: true,
  setformError: () => {},
  open2: false,
  routeChange: false,
  setrouteChange: () => {},
  setOpen2: () => {},
  route: '/',
  setRoute: () => {},
});
const ContextVariables = ({ children }: any) => {
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [form, setForm] = React.useState({ Name: '', Email: '', Password: '' });
  const [formError, setformError] = React.useState(true);
  const [routeChange, setrouteChange] = React.useState(false);
  const [route, setRoute] = React.useState('/');
  return (
    <themeContext.Provider
      value={{
        open,
        setOpen,
        form,
        setForm,
        formError,
        setformError,
        open2,
        setOpen2,
        constructor,
        routeChange,
        setrouteChange,
        route,
        setRoute,
      }}
    >
      {children}
    </themeContext.Provider>
  );
};
export default ContextVariables;
