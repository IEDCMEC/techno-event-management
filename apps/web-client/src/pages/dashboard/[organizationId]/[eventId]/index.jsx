import DashboardLayout from '@/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  const { organizationId, eventId } = router.query;

  useEffect(() => {
    if (!organizationId || !eventId) return;
    router.replace(`/dashboard/${organizationId}/${eventId}/participants`);
  }, [organizationId, eventId]);

  return (
    <main>
      <DashboardLayout>
        <p className="text-3xl">Please wait ...</p>
      </DashboardLayout>
    </main>
  );
};

export default Home;
