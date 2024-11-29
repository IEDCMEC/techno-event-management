import { useState, useEffect } from 'react';
// import { useFetch } from '@/hooks/useFetch';
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
import useWrapper from '@/hooks/useWrapper';

import NextLink from 'next/link';
import { MdOutlineEvent } from 'react-icons/md';
import { useRouter } from 'next/router';

const EventsDisplay = () => {
  const [events, setEvents] = useState([]);
  const { useGetQuery } = useWrapper();

  const router = useRouter();
  const { orgId } = router.query;

  const showAlert = useAlert();
  // const [orgId, setOrgId] = useState(null)
  const {
    data,
    status,
    error,
    isLoading: loading,
  } = useGetQuery(
    `/core/organizations/${orgId}/events`,
    `/core/organizations/${orgId}/events`,
    {}, // headers
    {}, // options
    (data) => {
      if (data.data.events.lenth !== events.length) {
        setEvents(data.data.events || []);
      }
    },
  );

  // if (events.length === 0) {
  //   return <div>No events found for this organization.</div>;
  // }

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
            {(!orgId || loading || events.length === 0) && (
              <div>
                <SkeletonText m={[4, 2, 4, 2]} noOfLines={2} spacing="4" skeletonHeight="2" />
              </div>
            )}
            {events.length !== 0 ? (
              events.map((event) => (
                <ListItem key={event.id}>
                  <Link as={NextLink} href={`/${orgId}/events/${event.id}`} passHref>
                    {event.name}
                  </Link>
                </ListItem>
              ))
            ) : (
              <div>No events found for this organization.</div>
            )}
          </UnorderedList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default EventsDisplay;
