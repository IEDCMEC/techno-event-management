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
  Heading,
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
    LinkedIn: '',
    Instagram: '',
    Twitter: '',
    City: '',
    State: '',
    Country: '',
    Pincode: '',
    Location: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const payload = {
      orgId: formData.orgId, // Ensure orgId is available
      description: formData.description,
      logo: formData.logo,
      tagline: formData.tagline,
      email: formData.email,
      linkedInLink: formData.LinkedIn,
      instagramLink: formData.Instagram,
      phoneNo: formData.phone,
      twitter: formData.Twitter,
      website: formData.website,
      addressDetails: {
        name: formData.AddressName,
        city: formData.City,
        state: formData.State,
        country: formData.Country,
        pincode: formData.Pincode,
        locationUrl: formData.Location,
      },
    };

    try {
      const response = await fetch('/organization/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('Organization details updated successfully!');
        onClose();
      } else {
        const data = await response.json();
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error updating organization:', error);
      alert('An error occurred while updating organization details.');
    }
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
          <FormControl id="description" is isRequired>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={formData.description} onChange={handleChange} />
          </FormControl>
          <FormControl id="logo">
            <FormLabel>Logo URL</FormLabel>
            <Input name="logo" value={formData.logo} onChange={handleChange} />
          </FormControl>
          <FormControl id="tagline">
            <FormLabel>Tagline or Slogan</FormLabel>
            <Input name="tagline" value={formData.tagline} onChange={handleChange} />
          </FormControl>
          <FormControl id="email" isRequired>
            <FormLabel>Email Address</FormLabel>
            <Input name="email" value={formData.email} onChange={handleChange} />
          </FormControl>
          <FormControl id="phone" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input name="phone" value={formData.phone} onChange={handleChange} />
          </FormControl>
          <FormControl id="website" is isRequired>
            <FormLabel>Website</FormLabel>
            <Input name="website" value={formData.website} onChange={handleChange} />
          </FormControl>
          <FormControl id="LinkedIn">
            <FormLabel>LinkedIn</FormLabel>
            <Input name="LinkedIn" value={formData.LinkedIn} onChange={handleChange} />
          </FormControl>
          <FormControl id="Instagram">
            <FormLabel>Instagram</FormLabel>
            <Input name="Instagram" value={formData.Instagram} onChange={handleChange} />
          </FormControl>
          <FormControl id="Twitter">
            <FormLabel>Twitter</FormLabel>
            <Input name="Twitter" value={formData.Twitter} onChange={handleChange} />
          </FormControl>
          <Heading size="md" mt={6}>
            Address
          </Heading>
          <FormControl id="City" is isRequired>
            <FormLabel>City</FormLabel>
            <Input name="City" value={formData.City} onChange={handleChange} />
          </FormControl>
          <FormControl id="State" is isRequired>
            <FormLabel>State</FormLabel>
            <Input name="State" value={formData.State} onChange={handleChange} />
          </FormControl>
          <FormControl id="Country" is isRequired>
            <FormLabel>Country</FormLabel>
            <Input name="Country" value={formData.Country} onChange={handleChange} />
          </FormControl>
          <FormControl id="Pincode" is isRequired>
            <FormLabel>Pincode</FormLabel>
            <Input name="Pincode" value={formData.Pincode} onChange={handleChange} />
          </FormControl>
          <FormControl id="Location" is isRequired>
            <FormLabel>Location URL</FormLabel>
            <Input name="Location" value={formData.Location} onChange={handleChange} />
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
