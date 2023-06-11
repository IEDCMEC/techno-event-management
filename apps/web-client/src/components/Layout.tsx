import React, { ReactNode } from 'react';
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
} from '@chakra-ui/react';
import { FiHome, FiTrendingUp, FiCompass, FiStar, FiSettings, FiMenu } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
interface LinkItemProps {
  name: string;
  icon: IconType;
  list: any;
}
const LinkItems: Array<LinkItemProps> = [
  { name: 'Organizations', icon: FiHome, list: ['org1', 'org2', 'org3'] },
  { name: 'Events', icon: FiTrendingUp, list: ['Event1', 'Event2', 'Event3'] },
  { name: 'Participants', icon: FiCompass, list: ['participant1', 'participant2', 'participant3'] },
  { name: 'Attributes', icon: FiStar, list: ['Attributes1', 'Attributes2', 'Attributes3'] },
  { name: 'Settings', icon: FiSettings, list: ['Dashboard', 'Logout'] },
];
const Layout = ({ children }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box
      minH="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
      margin={'0'}
      position={'absolute'}
      top={'0'}
      left={'0'}
      width={['0%', '0%', '200px']}
    >
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          <Link
            href="/"
            _hover={{
              textDecoration: 'none',
              bg: useColorModeValue('gray.200', 'gray.700'),
            }}
          >
            QR System
          </Link>
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <Box as="span" flex="1" textAlign="left" key={link.name}>
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        </Box>
      ))}
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link href="#" style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: useColorModeValue('cyan.400', 'white'),
          color: 'black',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            // _groupHover={{
            //   color: 'white',
            // }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}
      width={'100vw !important'}
      //   maxHeight={'100px'}
    >
      <IconButton variant="outline" onClick={onOpen} aria-label="open menu" icon={<FiMenu />} />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold" zIndex={'300'}>
        QR System
      </Text>
    </Flex>
  );
};
export default Layout;
