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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/router';

const ParticipantCard = ({ participant }) => {
  const router = useRouter();

  return (
    <Card
      className="w-72"
      onClick={() => {
        router.push(
          `/dashboard/${participant.organizationId}/${participant.eventId}/participants/${participant.id}`,
        );
      }}
    >
      <CardHeader>
        <CardTitle>
          {participant.firstName} {participant.lastName}
        </CardTitle>
      </CardHeader>
      {/*<CardContent>*/}
      {/*    <form>*/}
      {/*        <div className="grid w-full items-center gap-4">*/}
      {/*            <div className="flex flex-col space-y-1.5">*/}
      {/*                <Label htmlFor="attribute">Attribute</Label>*/}
      {/*                <Input id="attribute" placeholder="Attribute" value="Value"/>*/}
      {/*            </div>*/}
      {/*        </div>*/}
      {/*    </form>*/}
      {/*</CardContent>*/}
      {/* <CardFooter className="flex justify-end">
        <Button size="sm" disabled={participant.checkedIn}>
          Checkin
        </Button>
      </CardFooter> */}
    </Card>
  );
};
export default ParticipantCard;
