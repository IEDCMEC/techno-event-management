import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { themeContext } from '@/Contexts/ContextVariables';
import { useContext } from 'react';
import {
  FormControl,
  FormLabel,
  // FormErrorMessage,
  // FormHelperText,
  Input,
  Box,
} from '@chakra-ui/react';
// enum GenderEnum {
//   female = 'female',
//   male = 'male',
//   other = 'other',
// }

interface IFormInput {
  email: String;
  password: String;
}
const SigninModal = () => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };
  const { setOpen, open } = useContext(themeContext);
  return (
    <>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <FormControl
              minHeight={['250px', '250px', '300px', '200px']}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Box width={'80%'} padding={'15px 0'}>
                <FormLabel>Email</FormLabel>
                <Input
                  {...register('email')}
                  isRequired
                  type="email"
                  placeholder="Enter Your Email"
                />
              </Box>
              <Box width={'80%'} padding={'15px 0'}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register('password')}
                  isRequired
                  type="password"
                  placeholder="Enter Your password"
                />
              </Box>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
            {/* <Button variant="ghost">Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SigninModal;
