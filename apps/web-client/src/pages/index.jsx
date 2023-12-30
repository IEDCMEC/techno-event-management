import DashboardLayout from '@/layouts/DashboardLayout';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ChakraProvider } from '@chakra-ui/react';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace('/organizations');
  }, [router]);

  return (
    <main>
      <ChakraProvider>
        <DashboardLayout>
          <p className="text-3xl">Please wait ...</p>
        </DashboardLayout>
      </ChakraProvider>
    </main>
  );
};

export default Home;
