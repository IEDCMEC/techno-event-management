import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  ChevronLeftIcon,
  ChevronDownIcon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/icons';
import CustomStyledBox from '@/pages/CustomStyledBox';
import { Button, Flex } from '@chakra-ui/react';
import { StyledBox, StyledText } from '@/components/ui/StyledComponents';
import DashboardLayout from '@/layouts/DashboardLayout';
import DataDisplay from '@/components/DataDisplay';
import { useAlert } from '@/hooks/useAlert';
import { useFetch } from '@/hooks/useFetch';
import useWrapper from '@/hooks/useWrapper';
import NavigationMenu from '../../navigationmenu';

import { useDisclosure } from '@chakra-ui/react';
import CheckInParticipantWithMultiScanner from '@/pages/[orgId]/events/[eventId]/participants/check-in/multi-in/index';
import CheckInParticipant from '@/pages/[orgId]/events/[eventId]/participants/check-in/in/index';
import CheckInParticipantWithScanner from '@/pages/[orgId]/events/[eventId]/participants/check-in/in/scanner/index';
import CheckOutParticipant from '@/pages/[orgId]/events/[eventId]/participants/check-in/out/index';
import CheckOutParticipantWithScanner from '@/pages/[orgId]/events/[eventId]/participants/check-in/out/scanner/index';

const columns = [
  { field: 'firstName', headerName: 'First Name', width: 200 },
  { field: 'lastName', headerName: 'Last Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'checkInKey', headerName: 'Check In Key', width: 200 },
  {
    field: 'checkedInAt',
    headerName: 'Check-In At',
    width: 200,
    valueGetter: (params) => params.row?.checkIn?.checkedInAt || 'Not Checked In',
  },

  {
    field: 'checkedInByEmail',
    headerName: 'Checked In By',
    width: 200,
    valueGetter: (params) => params.row?.checkIn?.checkedInByEmail,
  },
];

export default function ParticipantsCheckIn() {
  const router = useRouter();
  const showAlert = useAlert();

  const { orgId, eventId } = router.query;
  const { loading, get } = useFetch();

  const { useGetQuery } = useWrapper();

  const [participantsCheckIn, setParticipantsCheckIn] = useState([]);

  const { data, status, error } = useGetQuery(
    `/core/organizations/${orgId}/events/${eventId}/participants/check-in`,
    `/core/organizations/${orgId}/events/${eventId}/participants/check-in`,
    {},
    {},
    (data) => {
      setParticipantsCheckIn(data.data.participantsCheckIn || []);
    },
  );

  const {
    isOpen: isMultiScannerModalOpen,
    onOpen: onMultiScannerModalOpen,
    onClose: onMultiScannerModalClose,
  } = useDisclosure();
  const {
    isOpen: isCheckInModalOpen,
    onOpen: onCheckInModalOpen,
    onClose: onCheckInModalClose,
  } = useDisclosure();
  const {
    isOpen: isScanner1ModalOpen,
    onOpen: onScanner1ModalOpen,
    onClose: onScanner1ModalClose,
  } = useDisclosure();
  const {
    isOpen: isScanner2ModalOpen,
    onOpen: onScanner2ModalOpen,
    onClose: onScanner2ModalClose,
  } = useDisclosure();
  const {
    isOpen: isCheckOutModalOpen,
    onOpen: onCheckOutModalOpen,
    onClose: onCheckOutModalClose,
  } = useDisclosure();

  return (
    <DashboardLayout
      pageTitle="Participants Check-In"
      previousPage={`/${orgId}/events/${eventId}/participants`}
      debugInfo={participantsCheckIn}
    >
      <NavigationMenu
        orgId={orgId}
        eventId={eventId}
        navButton={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              marginTop: '10px',
            }}
          >
            {/* Left side content */}
            <div style={{ display: 'flex', gap: '10px' }}>
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
                  Participants Check-in Details
                </MenuButton>
                <MenuList bg="gray.100" borderColor="gray.200">
                  <MenuItem
                    color="gray.700"
                    fontWeight="medium"
                    _hover={{ bg: 'gray.200' }}
                    onClick={() => router.push(`/${orgId}/events/${eventId}/participants`)}
                  >
                    Participants Details
                  </MenuItem>
                  <MenuItem
                    color="gray.700"
                    fontWeight="medium"
                    _hover={{ bg: 'gray.200' }}
                    onClick={() => router.push(`/${orgId}/events/${eventId}/attributes`)}
                  >
                    Attributes Details
                  </MenuItem>
                  <MenuItem
                    color="gray.700"
                    fontWeight="medium"
                    _hover={{ bg: 'gray.200' }}
                    onClick={() => router.push(`/${orgId}/events/${eventId}/extras`)}
                  >
                    Extras Details
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>

            {/* Right side content */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button
                onClick={() => {
                  router.push(`/${orgId}/events/${eventId}/participants/check-in/multi-in`);
                }}
                isLoading={loading}
                colorScheme="gray"
              >
                Multi-Stage Scanner
              </Button>
              <Button
                onClick={() => {
                  router.push(`/${orgId}/events/${eventId}/participants/check-in/in/`);
                }}
                isLoading={loading}
                colorScheme="gray"
              >
                Check-In Participant
              </Button>
              <Button
                onClick={() => {
                  router.push(`/${orgId}/events/${eventId}/participants/check-in/in/scanner`);
                }}
                isLoading={loading}
                colorScheme="gray"
              >
                Open Scanner
              </Button>
              <Button
                onClick={() => {
                  router.push(`/${orgId}/events/${eventId}/participants/check-in/out/`);
                }}
                isLoading={loading}
                colorScheme="gray"
              >
                Check-Out Participant
              </Button>
              <Button
                onClick={() => {
                  router.push(`/${orgId}/events/${eventId}/participants/check-in/out/scanner`);
                }}
                isLoading={loading}
                colorScheme="gray"
              >
                Open Scanner
              </Button>
            </div>
          </div>
        }
      />

      {/* <CustomStyledBox></CustomStyledBox> */}

      <DataDisplay
        loading={loading}
        rows={participantsCheckIn}
        columns={columns}
        onRowClick={(row) => {
          router.push(`/${orgId}/events/${eventId}/participants/${row.id}`);
        }}
      />
      {!loading && participantsCheckIn.length === 0 ? (
        <StyledBox style={{ textAlign: 'center', margin: '20px' }}>
          <StyledText fontSize="25px" color={'blackAlpha.800'} mb={3}>
            No participants checked-in
          </StyledText>
          <StyledText color={'gray.500'} mb={3}>
            Add details about the checked-in participants
          </StyledText>
        </StyledBox>
      ) : (
        <></>
      )}
      <CheckInParticipantWithMultiScanner
        isOpen={isMultiScannerModalOpen}
        onClose={onMultiScannerModalClose}
      />
      <CheckInParticipant isOpen={isCheckInModalOpen} onClose={onCheckInModalClose} />
      <CheckInParticipantWithScanner isOpen={isScanner1ModalOpen} onClose={onScanner1ModalClose} />
      <CheckOutParticipant isOpen={isCheckOutModalOpen} onClose={onCheckOutModalClose} />
      <CheckOutParticipantWithScanner isOpen={isScanner2ModalOpen} onClose={onScanner2ModalClose} />
    </DashboardLayout>
  );
}
