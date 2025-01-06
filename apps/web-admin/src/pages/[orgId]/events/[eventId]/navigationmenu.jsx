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
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useTabsStyles } from '@chakra-ui/react';
import { useState } from 'react';
import { Box, VStack, Button, Flex } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { account } from '@/contexts/MyContext';

const NavigationMenu = ({ orgId, eventId, navButton }) => {
  const tabStyle = (isActive) => ({
    color: isActive ? '#369b97' : '#369b97',
    backgroundColor: isActive ? '#e6f7f5' : '#e6f7f5',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: { base: '14px', md: '17px' },
    fontWeight: '600',
    width: { base: '100%', md: 'auto' },
  });
  
  const router = useRouter();
  const { activeTab, setActiveTab, eventDetails } = useContext(account);
  console.log('trial', eventDetails.isShortlisting);
  const navItems =
    eventDetails.isShortlisting && router.asPath.endsWith('/participants')
      ? [
          { link: 'registrants', name: 'Registrants' },
          { link: 'check-in', name: 'Participants Check In' },
          { link: 'attributes', name: 'Attributes' },
          { link: 'extras', name: 'Extras' },
        ]
      : [
          { link: 'participants', name: 'Participants' },
          { link: 'check-in', name: 'Participants Check In' },
          { link: 'attributes', name: 'Attributes' },
          { link: 'extras', name: 'Extras' },
        ];
  useEffect(() => {
    //console.log(activeTab);
  }, [activeTab]);
  return (
    <VStack spacing={4} width="100%" align="stretch" p={4}>
      {/* Navigation Menu Box */}

      <Flex
        justifyContent="space-evenly"
        alignItems="center"
        width="100%"
        display={{ base: 'none', md: 'flex' }} // Horizontal layout on desktop
      >
        {navItems.map((content) => {
          const tab = content.link;
          return (
            <Button
              key={tab}
              style={tabStyle(activeTab === tab)}
              onClick={() => {
                setActiveTab(tab);
                const element = tab === 'check-in' ? 'participants/check-in' : tab;
                router.push(
                  `/${orgId}/events/${eventId}/${element}
                `,
                );
              }}
            >
              {tab === 'check-in'
                ? 'Participant Check In'
                : tab.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
            </Button>
          );
        })}
      </Flex>
    </VStack>
  );
};

export default NavigationMenu;