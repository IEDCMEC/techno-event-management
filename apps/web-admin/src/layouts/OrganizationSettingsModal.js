import React, { useState, useEffect } from 'react';
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
  Box,
  Flex,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { account } from '@/contexts/MyContext';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';
import { useAlert } from '@/hooks/useAlert';
import { StyledBox } from '@/components/ui/StyledComponents';

const OrganizationSettingsModal = ({ isOpen, onClose }) => {
  const { accountDetails, setAccountDetails, setAllAccounts, allAccounts } = useContext(account);
  useEffect(() => {
    // //console.log(accountDetails);
    setFormData({
      orgName: accountDetails.name,
      logo: accountDetails.Logo,
      tagline: accountDetails.Tagline,
      description: accountDetails.Description,
      // address: ,
      phone: accountDetails.phoneNo,
      email: accountDetails.email,
      website: accountDetails.website,
      // socialLinks: ,
      LinkedIn: accountDetails.linkedInLink,
      Instagram: accountDetails.instagramLink,
      Twitter: accountDetails.twitterLink,
      City: accountDetails.addressData
        ? accountDetails.addressData.city
          ? accountDetails.addressData.city
          : ''
        : '',
      State: accountDetails.addressData
        ? accountDetails.addressData.state
          ? accountDetails.addressData.state
          : ''
        : '',
      Country: accountDetails.addressData
        ? accountDetails.addressData.country
          ? accountDetails.addressData.country
          : ''
        : '',
      Pincode: accountDetails.addressData
        ? `${accountDetails.addressData.pinCode}`
          ? `${accountDetails.addressData.pinCode}`
          : ''
        : '',
      Location: accountDetails.addressData
        ? accountDetails.addressData.locationUrl
          ? accountDetails.addressData.locationUrl
          : ''
        : '',
      orgId: accountDetails ? accountDetails.orgId : null,
    });
  }, [accountDetails]);
  const { usePostMutation } = useWrapper();

  const [formData, setFormData] = useState({
    orgName: accountDetails.name,
    logo: accountDetails.Logo,
    tagline: accountDetails.Tagline,
    description: accountDetails.Description,
    // address: ,
    phone: accountDetails.phoneNo,
    email: accountDetails.email,
    website: accountDetails.website,
    // socialLinks: ,
    LinkedIn: accountDetails.linkedInLink,
    Instagram: accountDetails.instagramLink,
    Twitter: accountDetails.twitterLink,
    City: accountDetails.addressData
      ? accountDetails.addressData.city
        ? accountDetails.addressData.city
        : ''
      : '',
    State: accountDetails.addressData
      ? accountDetails.addressData.state
        ? accountDetails.addressData.state
        : ''
      : '',
    Country: accountDetails.addressData
      ? accountDetails.addressData.country
        ? accountDetails.addressData.country
        : ''
      : '',
    Pincode: accountDetails.addressData
      ? `${accountDetails.addressData.pinCode}`
        ? `${accountDetails.addressData.pinCode}`
        : ''
      : '',
    Location: accountDetails.addressData
      ? accountDetails.addressData.locationUrl
        ? accountDetails.addressData.locationUrl
        : ''
      : '',
    orgId: accountDetails ? accountDetails.orgId : null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const showAlert = useAlert();
  const { mutate: updateOrgDeets } = usePostMutation(
    '/core/organizations/update',
    {},
    {
      onError: (response) => {
        showAlert({
          title: 'Failure',
          description: `Error: ${response.data.error}`,
          status: 'error',
        });
        onClose();
      },
      invalidateKeys: ['/core/organizations'],
    },
    (response) => {
      showAlert({
        title: 'Success',
        description: 'Organization details updated successfully!',
        status: 'success',
      });
      //console.log(response.data.data);
      setAllAccounts(() => {
        // console.log('left: ', response.data.data.data.id)
        const filteredOut = allAccounts.filter(
          (value) => value.id !== response.data.data.newDetails.id,
        );
        // console.log(filteredOut.length);
        return [
          ...filteredOut,
          {
            ...response.data.data.newDetails,
            orgId: response.data.data.newDetails.id,
            role: accountDetails.role,
          },
        ];
      });
      setAccountDetails({ ...response.data.data.newDetails, role: accountDetails.role });
      onClose();
    },
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      orgId: formData.orgId, // Ensure orgId is available
      name: formData.orgName,
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
    // const {post} = useFetch();
    try {
      if (!Object.values(payload).includes('')) {
        updateOrgDeets(payload);
      }
    } catch (error) {
      console.error('Error updating organization:', error);
      alert('An error occurred while updating organization details.');
    }
  };
  useEffect(() => {
    console.log(allAccounts);
  }, [allAccounts]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent sx={{ minWidth: { base: '95vw', md: '75vw' } }}>
        <ModalHeader>Organization Settings</ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit}>
          <ModalBody>
            <StyledBox
              flexDirection={{ base: 'column', md: 'row' }}
              width="95%"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <StyledBox
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                width="49%"
              >
                <FormControl id="orgName" isRequired>
                  <FormLabel>Organization Name</FormLabel>
                  <Input name="orgName" value={formData.orgName} onChange={handleChange} />
                </FormControl>
                <FormControl id="description" isRequired>
                  <FormLabel>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="logo" isRequired>
                  <FormLabel>Logo URL</FormLabel>
                  <Input name="logo" value={formData.logo} onChange={handleChange} />
                </FormControl>
                <FormControl id="tagline" isRequired>
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
                <FormControl id="website" isRequired>
                  <FormLabel>Website</FormLabel>
                  <Input name="website" value={formData.website} onChange={handleChange} />
                </FormControl>
                <FormControl id="LinkedIn" isRequired>
                  <FormLabel>LinkedIn</FormLabel>
                  <Input name="LinkedIn" value={formData.LinkedIn} onChange={handleChange} />
                </FormControl>
                <FormControl id="Instagram" isRequired>
                  <FormLabel>Instagram</FormLabel>
                  <Input name="Instagram" value={formData.Instagram} onChange={handleChange} />
                </FormControl>
                <FormControl id="Twitter" isRequired>
                  <FormLabel>Twitter</FormLabel>
                  <Input name="Twitter" value={formData.Twitter} onChange={handleChange} />
                </FormControl>
              </StyledBox>
              <StyledBox
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                width="49%"
              >
                <Heading size="md" mt={6}>
                  Address
                </Heading>
                <FormControl id="City" isRequired>
                  <FormLabel>City</FormLabel>
                  <Input name="City" value={formData.City} onChange={handleChange} />
                </FormControl>
                <FormControl id="State" isRequired>
                  <FormLabel>State</FormLabel>
                  <Input name="State" value={formData.State} onChange={handleChange} />
                </FormControl>
                <FormControl id="Country" isRequired>
                  <FormLabel>Country</FormLabel>
                  <Input name="Country" value={formData.Country} onChange={handleChange} />
                </FormControl>
                <FormControl id="Pincode" isRequired>
                  <FormLabel>Pincode</FormLabel>
                  <Input name="Pincode" value={formData.Pincode} onChange={handleChange} />
                </FormControl>
                <FormControl id="Location" isRequired>
                  <FormLabel>Location URL</FormLabel>
                  <Input
                    name="Location"
                    value={formData.Location}
                    onChange={handleChange}
                    isRequired
                  />
                </FormControl>
              </StyledBox>
            </StyledBox>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} type="submit">
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default OrganizationSettingsModal;
