import DashboardLayout from '@/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  const { organizationId } = router.query;

  useEffect(() => {
    if (!organizationId) return;
    router.replace(`/organizations/${organizationId}/events`);
  }, [router, organizationId]);

  return (
    <main>
      <DashboardLayout>
        <p className="text-3xl">Please wait ...</p>
      </DashboardLayout>
    </main>
  );
};

export default Home;
