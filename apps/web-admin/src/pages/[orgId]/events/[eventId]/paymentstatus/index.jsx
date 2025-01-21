import { useRouter } from 'next/router';
import { useState } from 'react';
import { StyledBox, StyledButton, StyledText } from '@/components/ui/StyledComponents';
import DashboardLayout from '@/layouts/DashboardLayout';
import DataDisplay from '@/components/DataDisplay';
import { useAlert } from '@/hooks/useAlert';
import useWrapper from '@/hooks/useWrapper';
import NavigationMenu from '../navigationmenu';

import { useDisclosure } from '@chakra-ui/react';
import CheckInParticipantWithMultiScanner from '@/components/modals/MultiStageScanner/index';
import CheckInParticipant from '@/components/modals/Check-inParticipant/index';
import CheckInParticipantWithScanner from '@/components/modals/Check-in-Scanner/index';
import CheckOutParticipant from '@/components/modals/Check-OutParticipant/index';
import CheckOutParticipantWithScanner from '@/components/modals/Check-Out-Scanner/index';
import { useEffect } from 'react';
import useDebounce from '@/hooks/useDebounce';

export default function ParticipantsCheckIn() {
  const router = useRouter();
  const showAlert = useAlert();
  const { orgId, eventId } = router.query;
  const [participantsCheckIn, setParticipantsCheckIn] = useState([]);
  const [search, setSearch] = useState({
    value: '',
    result: participantsCheckIn,
  });
  const { useGetQuery, usePostMutation } = useWrapper();
  // useEffect(() => {
  //   if (search.value.length !== 0) {
  //     setSearch((preValue) => ({
  //       ...preValue,
  //       result: participantsCheckIn.filter((value) =>
  //         value.firstName.toLowerCase().includes(search.value.toLowerCase()),
  //       ),
  //     }));
  //   } else {
  //     setSearch({ value: '', result: participantsCheckIn });
  //   }
  // }, [search.value]);
  useDebounce(
    () => {
      if (search.value.length !== 0) {
        setSearch((preValue) => ({
          ...preValue,
          result: participantsCheckIn.filter((value) =>
            value.firstName.toLowerCase().includes(search.value.toLowerCase()),
          ),
        }));
      } else {
        setSearch({ value: '', result: participantsCheckIn });
      }
    },
    500,
    [search.value],
  );
  const {
    data,
    status,
    error,
    isFetching: loading,
  } = useGetQuery(
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

  const { mutate: handlePaymentStatusMutation } = usePostMutation(
    `/core/organizations/${orgId}/events/${eventId}/participants/payment-status`,
    {},
    {
      onSuccess: (response) => {
        showAlert({
          title: 'Success',
          description: 'Payment status for participant has been updated successfully.',
          status: 'success',
        });
      },
      onError: (error) => {
        showAlert({
          title: 'Error',
          description: error.message,
          status: 'error',
        });
      },
    },
  );

  const columns = [
    { field: 'firstName', headerName: 'First Name', width: 200 },
    { field: 'lastName', headerName: 'Last Name', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'checkInKey', headerName: 'Check In Key', width: 200 },
    {
      field: 'paymentStatus',
      headerName: 'Payment Status',
      width: 150,
      togglePaymentStatus: (id, status) => {
        handlePaymentStatusMutation({
          participantId: id,
          paymentStatus: status,
        });
        setParticipantsCheckIn((prevParticipants) =>
          prevParticipants.map((participant) =>
            participant.id === id ? { ...participant, paymentStatus: status } : participant,
          ),
        );
        if (search.result.length !== 0) {
          setSearch((preValue) => ({
            ...preValue,
            result: preValue.result.map((participant) =>
              participant.id === id ? { ...participant, paymentStatus: status } : participant,
            ),
          }));
        }
      },
    },
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
          <div className="flex gap-2.5">
            <StyledButton onClick={onMultiScannerModalOpen} isLoading={loading}>
              <StyledText>Multi-Stage Scanner</StyledText>
            </StyledButton>
            <StyledButton onClick={onCheckInModalOpen} isLoading={loading}>
              <StyledText>Check-In Participant</StyledText>
            </StyledButton>
            <StyledButton onClick={onScanner1ModalOpen} isLoading={loading}>
              <StyledText>Open Scanner</StyledText>
            </StyledButton>
            <StyledButton onClick={onCheckOutModalOpen} isLoading={loading}>
              <StyledText>Check-Out Participant</StyledText>
            </StyledButton>
            <StyledButton onClick={onScanner2ModalOpen} isLoading={loading}>
              <StyledText>Open Scanner</StyledText>
            </StyledButton>
          </div>
        }
        state={search.value}
        setState={(currentValue) => {
          setSearch((preValue) => ({
            ...preValue,
            value: currentValue,
          }));
        }}
      />

      <DataDisplay
        loading={loading}
        rows={search.value.length === 0 ? participantsCheckIn : search.result}
        columns={columns}
        // overflowY='scroll'
        // onRowClick={(row) => {
        //   router.push(`/${orgId}/events/${eventId}/participants/${row.id}`);
        // }}
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
