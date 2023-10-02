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

// interface ParticipantCardProps {
//   name: string;
//   email: string;
// }

interface BioData {
  name: string;
  email: string;
}

type ParticipantCardProps = {
  name: string;
  email: string;
  isCheckedIn: boolean;
  biodata?: BioData;
  participant: string;
  setParticipant: React.Dispatch<React.SetStateAction<string>>;
};

const ParticipantCard = ({ name, email }: ParticipantCardProps) => {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="attribute">Attribute</Label>
              <Input id="attribute" placeholder="Attribute" value="Value" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button>Checkin</Button>
      </CardFooter>
    </Card>
  );
};

ParticipantCard.defaultProps = {
  name: 'John Doe',
  email: 'johndoe@email.com',
  isCheckedIn: false,
};

export default ParticipantCard;
