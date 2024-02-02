import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Organization() {
  const router = useRouter();

  const { orgId } = router.query;

  useEffect(() => {
    router.push(`/organizations/${orgId}/events`);
  }, [orgId]);
}
