import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react';
import { StyledText } from '@/components/ui/StyledComponents';
import { inter } from '@/components/ui/fonts';

const AddParticipant = ({ isOpen, onClose, formData, handleInputChange, handleSubmit }) => {
  const { colorMode } = useColorMode();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" scrollBehavior="outside" isCentered>
      <ModalOverlay />
      <ModalContent maxW="700px" h="585px" borderRadius="10px">
        <ModalHeader
          backgroundColor="#AFB4E9"
          p={6}
          borderTopLeftRadius="10px"
          borderTopRightRadius="10px"
          color="black"
        >
          <StyledText color="black">Add Participant</StyledText>
        </ModalHeader>
        <ModalCloseButton />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <ModalBody backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}>
            <FormControl mb={4} isRequired>
              <FormLabel fontFamily={inter.style.fontFamily}>First Name</FormLabel>
              <Input
                backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel fontFamily={inter.style.fontFamily}>Last Name</FormLabel>
              <Input
                backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel fontFamily={inter.style.fontFamily}>Email</FormLabel>
              <Input
                backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel fontFamily={inter.style.fontFamily}>Phone</FormLabel>
              <Input
                backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel fontFamily={inter.style.fontFamily}>Check In Key</FormLabel>
              <Input
                backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                name="checkInKey"
                value={formData.checkInKey}
                onChange={handleInputChange}
                placeholder="Check In Key"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter
            backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
            borderBottomRadius="10px"
            pt={0}
          >
            <Button
              width="100%"
              colorScheme="blue"
              // onClick={handleSubmit}
              backgroundColor="#AFB4E9"
              type="submit"
              color="black"
              _hover={{ backgroundColor: '#D0D6F6 ' }}
            >
              <StyledText>Submit</StyledText>
            </Button>
            <Button
              backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE1212'}
              width="100%"
              onClick={onClose}
              ml={3}
            >
              <StyledText>Cancel</StyledText>
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default AddParticipant;
