import { useRouter } from 'next/router';
import { account } from '@/contexts/MyContext';
import {
  Box,
  Text,
  Stack,
  Flex,
  Image,
  Link,
  Icon,
  Button,
  useDisclosure,
  Alert,
  useColorMode,
} from '@chakra-ui/react';
import { GrLocation } from 'react-icons/gr';
import { LuPhone } from 'react-icons/lu';
import { BsLink45Deg } from 'react-icons/bs';
import { IoMailOutline } from 'react-icons/io5';
import { CiEdit } from 'react-icons/ci';
import { useState, useEffect, useContext } from 'react';
import {
  StyledIconButton,
  StyledDisabledIconButton,
  StyledText,
  StyledBox,
} from '@/components/ui/StyledComponents';

import { inter } from '@/components/ui/fonts';
import DashboardLayout from '@/layouts/DashboardLayout';
import OrganizationSettingsModal from '@/components/modals/EditModal_of_Settings/OrganizationSettingsModal';

export default function Settings() {
  //const { loading, get, put } = useFetch();
  //const showAlert = useAlert();
  const { colorMode } = useColorMode();
  const iconColor = colorMode === 'light' ? 'black' : 'white';
  const bgColor = colorMode === 'light' ? 'white' : 'black';
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure(); // useDisclosure hook for modal
  const { accountDetails, setAccountDetails, updateAccountDetails } = useContext(account);
  const [Data, setData] = useState({
    orgName: '',
    logo: '',
    tagline: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    LinkedIn: '',
    Instagram: '',
    Twitter: '',
    City: '',
    State: '',
    Country: '',
    Pincode: '',
    Location: '',
    orgId: null,
  });
  useEffect(() => {
    if (accountDetails) {
      // Only update state if accountDetails is available
      setData({
        orgName: accountDetails.name || '',
        logo: accountDetails.Logo || '',
        tagline: accountDetails.Tagline || '',
        description: accountDetails.Description || '',
        phone: accountDetails.phoneNo || '',
        email: accountDetails.email || '',
        website: accountDetails.website || '',
        LinkedIn: accountDetails.linkedInLink || '',
        Instagram: accountDetails.instagramLink || '',
        Twitter: accountDetails.twitterLink || '',
        City: accountDetails.addressData?.city || '',
        State: accountDetails.addressData?.state || '',
        Country: accountDetails.addressData?.country || '',
        Pincode: accountDetails.addressData?.pinCode ? `${accountDetails.addressData.pinCode}` : '',
        Location: accountDetails.addressData?.locationUrl || '',
        orgId: accountDetails?.orgId || null,
      });
    } else {
      <Alert
        status="warning"
        title="Your organization details are currently incomplete. Kindly review and complete the necessary fields"
      />;
    }
    //console.log(formData, accountDetails);
  }, [accountDetails]);
  return (
    <DashboardLayout pageTitle="Settings" previousPage={`/`} debugInfo={accountDetails}>
      <Box overflow="hidden">
        <Stack spacing={4} direction="column" wrap={true} height={{ base: 'auto', md: '35%' }}>
          <Box
            borderWidth="1px"
            borderRadius="md"
            p={[4, 6]}
            shadow={6}
            margin={[4, 6]}
            width={'100%'}
            maxW="96%"
            boxSizing="border-box"
          >
            <Box
              display="flex"
              flexDirection={['column', 'row', 'row']}
              wrap="wrap"
              gap={8}
              width={'100%'}
            >
              <Image
                src={
                  Data.logo ||
                  'https://upload.wikimedia.org/wikipedia/commons/7/70/User_icon_BLACK-01.png'
                }
                alt="organization image"
                maxH="220"
                maxW="200"
                borderRadius="lg"
                boxSize="170px"
                fit="cover"
              />
              <Flex direction="column" width={'100%'}>
                <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="space-between"
                  width={'100%'}
                >
                  <Text
                    color={colorMode === 'light' ? '#04050B' : 'white'}
                    fontFamily={inter.style.fontFamily}
                    fontSize="30px"
                    lineHeight="20px"
                    letterSpacing="0%"
                    textAlign="left"
                    fontWeight="bold"
                  >
                    {Data.orgName || 'Loading...'}
                  </Text>
                  {accountDetails.role === 'ADMIN' && (
                    <Button
                      onClick={onOpen}
                      color={iconColor}
                      backgroundColor={bgColor}
                      variant="outline"
                    >
                      <Icon as={CiEdit} boxSize={6} mr={2} /> {/**/}
                      Edit
                    </Button>
                  )}
                  {/* Button to open modal */}
                </Box>
                <StyledText fontSize="md" padding={1}>
                  {Data.tagline || 'Loading...'}
                </StyledText>
                <StyledText fontSize="md" padding={1}>
                  {Data.description || 'Loading...'}
                </StyledText>
                <Flex direction={'row'} wrap={true} gap={4} padding={1}>
                  {Data.website ? (
                    <a href={Data.website} target="_blank" rel="noopener noreferrer">
                      <StyledIconButton aria-label="website" iconD="w" />
                    </a>
                  ) : (
                    <StyledDisabledIconButton aria-label="website" iconD="w" />
                  )}
                  {Data.LinkedIn ? (
                    <a href={Data.LinkedIn} target="_blank" rel="noopener noreferrer">
                      <StyledIconButton aria-label="LinkedIn" iconD="l" />
                    </a>
                  ) : (
                    <StyledDisabledIconButton aria-label="LinkedIn" iconD="l" />
                  )}
                  {Data.Twitter ? (
                    <a href={Data.Twitter} target="_blank" rel="noopener noreferrer">
                      <StyledIconButton aria-label="Twitter" iconD="t" />
                    </a>
                  ) : (
                    <StyledDisabledIconButton aria-label="Twitter" iconD="t" />
                  )}
                  {Data.Instagram ? (
                    <a href={Data.Instagram} target="_blank" rel="noopener noreferrer">
                      <StyledIconButton aria-label="Instagram" iconD="i" />
                    </a>
                  ) : (
                    <StyledDisabledIconButton aria-label="Instagram" iconD="i" />
                  )}
                </Flex>
              </Flex>
            </Box>
          </Box>
        </Stack>
        <Stack direction="row" height={{ base: 'auto', md: '65%' }}>
          <Box
            borderWidth="1px"
            borderRadius="md"
            p={[4, 4, 6]}
            shadow={6}
            margin={6}
            width={'100%'}
            maxW="98%"
            mb="6"
          >
            <Flex
              direction={['column', 'column', 'row']}
              wrap={true}
              justify="space-between"
              mb="6"
            >
              <Flex direction="column" wrap={true} gap={6} width={['100%', '100%', '49%']}>
                <StyledText
                  fontSize={20}
                  fontWeight="semibold"
                  textDecoration="underline"
                  width={[200, 200, 250]}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mb="6"
                >
                  Contact Info
                </StyledText>
                <Stack direction="column" gap={6}>
                  <Stack direction="row" gap={6}>
                    <StyledBox
                      fontSize="md"
                      width={[24, 100, 250]}
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      justifyContent="flex-start"
                    >
                      <StyledBox flexDirection="row" m={1.5}>
                        <Icon fontSize={20}>
                          <GrLocation />
                        </Icon>
                        <StyledText>Address</StyledText>
                      </StyledBox>
                    </StyledBox>
                    <Stack
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      width={'100%'}
                      gap={5}
                    >
                      <StyledText
                        fontSize="md"
                        border={0.1}
                        backgroundColor={colorMode === 'light' ? '#04050B0D' : '#282828'}
                        borderRadius={12}
                        pt={1.5}
                        pr={2}
                        pb={1.5}
                        pl={3}
                        width="100%"
                      >
                        City: {Data.City || ' Loading...'}
                      </StyledText>
                      <StyledText
                        fontSize="md"
                        border={0.1}
                        backgroundColor={colorMode === 'light' ? '#04050B0D' : '#282828'}
                        borderRadius={12}
                        pt={1.5}
                        pr={2}
                        pb={1.5}
                        pl={3}
                        width="100%"
                      >
                        State: {Data.State || ' Loading...'}
                      </StyledText>
                      <StyledText
                        fontSize="md"
                        border={0.1}
                        backgroundColor={colorMode === 'light' ? '#04050B0D' : '#282828'}
                        borderRadius={12}
                        pt={1.5}
                        pr={2}
                        pb={1.5}
                        pl={3}
                        width="100%"
                      >
                        Country: {Data.Country || ' Loading...'}
                      </StyledText>
                      <StyledText
                        fontSize="md"
                        border={0.1}
                        backgroundColor={colorMode === 'light' ? '#04050B0D' : '#282828'}
                        borderRadius={12}
                        pt={1.5}
                        pr={2}
                        pb={1.5}
                        pl={3}
                        width="100%"
                      >
                        Pincode: {Data.Pincode || ' Loading...'}
                      </StyledText>
                      <StyledText
                        fontSize="md"
                        border={0.1}
                        backgroundColor={colorMode === 'light' ? '#04050B0D' : '#282828'}
                        borderRadius={12}
                        pt={1.5}
                        pr={2}
                        pb={1.5}
                        pl={3}
                        width="100%"
                        textDecoration="underline"
                      >
                        <a href={Data.Location} target="_blank" rel="noopener noreferrer">
                          Location
                        </a>
                      </StyledText>
                    </Stack>
                  </Stack>
                  <Stack direction="row" gap={6}>
                    <StyledText
                      fontSize="md"
                      width={[24, 100, 250]}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <div>
                        <Icon fontSize={20}>
                          <LuPhone />
                        </Icon>
                        Phone
                      </div>
                    </StyledText>
                    <StyledText
                      border={0.1}
                      backgroundColor={colorMode === 'light' ? '#04050B0D' : '#282828'}
                      borderRadius={12}
                      p={2}
                      width="100%"
                      pt={1.5}
                      pr={2}
                      pb={1.5}
                      pl={3}
                    >
                      {Data.phone || 'Loading...'}
                    </StyledText>
                  </Stack>
                  <Stack direction="row" gap={6}>
                    <StyledText
                      fontSize="md"
                      width={[24, 100, 250]}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <div>
                        <Icon fontSize={21}>
                          <BsLink45Deg />
                        </Icon>
                        Website
                      </div>
                    </StyledText>
                    <StyledText
                      border={0.1}
                      backgroundColor={colorMode === 'light' ? '#04050B0D' : '#282828'}
                      borderRadius={12}
                      p={2}
                      width="100%"
                      pt={1.5}
                      pr={2}
                      pb={1.5}
                      pl={3}
                    >
                      {Data.website || 'Loading...'}
                    </StyledText>
                  </Stack>
                  <Stack direction="row" gap={6}>
                    <StyledText
                      fontSize="md"
                      width={[24, 100, 250]}
                      display="flex"
                      flexDirection="column"
                      alignItems="center"
                    >
                      <div>
                        <Icon fontSize={20}>
                          <IoMailOutline />
                        </Icon>
                        Email
                      </div>
                    </StyledText>
                    <StyledText
                      border={0.1}
                      backgroundColor={colorMode === 'light' ? '#04050B0D' : '#282828'}
                      borderRadius={12}
                      p={2}
                      width="100%"
                      pt={1.5}
                      pr={2}
                      pb={1.5}
                      pl={3}
                    >
                      {Data.email || 'Loading...'}
                    </StyledText>
                  </Stack>
                </Stack>
              </Flex>
              <Flex direction="column" wrap={true} gap={3} width={['100%', '100%', '49%']}>
                <StyledText fontSize={20} fontWeight="semibold" textDecoration="underline" mb="6">
                  Notifications
                </StyledText>
                <StyledBox
                  border={0.1}
                  backgroundColor={colorMode === 'light' ? '#04050B0D' : '#282828'}
                  borderRadius={12}
                  height="100%"
                  p={8}
                >
                  <StyledText> You don&apos;t have any new notifications now</StyledText>
                </StyledBox>
              </Flex>
            </Flex>
          </Box>
          <OrganizationSettingsModal isOpen={isOpen} onClose={onClose} />{' '}
          {/* Organization Settings modal */}
        </Stack>
      </Box>
    </DashboardLayout>
  );
}
