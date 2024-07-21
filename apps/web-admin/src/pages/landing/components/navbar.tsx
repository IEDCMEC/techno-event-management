'use client';

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react';

import Image from 'next/image';

import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';

import { logo, logo_text } from '../assets';

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();

  const logoSrc = useBreakpointValue({
    base: logo,
    md: logo_text,
  });

  return (
    <Box
      bg={'brand.nav_white'}
      position={'fixed'}
      width={'full'}
      zIndex={100}
      backdropFilter="blur(8px)"
    >
      <Flex
        minH={'72px'}
        maxH={'112px'}
        py={{ base: 2 }}
        px={{ base: 8 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        maxW={'1320px'}
        mx={'auto'}
      >
        <Flex flex={{ base: 1 }} justify={{ base: 'start', md: 'start' }}>
          <Image src={logoSrc} height={21} alt="EVENTSYNC" />

          <Flex display={{ base: 'none', lg: 'flex' }} ml={'44px'}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={'14px'}
          display={{ base: 'none', lg: 'flex' }}
        >
          <Button
            as={'a'}
            fontSize={'sm'}
            fontWeight={500}
            variant={'link'}
            href={'#'}
            border={'1px'}
            borderColor={'brand.black_v1_border'}
            outline={'none'}
            width={'73px'}
            height={'40px'}
            rounded={'12px'}
            color={'brand.black_v1'}
            transition="all 0.5s ease"
            _hover={{
              bg: 'brand.black_v1_border',
            }}
          >
            Sign In
          </Button>
          <Button
            as={'a'}
            display={'inline-flex'}
            justifyContent={'center'}
            alignItems={'center'}
            fontSize={'sm'}
            fontWeight={500}
            href={'#'}
            transition="all 0.5s ease"
            _hover={{
              bg: 'brand.black_v2',
            }}
            bg={'brand.black_v1'}
            width={'118px'}
            height={'40px'}
            rounded={'12px'}
            color={'brand.white'}
          >
            Start for free
          </Button>
        </Stack>
        <Flex
          flex={{ base: 1, lg: 'auto' }}
          ml={{ base: -2 }}
          maxW={'40px'}
          display={{ base: 'flex', lg: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={6} h={6} />}
            variant={'ghost'}
            _hover={{
              bg: 'rgba(217, 228, 249, 0.38)',
            }}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('brand.black_v1', 'gray.200');
  const linkHoverColor = useColorModeValue('brand.black_v2', 'white');
  const popoverContentBgColor = useColorModeValue('brand.white', 'brand.black_v1');

  return (
    <Stack direction={'row'} spacing={'22px'} mx={'12px'}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                as="a"
                // p={3}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                mt={'24px'}
                border={0}
                zIndex={100}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'12px'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      // bg={'brand.black'}
      _hover={{ bg: useColorModeValue('rgba(173, 197, 242, 0.17)', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'brand.black_v1' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'brand.black_v1'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue('brand.nav_white', 'gray.800')}
      p={4}
      display={{ lg: 'none' }}
      blur={'6px'}
    >
      <SomeButtons />
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        width={'full'}
        height={'48px'}
        display={'flex'}
        _hover={{
          textDecoration: 'none',
          bg: 'rgba(217, 228, 249, 0.38)',
        }}
        px={3}
        rounded={'12px'}
      >
        <Text fontWeight={600} fontSize={'16px'} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={5}
            h={5}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Product',
    children: [
      {
        label: 'Laborum dolore velit',
        subLabel: 'Cupidatat irure commodo reprehenderit.',
        href: '#',
      },
      {
        label: 'Laborum dolore velit',
        subLabel: 'Cupidatat irure commodo reprehenderit.',
        href: '#',
      },
    ],
  },
  {
    label: 'Customers',
    href: '#',
  },
  {
    label: 'Pricing',
    href: '#',
  },
  {
    label: 'Company',
    children: [
      {
        label: 'Laborum dolore velit',
        subLabel: 'Cupidatat irure commodo reprehenderit.',
        href: '#',
      },
      {
        label: 'Laborum dolore velit',
        subLabel: 'Cupidatat irure commodo reprehenderit.',
        href: '#',
      },
      {
        label: 'Laborum dolore velit',
        subLabel: 'Cupidatat irure commodo reprehenderit.',
        href: '#',
      },
    ],
  },
];

const SomeButtons = () => {
  return (
    <Stack
      flex={{ base: 1, md: 0 }}
      justify={'flex-end'}
      direction={'column-reverse'}
      spacing={'14px'}
      width={'full'}
      mt={'12px'}
      mb={'24px'}
      px={'12px'}
    >
      <Button
        as={'a'}
        fontSize={'sm'}
        fontWeight={500}
        variant={'link'}
        href={'#'}
        border={'1px'}
        borderColor={'brand.black_v1_border'}
        outline={'none'}
        width={'full'}
        height={'48px'}
        rounded={'12px'}
        color={'brand.black_v1'}
        transition="all 0.5s ease"
        _hover={{
          bg: 'brand.black_v1_border',
        }}
      >
        Sign In
      </Button>
      <Button
        as={'a'}
        display={'inline-flex'}
        justifyContent={'center'}
        alignItems={'center'}
        fontSize={'sm'}
        fontWeight={500}
        href={'#'}
        transition="all 0.5s ease"
        _hover={{
          bg: 'brand.black_v2',
        }}
        bg={'brand.black_v1'}
        width={'full'}
        height={'48px'}
        rounded={'12px'}
        color={'brand.white'}
      >
        Start for free
      </Button>
    </Stack>
  );
};
