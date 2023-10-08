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

const EventCard = ({ name }) => {
  return (
    <Card className="w-72">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Stats</p>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-start items-center gap-2">
        <Button variant="outline" size="sm">
          Attributes
        </Button>
        <Button variant="outline" size="sm">
          Extras
        </Button>
        <Button size="sm">Checkin</Button>
        <Button size="sm">Participants</Button>
      </CardFooter>
    </Card>
  );
};

export default EventCard;
