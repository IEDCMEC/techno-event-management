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
  useColorMode,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { account } from '@/contexts/MyContext';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';
import { useAlert } from '@/hooks/useAlert';
import { StyledBox, StyledText } from '@/components/ui/StyledComponents';
import { inter } from '@/components/ui/fonts';

const OrganizationSettingsModal = ({ isOpen, onClose }) => {
  const { colorMode } = useColorMode();
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
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside" isCentered>
      <ModalOverlay />
      <ModalContent sx={{ minWidth: { base: '95vw', md: '75vw' } }} borderRadius="10px">
        <ModalHeader
          backgroundColor="#AFB4E9"
          p={6}
          borderTopLeftRadius="10px"
          borderTopRightRadius="10px"
          color="black"
        >
          <StyledText>Organization Settings</StyledText>
        </ModalHeader>
        <ModalCloseButton />

        <form onSubmit={handleSubmit}>
          <ModalBody backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}>
            <StyledBox
              flexDirection={{ base: 'column', md: 'row' }}
              width="95%"
              justifyContent="space-between"
              alignItems="flex-start"
              backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
            >
              <StyledBox
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                width="49%"
                backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
                ml={[0, 3]}
              >
                <FormControl id="orgName" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Organization Name</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="orgName"
                    value={formData.orgName}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="description" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Description</FormLabel>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                  />
                </FormControl>
                <FormControl id="logo" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Logo URL</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="logo"
                    value={formData.logo}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="tagline" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Tagline or Slogan</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Email Address</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="phone" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Phone Number</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="website" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Website</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="LinkedIn" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>LinkedIn</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="LinkedIn"
                    value={formData.LinkedIn}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="Instagram" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Instagram</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="Instagram"
                    value={formData.Instagram}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="Twitter" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Twitter</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="Twitter"
                    value={formData.Twitter}
                    onChange={handleChange}
                  />
                </FormControl>
              </StyledBox>
              <StyledBox
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                width="49%"
                backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
              >
                <Heading size="md" mt={6}>
                  <StyledText>Address</StyledText>
                </Heading>
                <FormControl id="City" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>City</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="City"
                    value={formData.City}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="State" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>State</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="State"
                    value={formData.State}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="Country" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Country</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="Country"
                    value={formData.Country}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="Pincode" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Pincode</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="Pincode"
                    value={formData.Pincode}
                    onChange={handleChange}
                  />
                </FormControl>
                <FormControl id="Location" isRequired>
                  <FormLabel fontFamily={inter.style.fontFamily}>Location URL</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    name="Location"
                    value={formData.Location}
                    onChange={handleChange}
                    isRequired
                  />
                </FormControl>
              </StyledBox>
            </StyledBox>
          </ModalBody>
          <ModalFooter
            backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
            borderBottomRadius="10px"
            pt={0}
          >
            <Button
              width="100%"
              backgroundColor="#AFB4E9"
              color="black"
              _hover={{ backgroundColor: '#D0D6F6 ' }}
              mr={3}
              type="submit"
            >
              <StyledText>Save</StyledText>
            </Button>
            <Button
              backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE1212'}
              mr={3}
              width="100%"
              variant="ghost"
              onClick={onClose}
            >
              <StyledText>Cancel</StyledText>
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default OrganizationSettingsModal;
