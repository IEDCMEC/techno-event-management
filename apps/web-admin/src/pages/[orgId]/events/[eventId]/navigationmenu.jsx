/*
 // the idea with menu
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const NavigationMenu = ({ orgId, eventId }) => {
  const router = useRouter();
  const menuLabels = ['Participants', 'Participants Check In', 'Attributes', 'Extras'];
  console.log("navigation menu loaded")
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


const NavigationMenu = ({orgId, eventId}) => {
  return (
    <Box
          width="100%"
          backgroundColor="#e6f7f5"
          py={2}
          px={2}
          borderRadius="8px"
          display={{ base: 'block', md: 'flex' }}
        >
          <VStack spacing={2} align="stretch" display={{ base: 'flex', md: 'none' }}>
            {['participants', 'check-in', 'attributes', 'extras'].map((tab) => (
              <Button
                key={tab}
                style={tabStyle(activeTab === tab)}
                onClick={() => {
                  setActiveTab(tab);
                  const element = tab === 'check-in' ? 'participants/check-in' : tab;
                  router.push(`/${orgId}/events/${eventId}/${element}`);
                }}
              >
                {tab === 'check-in'
                  ? 'Participant Check In'
                  : tab.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())}
              </Button>
            ))}
          </VStack>

          <Flex
            justifyContent="space-evenly"
            alignItems="center"
            width="100%"
            display={{ base: 'none', md: 'flex' }} // Horizontal layout on desktop
          >
            {['participants', 'check-in', 'attributes', 'extras'].map((tab) => (
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
            ))}
          </Flex>
        </Box>
  )
}
export default NavigationMenu;