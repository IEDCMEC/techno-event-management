import DashboardLayout from '@/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/organizations');
  }, [router]);

  return (
    <main>
      <DashboardLayout>
        <p className="text-3xl">Please wait ...</p>
      </DashboardLayout>
    </main>
  );
};

export default Home;
