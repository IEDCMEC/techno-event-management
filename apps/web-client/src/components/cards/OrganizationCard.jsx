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

const OrganizationCard = ({ organization }) => {
  const router = useRouter();

  return (
    <Card className="w-72" onClick={() => router.push(`/organizations/${organization?.id}`)}>
      <CardHeader>
        <CardTitle>{organization?.name}</CardTitle>
      </CardHeader>
      {/*<CardContent>*/}
      {/*  <p>{role}</p>*/}
      {/*</CardContent>*/}
    </Card>
  );
};

export default OrganizationCard;
