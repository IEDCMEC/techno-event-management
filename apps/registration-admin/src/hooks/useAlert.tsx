import { useToast, ToastId } from '@chakra-ui/react';

interface AlertOptions {
  title: string;
  description?: string;
  status: 'info' | 'success' | 'warning' | 'error';
  duration?: number;
}

export const useAlert = () => {
  const toast = useToast();

  const showAlert = ({ title, description, status, duration = 3000 }: AlertOptions): ToastId => {
    return toast({
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
