import { useToast } from '@chakra-ui/react';

export const useAlert = () => {
  const toast = useToast();

  const showAlert = ({ title, description, status, duration = 3000 }) => {
    toast({
      title,
      description,
      status,
      duration,
      isClosable: true,
      position: 'top-right',
    });
  };

  return showAlert;
};
