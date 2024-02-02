import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Event() {
  const router = useRouter();

  const { orgId, eventId } = router.query;

  useEffect(() => {
    router.push(`/organizations/${orgId}/events/${eventId}/participants`);
  }, [orgId, eventId]);
}
