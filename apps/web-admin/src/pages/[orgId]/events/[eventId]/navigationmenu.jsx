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
//import { inter } from '../../../../../../components/ui/fonts';
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
        sx={{
          display: 'flex',
          height: '36px',
          padding: '8px 10px 8px 12px',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3px',
          borderRadius: 'var(--8, 8px)',
          border: '1px solid var(--black-10, rgba(4, 5, 11, 0.10))',
          background: 'var(--black-5, rgba(4, 5, 11, 0.05))',
          color: 'var(--black, #04050B)',
          //fontFamily: inter.variable,
          fontSize: '13px',
          fontStyle: 'normal',
          fontWeight: '500',
          lineHeight: '20px',
        }}
      >
        Back
      </Button>
      <Menu>
  <MenuButton
    as={Button}
    rightIcon={<ChevronDownIcon />}
    colorScheme="gray"
    sx={{
      display: 'flex',
      height: '36px',
      padding: '8px 10px 8px 12px',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '3px',
      borderRadius: 'var(--8, 8px)',
      border: '1px solid var(--black-10, rgba(4, 5, 11, 0.10))',
      background: 'var(--black-5, rgba(4, 5, 11, 0.05))',
      color: 'var(--black, #04050B)',
      fontSize: '13px',
      fontStyle: 'normal',
      fontWeight: '500',
      lineHeight: '20px',
    }}
  >
    {currentPage}
  </MenuButton>
  <MenuList
    sx={{
      bg: 'var(--black-5, rgba(4, 5, 11, 0.05))',
      borderColor: 'var(--black-10, rgba(4, 5, 11, 0.10))',
      borderRadius: 'var(--8, 8px)',
    }}
  >
    {menuItems.map((item) => (
      <MenuItem
        key={item.name}
        sx={{
          bg: 'var(--black-5, rgba(4, 5, 11, 0.05))',
          color: 'var(--black, #04050B)',
          fontSize: '13px',
          fontWeight: '500',
          _hover: {
            bg: 'var(--black-10, rgba(4, 5, 11, 0.10))',
          },
        }}
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


