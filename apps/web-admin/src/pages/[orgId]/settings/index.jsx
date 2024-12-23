import { useRouter } from 'next/router';
import { account } from '@/contexts/MyContext';
import {
  Box,
  Stack,
  Text,
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
import { StyledIconButton, StyledDisabledIconButton } from '@/components/ui/StyledComponents';
import DashboardLayout from '@/layouts/DashboardLayout';
import OrganizationSettingsModal from '@/layouts/OrganizationSettingsModal';

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
      <Box width="100%" height="100%">
        <Stack spacing={4} direction="column" wrap={true}>
          <Box borderWidth="1px" borderRadius="md" p={6} shadow={6} margin={6}>
            <Flex direction={['column', 'row', 'row']} wrap={true} gap={8}>
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
              <Flex direction="column">
                <Box display="flex" flexDirection="row" justifyContent="space-between">
                  <Text fontSize={28} fontWeight="bold">
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
                <Text fontSize="md" padding={1}>
                  {Data.tagline || 'Loading...'}
                </Text>
                <Text fontSize="md" padding={1}>
                  {Data.description || 'Loading...'}
                </Text>
                <Flex direction={'row'} wrap={true} gap={4} padding={1}>
                  {Data.website ? (
                    <Link href={Data.website} isExternal>
                      <StyledIconButton aria-label="website" iconD="w" />
                    </Link>
                  ) : (
                    <StyledDisabledIconButton aria-label="website" iconD="w" />
                  )}
                  {Data.LinkedIn ? (
                    <Link href={Data.LinkedIn} isExternal>
                      <StyledIconButton aria-label="LinkedIn" iconD="l" />
                    </Link>
                  ) : (
                    <StyledDisabledIconButton aria-label="LinkedIn" iconD="l" />
                  )}
                  {Data.Twitter ? (
                    <Link href={Data.Twitter} isExternal>
                      <StyledIconButton aria-label="Twitter" iconD="t" />
                    </Link>
                  ) : (
                    <StyledDisabledIconButton aria-label="Twitter" iconD="t" />
                  )}
                  {Data.Instagram ? (
                    <Link href={Data.Instagram} isExternal>
                      <StyledIconButton aria-label="Instagram" iconD="i" />
                    </Link>
                  ) : (
                    <StyledDisabledIconButton aria-label="Instagram" iconD="i" />
                  )}
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Stack>
        <Stack direction="row">
          <Box
            borderWidth="1px"
            borderRadius="md"
            p={[4, 4, 6]}
            shadow={6}
            margin={5}
            width={'100%'}
          >
            <Flex direction={['column', 'column', 'row']} wrap={true} justify="space-between">
              <Flex direction="column" wrap={true} gap={4}>
                <Text
                  fontSize={20}
                  fontWeight="semibold"
                  textDecoration="underline"
                  width={[200, 200, 250]}
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                >
                  Contact Info
                </Text>
                <Stack direction="row" gap={8}>
                  <Text
                    fontSize="md"
                    width={[24, 100, 250]}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                  >
                    <div>
                      <Icon fontSize={20}>
                        <GrLocation />
                      </Icon>
                      Address
                    </div>
                  </Text>
                  <Stack display="flex" flexDirection="column" alignItems="start">
                    <Text fontSize="md">City: {Data.City || ' Loading...'}</Text>
                    <Text fontSize="md">State: {Data.State || ' Loading...'}</Text>
                    <Text fontSize="md">Country: {Data.Country || ' Loading...'}</Text>
                    <Text fontSize="md">Pincode: {Data.Pincode || ' Loading...'}</Text>
                    <a href={Data.Location} target="_blank" rel="noopener noreferrer">
                      Location
                    </a>
                  </Stack>
                </Stack>
                <Stack direction="row" gap={8}>
                  <Text
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
                  </Text>
                  <Text>{Data.phone || 'Loading...'}</Text>
                </Stack>
                <Stack direction="row" gap={8}>
                  <Text
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
                  </Text>
                  <Text>{Data.website || 'Loading...'}</Text>
                </Stack>
                <Stack direction="row" gap={8}>
                  <Text
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
                  </Text>
                  <Text>{Data.email || 'Loading...'}</Text>
                </Stack>
              </Flex>
              <Flex direction="column" wrap={true} gap={3}>
                <Text fontSize={20} fontWeight="semibold" textDecoration="underline">
                  Notifications
                </Text>
                <Box
                  border={0.1}
                  backgroundColor={colorMode === 'light' ? '#04050B0D' : '#282828'}
                  height="100%"
                  borderRadius={12}
                  p={8}
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  You don&apos;t have any new notifications now
                </Box>
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
