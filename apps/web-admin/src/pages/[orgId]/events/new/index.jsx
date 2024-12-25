import { useState } from 'react';
import { useRouter } from 'next/router';

import {
  Button,
  FormControl,
  FormLabel,
  Box,
  Input,
  Textarea,
  Select,
  FormErrorMessage,
} from '@chakra-ui/react';

import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';

export default function NewEvent() {
  const { loading, post } = useFetch();
  const showAlert = useAlert();

  const router = useRouter();
  const { orgId } = router.query;

  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('Public');
  const [venue, setVenue] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState();
  const [eventlogo, setEventlogo] = useState(null);
  const [coverimg, setCoverimg] = useState(null);
  const [regimg, setRegimg] = useState(null);
  const [locationUrl, setLocationUrl] = useState(null);
  // const [formData, setFormData] = useState({
  //   name: '',
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   desc: '',
  //   type: 'Public',
  //   venue: '',
  //   street: '',
  //   city: '',
  //   state: '',
  //   country: '',
  //   pincode: null,
  //   eventlogo: null,
  //   coverimg: null,
  //   regimg: null,
  // });
  const [formErrors, setFormErrors] = useState({
    name: '',
    startDate: '',
    endDate: '',
    desc: '',
    venue: '',
    street: '',
    city: '',
    state: '',
    country: '',
    pincode: '',
    eventlogo: '',
    coverimg: '',
    regimg: '',
    locationUrl: '',
  });

  const validateForm = () => {
    let errors = {};
    if (!name) {
      errors.name = 'Name required';
    }
    if (!startDate) {
      errors.startDate = 'Start date required';
    } else if (new Date(startDate) < new Date()) {
      errors.startDate = 'Start date cannot be in the past';
    }
    if (!endDate) {
      errors.endDate = 'End date required';
    } else if (new Date(endDate) < new Date(startDate)) {
      errors.endDate = 'End date cannot be before start date';
    }
    if (!desc) {
      errors.desc = 'Description required';
    }
    if (!venue) {
      errors.venue = 'Venue required';
    }
    if (!street) {
      errors.street = 'Street required';
    }
    if (!city) {
      errors.city = 'City required';
    }
    if (!state) {
      errors.state = 'State required';
    }
    if (!country) {
      errors.country = 'Country required';
    }
    if (!pincode || pincode.length !== 6) {
      errors.pincode = 'Pincode must be a valid 6-digit number';
    }
    if (!eventlogo) {
      errors.eventlogo = 'Event logo required';
    }
    if (!coverimg) {
      errors.coverimg = 'Cover image required';
    }
    if (!regimg) {
      errors.regimg = 'Registration form background required';
    }
    const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(:\d+)?(\/[^\s]*)?$/;
    if (!locationUrl) {
      errors.locationUrl = 'Google Maps link required!!';
    }
    if (urlRegex.test(locationUrl)) {
      errors.locationUrl = 'Enter valid Google Maps link';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const { usePostMutation } = useWrapper();
  const { mutate: handleSubmitMutation } = usePostMutation(
    `/core/organizations/${orgId}/events`,
    {},
    {
      onError: () => {
        showAlert({
          title: 'Error',
          description: data.error,
          status: 'error',
        });
      },
      invalidateKeys: [`/core/organizations/${orgId}/events`],
    },
    (response) => {
      showAlert({
        title: 'Success',
        description: 'Event has been created successfully.',
        status: 'success',
      });
      router.push(`/${orgId}/events`);
      console.log(response.data, 'Event addition');
      onClose();
    },
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    handleSubmitMutation({
      name,
      startDate,
      endDate,
      desc,
      type,
      venue,
      street,
      city,
      state,
      country,
      pincode,
      eventlogo,
      coverimg,
      regimg,
      locationUrl,
    });
    // const { data, status } = await post(
    //   `/core/organizations/${orgId}/events`,
    //   {},
    //   {
    //     name,
    //     startDate,
    //     endDate,
    //     desc,
    //     type,
    //     venue,
    //     street,
    //     city,
    //     state,
    //     country,
    //     pincode,
    //     eventlogo,
    //     coverimg,
    //     regimg,
    //   },
    // );
    // if (status === 200) {
    //   showAlert({
    //     title: 'Success',
    //     description: 'Event has been created successfully.',
    //     status: 'success',
    //   });
    //   router.push(`/${orgId}/events`);
    // } else {
    //   showAlert({
    //     title: 'Error',
    //     description: data.error,
    //     status: 'error',
    //   });
    // }
  };

  return (
    <Box sx={{ maxHeight: '80vh', overflowY: 'auto', padding: '10px' }}>
      <Box
        as="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: { base: 'column', md: 'row' },
            width: '95%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
              width: { base: '100%', md: '49%' },
            }}
          >
            <FormControl isRequired my={4} isInvalid={formErrors.name}>
              <FormLabel>Name</FormLabel>
              <Input
                type="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.name}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={4} isInvalid={formErrors.startDate}>
              <FormLabel>Start Date</FormLabel>
              <Input
                type="datetime-local"
                name="startDate"
                value={startDate}
                onChange={(e) => {
                  setStartDate(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.startDate}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={4} isInvalid={formErrors.endDate}>
              <FormLabel>End Date</FormLabel>
              <Input
                type="datetime-local"
                name="endDate"
                value={endDate}
                onChange={(e) => {
                  setEndDate(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.endDate}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={4} isInvalid={formErrors.desc}>
              <FormLabel>Description</FormLabel>
              <Textarea
                type="text"
                name="desc"
                rows={5}
                value={desc}
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.desc}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={4}>
              <FormLabel>Type</FormLabel>
              <Select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
              </Select>
            </FormControl>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexDirection: 'column',
              width: { base: '100%', md: '49%' },
            }}
          >
            <FormControl isRequired my={4} isInvalid={formErrors.venue}>
              <FormLabel>Venue</FormLabel>
              <Input
                type="text"
                name="venue"
                value={venue}
                onChange={(e) => {
                  setVenue(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.venue}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={4} isInvalid={formErrors.street}>
              <FormLabel>Street</FormLabel>
              <Input
                type="text"
                name="street"
                value={street}
                onChange={(e) => {
                  setStreet(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.street}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={4} isInvalid={formErrors.city}>
              <FormLabel>City</FormLabel>
              <Input
                type="text"
                name="city"
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.city}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={4} isInvalid={formErrors.state}>
              <FormLabel>State</FormLabel>
              <Input
                type="text"
                name="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.state}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={4} isInvalid={formErrors.country}>
              <FormLabel>Country</FormLabel>
              <Input
                type="text"
                name="country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.country}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={4} isInvalid={formErrors.pincode}>
              <FormLabel>Pincode</FormLabel>
              <Input
                type="number"
                name="pincode"
                value={pincode}
                onChange={(e) => {
                  setPincode(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.pincode}</FormErrorMessage>
            </FormControl>
            <FormControl isRequired my={4} isInvalid={formErrors.locationUrl}>
              <FormLabel>Enter location url</FormLabel>
              <Input
                type="number"
                name="pincode"
                value={locationUrl}
                onChange={(e) => {
                  setLocationUrl(e.target.value);
                }}
              />
              <FormErrorMessage>{formErrors.locationUrl}</FormErrorMessage>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'space-between',
            flexDirection: { base: 'column', md: 'row' },
            width: '95%',
            gap: '15px',
          }}
        >
          <FormControl my={4} isRequired isInvalid={formErrors.eventlogo}>
            <FormLabel>Event Logo</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setEventlogo(e.target.files[0]);
              }}
            />
            <FormErrorMessage>{formErrors.eventlogo}</FormErrorMessage>
          </FormControl>
          <FormControl my={4} isRequired isInvalid={formErrors.coverimg}>
            <FormLabel>Cover Image</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setCoverimg(e.target.files[0]);
              }}
            />
            <FormErrorMessage>{formErrors.coverimg}</FormErrorMessage>
          </FormControl>
          <FormControl my={4} isRequired isInvalid={formErrors.regimg}>
            <FormLabel>Registration Form Background</FormLabel>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => {
                setRegimg(e.target.files[0]);
              }}
            />
            <FormErrorMessage>{formErrors.regimg}</FormErrorMessage>
          </FormControl>
        </Box>
        <Button type="submit" width="100%" my="4" isLoading={loading} loadingText="Please Wait">
          Add
        </Button>
      </Box>
    </Box>
  );
}
