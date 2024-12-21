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
import { Columns } from 'lucide-react';

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
  const handleSubmit = async () => {
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
      // const response = await post('/organization/update', {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(payload),
      // });
      updateOrgDeets(payload);
      // if (response.ok) {
      //   alert('Organization details updated successfully!');
      //   onClose();
      // } else {
      //   const data = await response.json();
      //   alert(`Error: ${data.error}`);
      // }
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
      <ModalContent borderRadius="10" maxWidth="60%" minW={250}>
        <ModalHeader backgroundColor="#AFB4E9" borderRadius={['10px', '10px', '0', '0']} p={4}>
          Organization Settings
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody backgroundColor="#EEEFFF" p={8}>
          <Box
            display="flex"
            flexDirection="row"
            width={'100%'}
            justifyContent="space-evenly"
            sx={{
              '@media (max-width: 1175px)': {
                flexDirection: 'column',
              },
            }}
          >
            <Flex direction="column">
              <FormControl id="orgName" isRequired>
                <FormLabel>Organization Name</FormLabel>
                <Input
                  name="orgName"
                  value={formData.orgName}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="description" isRequired>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="logo">
                <FormLabel>Logo URL</FormLabel>
                <Input
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="tagline">
                <FormLabel>Tagline or Slogan</FormLabel>
                <Input
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email Address</FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="phone" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="website" isRequired>
                <FormLabel>Website</FormLabel>
                <Input
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
            </Flex>
            <Flex direction="column">
              <FormControl id="LinkedIn">
                <FormLabel>LinkedIn</FormLabel>
                <Input
                  name="LinkedIn"
                  value={formData.LinkedIn}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="Instagram">
                <FormLabel>Instagram</FormLabel>
                <Input
                  name="Instagram"
                  value={formData.Instagram}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="Twitter">
                <FormLabel>Twitter</FormLabel>
                <Input
                  name="Twitter"
                  value={formData.Twitter}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <Heading size="md" mt={6}>
                Address
              </Heading>
              <FormControl id="City" isRequired>
                <FormLabel>City</FormLabel>
                <Input
                  name="City"
                  value={formData.City}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="State" isRequired>
                <FormLabel>State</FormLabel>
                <Input
                  name="State"
                  value={formData.State}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="Country" isRequired>
                <FormLabel>Country</FormLabel>
                <Input
                  name="Country"
                  value={formData.Country}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="Pincode" isRequired>
                <FormLabel>Pincode</FormLabel>
                <Input
                  name="Pincode"
                  value={formData.Pincode}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
              <FormControl id="Location" isRequired>
                <FormLabel>Location URL</FormLabel>
                <Input
                  name="Location"
                  value={formData.Location}
                  onChange={handleChange}
                  backgroundColor="#D9DAE4"
                  minW={['auto', 'auto', '350']}
                />
              </FormControl>
            </Flex>
          </Box>
        </ModalBody>
        <ModalFooter backgroundColor="#EEEFFF">
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} backgroundColor="#AFB4E9">
            Save
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
