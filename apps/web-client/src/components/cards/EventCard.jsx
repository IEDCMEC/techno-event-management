import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter } from 'next/router';

const EventCard = ({ event }) => {
  const router = useRouter();

  return (
    <Card
      className="w-72"
      onClick={() => {
        router.push(`/organizations/${event.organizationId}/events/${event.id}`);
      }}
    >
      <CardHeader>
        <CardTitle>{event.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Stats</p>
      </CardContent>
      {/* <CardFooter className="flex flex-wrap justify-start items-center gap-2">
        <Button variant="outline" size="sm">
          Attributes
        </Button>
        <Button variant="outline" size="sm">
          Extras
        </Button>
        <Button size="sm">Checkin</Button>
        <Button size="sm">Participants</Button>
      </CardFooter> */}
    </Card>
  );
};

export default EventCard;
