import { ChakraProvider } from '@chakra-ui/react';
import Form from './Form';

const App = () => {
  return (
    <ChakraProvider>
      <Form />
    </ChakraProvider>
  );
};

export default App;
