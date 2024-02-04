import { Box, IconButton, useMediaQuery, Button } from '@chakra-ui/react';

import Sidebar from '@/components/Sidebar';
import { useState } from 'react';

export default function DashboardLayout({ children }) {
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isSidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      {isMobile && (
        <Button
          colorScheme="#dfdfdf"
          onClick={() => {
            setSidebarOpen(true);
          }}
          position="fixed"
          top={4}
          left={4}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          >
            <path d="M 2 5 L 2 7 L 22 7 L 22 5 L 2 5 z M 2 11 L 2 13 L 22 13 L 22 11 L 2 11 z M 2 17 L 2 19 L 22 19 L 22 17 L 2 17 z"></path>
          </svg>
        </Button>
      )}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box
        flex="1"
        marginLeft="0"
        marginTop={isMobile ? '30px' : '0'}
        transition="margin 0.3s ease"
      >
        {children}
      </Box>
    </Box>
  );
}
