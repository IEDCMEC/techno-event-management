import { useState, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useAlert } from '@/hooks/useAlert';
import {
  Box,
  UnorderedList,
  ListItem,
  Link,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  SkeletonText,
} from '@chakra-ui/react';

import NextLink from 'next/link';
import { MdOutlineEvent } from 'react-icons/md';
import { useRouter } from 'next/router';

const EventsDisplay = () => {
  const [events, setEvents] = useState([]);

  const router = useRouter();
  const { orgId } = router.query;

  const showAlert = useAlert();
  const { loading, get } = useFetch();

  useEffect(() => {
    if (orgId) {
      const fetchEvents = async () => {
        const { data, status } = await get(`/core/organizations/${orgId}/events`);
        if (status === 200) {
          setEvents(data.events || []);
        } else {
          showAlert({
            title: 'Error',
            description: data.error,
            status: 'error',
          });
        }
      };
      fetchEvents();
    }
  }, [orgId]);

  if (!orgId || loading) {
    return (
      <div>
        <SkeletonText m={[4, 2, 4, 2]} noOfLines={2} spacing="4" skeletonHeight="2" />
      </div>
    );
  }

  if (events.length === 0) {
    return <div>No events found for this organization.</div>;
  }

  return (
    <Accordion allowToggle>
      <AccordionItem border="none">
        <AccordionButton
          _hover={{ color: 'black.400', backgroundColor: 'gray.100', cursor: 'pointer' }}
          transition="outline 0.2s"
          borderRadius="md"
          padding="2"
          display="flex"
          flexDirection="row"
          alignItems="center"
        >
          <Box mr={2}>
            <MdOutlineEvent />
          </Box>
          <Text fontSize="lg">Events</Text>
          <AccordionIcon />
        </AccordionButton>
        <AccordionPanel pb={4}>
          <UnorderedList>
            {events.map((event) => (
              <ListItem key={event.id}>
                <Link as={NextLink} href={`/${orgId}/events/${event.id}`} passHref>
                  {event.name}
                </Link>
              </ListItem>
            ))}
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default EventsDisplay;
