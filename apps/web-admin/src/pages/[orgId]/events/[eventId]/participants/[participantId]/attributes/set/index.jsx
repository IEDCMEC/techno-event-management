import { useState, useEffect } from 'react';

import { useFetch } from '@/hooks/useFetch';

import {
  Button,
  Box,
  Card,
  CardBody,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Text,
  Select,
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import DashboardLayout from '@/layouts/DashboardLayout';
import useWrapper from '@/hooks/useWrapper';

export default function NewOrganization() {
  // const { loading, get, post } = useFetch();
  const { useGetQuery, usePostMutation } = useWrapper();
  const router = useRouter();

  const { orgId, eventId, participantId } = router.query;

  const [attributes, setAttributes] = useState([]);
  const [attributeId, setAttributeId] = useState('');
  const [value, setValue] = useState('');
  const { mutate: newParticipantAttributeMutation } = usePostMutation(
    `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}/attributes`,
    {},
    {
      onSuccess: (response) => {
        router.push(`/${orgId}/events/${eventId}/participants`);
      },
      onError: (error) => {
        alert(data.error);
      },
      invalidateKeys: [
        `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}/attributes`,
      ],
    },
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { data, status } = await post(
    //   `/core/organizations/${orgId}/events/${eventId}/participants/${participantId}/attributes`,
    //   {},
    //   {
    //     participantId,
    //     attributeId,
    //     value,
    //   },
    // );
    newParticipantAttributeMutation({
      participantId,
      attributeId,
      value,
    });
    // if (status === 200) {
    //   router.push(`/${orgId}/events/${eventId}/participants`);
    // } else {
    //   alert(data.error);
    // }
  };
  const { isFetching: loading } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/attributes`,
    `/core/organizations/${orgId}/events/${eventId}/attributes`,
    {},
    {
      onSuccess: (response) => {
        setAttributes(response.data.attributes || []);
        console.log(data);
      },
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: error,
          status: 'error',
        });
      },
    },
  );
  // useEffect(() => {
  //   const fetchAttributes = async () => {
  //     const { data, status } = await get(
  //       `/core/organizations/${orgId}/events/${eventId}/attributes`,
  //     );
  //     setAttributes(data.attributes || []);
  //     console.log(data);
  //   };
  //   fetchAttributes();
  // }, [orgId, eventId, participantId]);

  return (
    <DashboardLayout>
      <Flex
        direction="column"
        height="100%"
        width="100%"
        alignItems="center"
        justifyContent="center"
        gap={8}
      >
        <Box textAlign="center">
          <Text fontSize="3xl" fontWeight="bold">
            Set Participant Attribute
          </Text>
        </Box>
        <Card width="100%" maxWidth="400px" height="auto">
          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired my={4}>
                <FormLabel>Attribute</FormLabel>
                <Select
                  placeholder="Select option"
                  onChange={(e) => {
                    setAttributeId(e.target.value);
                    console.log(e.target.value);
                  }}
                >
                  {attributes.map((attribute) => (
                    <option key={attribute.id} value={attribute.id}>
                      {attribute.name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired my={4}>
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="value"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                width="100%"
                my="4"
                isLoading={loading}
                loadingText="Please Wait"
              >
                Add
              </Button>
            </form>
          </CardBody>
        </Card>
      </Flex>
    </DashboardLayout>
  );
}
