import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';

const OrganizationSettingsModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    orgName: '',
    logo: '',
    tagline: '',
    description: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    socialLinks: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    console.log(formData);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Organization Settings</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl id="orgName" isRequired>
            <FormLabel>Organization Name</FormLabel>
            <Input name="orgName" value={formData.orgName} onChange={handleChange} />
          </FormControl>
          <FormControl id="logo">
            <FormLabel>Logo</FormLabel>
            <Input name="logo" value={formData.logo} onChange={handleChange} />
          </FormControl>
          <FormControl id="tagline">
            <FormLabel>Tagline or Slogan</FormLabel>
            <Input name="tagline" value={formData.tagline} onChange={handleChange} />
          </FormControl>
          <FormControl id="description">
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </FormControl>
          <FormControl id="address" isRequired>
            <FormLabel>Address</FormLabel>
            <Input name="address" value={formData.address} onChange={handleChange} />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input name="phone" value={formData.phone} onChange={handleChange} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="website">
            <FormLabel>Website</FormLabel>
            <Input name="website" value={formData.website} onChange={handleChange} />
          </FormControl>
          <FormControl id="socialLinks">
            <FormLabel>Social Media Links</FormLabel>
            <Input name="socialLinks" value={formData.socialLinks} onChange={handleChange} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default OrganizationSettingsModal;
