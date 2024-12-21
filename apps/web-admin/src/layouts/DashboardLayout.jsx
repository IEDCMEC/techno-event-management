import { useRouter } from 'next/router';
import { useState, useContext, useEffect } from 'react';
import { inter } from '@/components/ui/fonts';
import { Box, useMediaQuery, Flex, Text, IconButton } from '@chakra-ui/react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RxHamburgerMenu } from 'react-icons/rx';
import Sidebar from '@/components/Sidebar';
import { useAuth0 } from '@auth0/auth0-react';
import Image from 'next/image';
import { account } from '@/contexts/MyContext';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { StyledText } from '@/components/ui/StyledComponents';
import { FiSun } from 'react-icons/fi';
import { IoNotificationsOutline } from 'react-icons/io5';
import { VscCalendar } from 'react-icons/vsc';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from '@chakra-ui/react';
// Adjust the import path as needed

export default function DashboardLayout({ headerButton, children }) {
  const router = useRouter();
  const pathSegments = router.asPath.split('/').filter(Boolean);
  //console.log('Path: ' + pathSegments);
  const Dashboard = ['events', 'members', 'mycertificates', 'emailer'];
  const { accountDetails, setAccountDetails, allAccounts, setAllAccounts } = useContext(account);
  const [isMobile] = useMediaQuery('(max-width: 768px)');
  const [isSidebarOpen, setSidebarOpen] = useState(isMobile);
  const { user, isAuthenticated, isLoading } = useAuth0();

  function toTitleCase(str) {
    return str
      .split(' ') // Split the string into words
      .map(
        (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(), // Capitalize first letter and make rest lowercase
      )
      .join(' '); // Join the words back into a string
  }
  useEffect(() => {
    //console.log(router.asPath);
    //console.log(accountDetails);
  }, [router.asPath]);
  const [date, setDate] = useState(new Date());
  if (isAuthenticated) {
    return (
      <Flex height="100vh" flexDirection="column">
        <Flex height="100%" overflow="hidden" flexDirection={isMobile ? 'column' : 'row'}>
          {isMobile && (
            <Flex
              height={24}
              p={4}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              id="burger-box"
            >
              {/* <Text fontSize="2xl" fontWeight="bold">
                {accountDetails?.name}
              </Text> */}
              <Flex
                height={10}
                width={10}
                justifyContent="center"
                alignItems="center"
                id="burger"
                onClick={() => {
                  setSidebarOpen(true);
                }}
              >
                <RxHamburgerMenu fontSize={30} color="black" />
              </Flex>
            </Flex>
          )}
          <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
          <Flex
            height="100%"
            width="100%"
            overflowY="hidden"
            flexDirection="column"
            marginLeft={-2}
            transition="margin 0.3s ease"
            id="main-cover"
          >
            <Flex
              height={isMobile ? 'auto' : '70px'}
              width="100%"
              p={5}
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
              id="sub-cover"
              borderBottom={'1px solid rgba(4, 5, 11, 0.1)'}
            >
              {!isMobile && (
                <Flex width="100%" alignItems="center" gap={10} id="sample">
                  <Flex width="70%" id="breadcumb-container">
                    {/* <Breadcrumb separator={"/"}>
                    {/* {linksForBreadCrumbs.map((link, index) => (
                    <BreadcrumbItem key={index} isCurrentPage={link.isCurrent}>
                      {link.isCurrent ? (
                        <StyledText>
                          {link.label}
                        </StyledText>
                      ) : (
                        <BreadcrumbLink href={link.href}>{link.label}</BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  ))} 
                     <BreadcrumbItem>
                      <BreadcrumbLink href="#" fontWeight={"light"}><StyledText>DashBoards</StyledText></BreadcrumbLink>
                    </BreadcrumbItem>

                    <BreadcrumbItem isCurrentPage>
                      <BreadcrumbLink href="#"><StyledText>My Events</StyledText></BreadcrumbLink>
                    </BreadcrumbItem>
                  </Breadcrumb> */}
                    <Breadcrumb separator="/">
                      <BreadcrumbItem>
                        <BreadcrumbLink href="/">
                          {Dashboard.includes(pathSegments[1]) ? (
                            <Text>Dashboards</Text>
                          ) : (
                            <Text>Pages</Text>
                          )}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      {pathSegments.map((segment, index) => {
                        // Check if the segment contains an integer
                        const hasNumber = /\d/.test(segment);

                        // Skip breadcrumb if the segment has a number
                        if (hasNumber) return null;

                        const href = '/' + pathSegments.slice(0, index + 1).join('/');
                        const isLast = index === pathSegments.length - 1;

                        return (
                          <BreadcrumbItem key={href} isCurrentPage={isLast}>
                            {isLast ? (
                              <Text>
                                {segment == 'events' ? (
                                  <Text>My Events</Text>
                                ) : segment == 'mycertificates' ? (
                                  <Text>My Certificates</Text>
                                ) : (
                                  <Text>{toTitleCase(segment)}</Text>
                                )}
                              </Text>
                            ) : (
                              <BreadcrumbLink href={href}>
                                {segment == 'events' ? (
                                  <Text>My Events</Text>
                                ) : segment == 'mycertificates' ? (
                                  <Text>My Certificates</Text>
                                ) : (
                                  <Text>{toTitleCase(segment)}</Text>
                                )}
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                        );
                      })}
                    </Breadcrumb>
                  </Flex>

                  {/* <IoMdArrowRoundBack
                    size={30}
                    style={{
                      cursor: 'pointer',
                      display:
                        router.asPath === `/${accountDetails?.orgId}/events` ? 'none' : 'block',
                    }}
                    onClick={() => {
                      router.back();
                    }}
                  />
                  {/* <Image
                    src={user.picture}
                    alt="logo"
                    height={50}
                    width={50}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      router.push(`/${accountDetails?.orgId}/events`);
                    }}
                  /> 
                  <Text fontSize="4xl" fontWeight="bold">
                    {accountDetails?.name}
                  </Text>
                   <Select
                    value={accountDetails.name}
                    fontSize="4xl"
                    fontWeight="bold"
                    focusBorderColor="transparent"
                    width="350px"
                    cursor={'pointer'}
                    sx={{
                      border: 'none',
                    }}
                    onChange={(e) => {
                      //console.log('changes');
                      //console.log(e.target.value);
                      setAccountDetails(
                        allAccounts.filter((value) => value.name === e.target.value)[0],
                      );
                      router.push(`/${accountDetails.orgId}/events`);
                    }}
                  >
                    {allAccounts.map((value, key) => {
                      return (
                        <option
                          value={value.name}
                          key={key}
                          style={{ fontSize: '15px', fontWeight: '400' }}
                        >
                          {value.name}
                        </option>
                      );
                    })}
                  </Select> */}
                </Flex>
              )}
              <Flex
                height="100%"
                width="100%"
                justifyContent={isMobile ? 'space-evenly' : 'flex-end'}
                alignItems="center"
                gap={4}
              >
                {headerButton}
              </Flex>
              <Flex
                id="buttons-at-the-end"
                flexDirection={'row'}
                width="50%"
                justifyContent={'flex-end'}
              >
                <IconButton aria-label="toggle dark-bright" variant={'ghost'}>
                  <FiSun fontSize={'20px'} color="black" />
                </IconButton>
                <IconButton aria-label="bell-icon" variant={'ghost'}>
                  <IoNotificationsOutline fontSize={'20px'} color="black" />
                </IconButton>
                <Popover>
                  <PopoverTrigger>
                    <IconButton aria-label="calender-icon" variant="ghost">
                      <VscCalendar fontSize="20px" color="black" />
                    </IconButton>
                  </PopoverTrigger>
                  <PopoverContent>
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        scale={1}
                        className={`${inter.className}`}
                      />
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </Flex>
            </Flex>
            <Box height="100%" overflowY="auto" overflowX={'auto'} p={4}>
              {children}
            </Box>
          </Flex>
        </Flex>
      </Flex>
    );
  } else {
    return <div>{children}</div>;
  }
}
