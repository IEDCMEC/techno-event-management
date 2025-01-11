/*
 // the idea with menu
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const NavigationMenu = ({ orgId, eventId }) => {
  const router = useRouter();
  const menuLabels = ['Participants', 'Participants Check In', 'Attributes', 'Extras'];
  //console.log("navigation menu loaded")
  return (
    <>
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        Go to ...
      </MenuButton>
      <MenuList>
        {menuLabels.map((label) => {
            const path = `/${orgId}/events/${eventId}/${
            label === 'Participants Check In' ? 'participants/check-in' : label.toLowerCase()
            }`;
            return (
            <MenuItem key={label} onClick={() => router.push(path)}>
                {label}
            </MenuItem>
            );
        })}
      </MenuList>
    </Menu>
    </>
  );
};*/
import { ChevronDownIcon, ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';

const NavigationMenu = ({ orgId, eventId, navButton }) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState('');
  
  const menuItems = [
    { 
      name: 'Participants Details',
      path: `/${orgId}/events/${eventId}/participants`
    },
    { 
      name: 'Participants Check-in Details',
      path: `/${orgId}/events/${eventId}/participants/check-in`
    },
    { 
      name: 'Attributes Details',
      path: `/${orgId}/events/${eventId}/attributes`
    },
    { 
      name: 'Extras Details',
      path: `/${orgId}/events/${eventId}/extras`
    }
  ];

  useEffect(() => {
    const path = router.asPath;
    const lastSegment = path.split('/').pop();
    
    const pageMap = {
      'participants': 'Participants Details',
      'check-in': 'Participants Check-in Details',
      'attributes': 'Attributes Details',
      'extras': 'Extras Details'
    };

    setCurrentPage(pageMap[lastSegment] || 'Details');
  }, [router.asPath]);

  const commonButtons = (
    <div className="flex gap-4" style={{ paddingLeft: '20px', paddingRight: '20px' }}>
      <Button
        leftIcon={<ChevronLeftIcon />}
        colorScheme="gray"
        variant="solid"
        onClick={() => router.back()}
      >
        Back
      </Button>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="gray">
          {currentPage}
        </MenuButton>
        <MenuList bg="gray.100" borderColor="gray.200">
          {menuItems.map((item) => (
            <MenuItem
              key={item.name}
              color="gray.700"
              fontWeight="medium"
              _hover={{ bg: "gray.200" }}
              onClick={() => router.push(item.path)}
            >
              {item.name}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </div>
  );

  return (
    <div className="w-full space-y-4" style={{ marginTop: '20px' }}>
      <div className="flex justify-between items-center mb-5 mt-2.5">
        {commonButtons}
        {navButton && <div className="flex gap-2.5" style={{ paddingRight: '20px' }}>{navButton}</div>}
      </div>
    </div>
  );
};

export default NavigationMenu;