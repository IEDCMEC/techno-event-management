import { Box } from '@chakra-ui/react';
import Sidebar from '@/components/Sidebar';

export default function DashboardLayout({ children }) {
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <Sidebar />
      {children}
    </Box>
  );
}
