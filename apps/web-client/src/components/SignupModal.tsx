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
import { themeContext } from '@/contexts/ContextVariables';
import { useContext } from 'react';
import {
  FormControl,
  FormLabel,
  //   FormErrorMessage,
  //   FormHelperText,
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
  name: String;
}
const SignupModal = () => {
  const { setOpen2, open2, form, setForm, formError, setformError, constructor } =
    useContext(themeContext);
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setForm(data);
    console.log(data);

    let obj1Props = Object.keys(data);
    let obj2Props = Object.keys({ name: '', email: '', password: '' });
    console.log(obj1Props, obj2Props);
    if (obj1Props.length != obj2Props.length) {
      setformError(true);
    } else {
      // Compare the values of each property
      var allPropsAreEqual = true;
      for (let i = 0; i < obj1Props.length; i++) {
        let propName = obj1Props[i];
        if (
          data[propName as keyof IFormInput] !== form[propName as keyof {}] &&
          data[propName as keyof IFormInput] !== ''
        ) {
          allPropsAreEqual = false;
          break;
        }
      }
      if (allPropsAreEqual) {
        setformError(false);
      } else {
        setformError(true);
        // console.log(formError);
        setOpen2(false);
      }
    }
  };

  return (
    <>
      <Modal isOpen={open2} onClose={() => setOpen2(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <FormControl
              minHeight={['250px', '250px', '300px', '200px']}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
              isRequired
              // method={'POST'}
            >
              <Box width={'80%'} padding={'15px 0'}>
                <FormLabel>Name</FormLabel>
                <Input {...register('name')} placeholder="Enter your Name" />
              </Box>
              <Box width={'80%'} padding={'15px 0'}>
                <FormLabel>Email</FormLabel>
                <Input {...register('email')} type="email" placeholder="Enter Your Email" />
              </Box>
              <Box width={'80%'} padding={'15px 0'}>
                <FormLabel>Password</FormLabel>
                <Input
                  {...register('password')}
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
export default SignupModal;
