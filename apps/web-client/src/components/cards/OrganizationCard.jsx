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

const OrganizationCard = ({ id, name, role }) => {
  const router = useRouter();

  return (
    <Card className="w-72" onClick={() => router.push(`/dashboard/${id}`)}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{role}</p>
      </CardContent>
    </Card>
  );
};

export default OrganizationCard;
