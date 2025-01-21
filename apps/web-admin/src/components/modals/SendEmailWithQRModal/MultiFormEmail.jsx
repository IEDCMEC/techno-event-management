'use client';

import React, { useState, useEffect } from 'react';
import { useAlert } from '@/hooks/useAlert';
import { marked } from 'marked';
import {
  Button,
  Modal,
  ModalOverlay,
  Box,
  Table,
  Th,
  Tr,
  ModalContent,
  Text,
  Tbody,
  ModalHeader,
  TableContainer,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Select,
  Input,
  useColorMode,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
const MDEditor = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default), {
  ssr: false,
});
// import { bold, italic } from '@uiw/react-md-editor/lib/commands';
import { useContext } from 'react';
import DataDisplayNew from '../../DataDisplayNew';
import useWrapper from '@/hooks/useWrapper';
// import { useEffect } from 'react';
import { account } from '@/contexts/MyContext';
import DataDisplay from '../../DataDisplay';
import { useRouter } from 'next/router';
import { inter } from '@/components/ui/fonts';
import { StyledText } from '@/components/ui/StyledComponents';
// const EditerMarkdown = dynamic(
//   () =>
//     import('@uiw/react-md-editor').then((mod) => {
//       return mod.default.Markdown;
//     }),
//   { ssr: false },
// );
// const Markdown = dynamic(() => import('@uiw/react-markdown-preview').then((mod) => mod.default), {
//   ssr: false,
// });

const MultiStepModal = ({ isOpen, onClose, emailContent, setEmailContent }) => {
  const { colorMode } = useColorMode();
  const router = useRouter();
  const { eventId } = router.query;
  // const queryClient = useQueryClient();
  const showAlert = useAlert();
  const [newEmailProject, setNewEmailProject] = useState({
    name: '',
    desc: '',
  });
  const [step, setStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState({});
  const [recipients, setRecipients] = useState([]);
  const [mailStatus, setMailStatus] = useState(null);
  let flag1 = false;
  let flag2 = false;
  useEffect(() => {
    const fetchText = async () => {
      const response = await fetch('/QrTemplate.txt');
      const data = await response.text();
      setEmailContent(data);
      // //console.log(data);
    };
    if (emailContent.length === 0) {
      //console.log('fetching text');
      fetchText();
    }
  }, [selectedProject]);
  const { accountDetails, emailProjects, setEmailProjects, participants, setParticipants } =
    useContext(account);

  // useEffect(() => {
  //   //console.log(participants);
  // }, [participants]);
  // useEffect(() => {
  //   async fetchEmailTemplate = ()=>
  //   if(accountDetails.orgId){

  //   }
  // }, [accountDetails]);
  const renderHtml = (markdown) => {
    const dirtyHtml = marked(markdown); // Convert Markdown to HTML
    return DOMPurify.sanitize(dirtyHtml); // Sanitize the HTML
  };
  const { useGetQuery, usePostMutation } = useWrapper();
  const { mutate: addRecipientsMutation } = usePostMutation(
    `/core/organizations/${accountDetails.orgId}/addNewRecipients`,
    {},
    {
      onSuccess: (response) => {
        showAlert({
          title: 'Success',
          description: `Success: ${response.data.success} Failure: ${response.data.failure}`,
          status: 'success',
        });
      },
      onError: (error) => {
        //console.error('Error updating recipients:', error);
        showAlert({
          title: 'Failure',
          description: `Error updating recipients`,
          status: 'error',
        });
      },
      invalidateKeys: [
        `/core/organizations/${accountDetails.orgId}/getRecipients/${selectedProject.id}`,
      ],
    },
  );
  // const {data, isFetching: loading} = useGetQuery(`/core/organizations/${accountDetails.orgId}/`)
  const addNewRecipients = () => {
    if (accountDetails.orgId) {
      const myData = recipients.map((value) => ({
        name: value.firstName,
        email: value.email,
        payload: value.checkInKey,
      }));
      ////console.log('Request');
      ////console.log(myData, recipients);
      // Trigger the mutation
      addRecipientsMutation({
        projectId: selectedProject.id,
        data: myData,
      });
    }
  };
  useEffect(() => {
    ////console.log(recipients);
  }, [recipients]);
  // ////console.log(`/core/organizations/${accountDetails.orgId}/getRecipients/${selectedProject.id}`);
  useGetQuery(
    `/core/organizations/${accountDetails.orgId}/getRecipients/${
      selectedProject.id ? selectedProject.id : ''
    }`,
    `/core/organizations/${accountDetails.orgId}/getRecipients/${
      selectedProject.id ? selectedProject.id : ''
    }`,
    {},
    {
      onError: (error) => {
        ////console.log(error);
      },
    },
    (response) => {
      // ////console.log(response.data.recipients);
      // setMailStatus(response.data.recipients);
      setRecipients(() => {
        const myParts = response.data.recipients.map((value) => value.email);
        return participants.filter((value) => myParts.includes(value.email));
      });
    },
  );
  const { mutate: updateEmailMutation } = usePostMutation(
    `/core/organizations/${accountDetails.orgId}/updateEmailProject`,
    {},
    {
      onSuccess: (response) => {
        setEmailProjects((preValue) => {
          const temp1 = preValue.filter((value, index) => value.id !== response.data.id);
          return [...temp1, response.data];
        });
        setSelectedProject((preValue) => {
          return {
            ...preValue,
            html_template: response.data.data.html_template,
          };
        });
        showAlert({
          title: 'Success',
          description: 'Update Email template',
          status: 'success',
        });
      },
      onError: (error) => {
        ////console.log(error);
        showAlert({
          title: 'Failure',
          description: 'Failed to update email template',
          status: 'failure',
        });
      },
      invalidateKeys: [
        `/core/organizations/${accountDetails.orgId}/getEmailProjects`,
        `/core/organizations/${accountDetails.orgId}/getRecipients/${selectedProject.id}`,
      ],
    },
    ({ data, variables, context }) => {
      ////console.log(data);
    },
  );
  const updateEmailTemplate = async (e) => {
    e?.preventDefault();
    ////console.log(emailContent);
    if (accountDetails.orgId) {
      if (/<\s+[^>]+\s+>/.test(emailContent)) {
        flag1 = false; //make this true
      }
      if (!(/{{name}}/.test(emailContent) && /{{payload}}/.test(emailContent))) {
        flag2 = true;
      }
      ////console.log(flag3);
      updateEmailMutation({
        projectId: selectedProject.id,
        html_template: emailContent,
      });
    }
  };
  const [subject, setSubject] = useState('');

  const {
    data: emailContentData,
    status: emailContentStatus,
    error: emailContentError,
    isFetching: loading,
  } = useGetQuery(
    `/core/organizations/${accountDetails.orgId}/getEmailProjects`,
    `/core/organizations/${accountDetails.orgId}/getEmailProjects`,
    {},
    {},
    (response) => {
      setEmailProjects(response.data.data);
    },
  );

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const { mutate: sendEmailMutation } = usePostMutation(
    `/core/organizations/${accountDetails.orgId}/events/${eventId}/mailQR`,
    {},
    {
      onSuccess: (response) => {
        showAlert({
          title: `Emails sent to ${response.data.nSuccess} people`,
          description: `Success: ${response.data.nSuccess} \nFailure: ${response.data.nFailure}`,
          status: 'success',
        });
        setStep(5);
        // onClose();
      },
      onError: (error) => {
        ////console.log(error);
      },
    },
  );
  const sendEmails = async (e) => {
    // Handle email sending logic here
    e.preventDefault();
    if (accountDetails.orgId && eventId) {
      const template = renderHtml(selectedProject.html_template);
      sendEmailMutation(
        {
          projectId: selectedProject.id,
          html: template,
          subject: subject,
        },
        {
          onSuccess: (response) => {
            ////console.log(response.data);
            // setMailStatus(response.data);
          },
        },
      );
    }
  };

  const { mutate: emailProjectMutation } = usePostMutation(
    `/core/organizations/${accountDetails.orgId}/newEmailProject`,
    {},
    {
      onSuccess: (response) => {
        ////console.log(response);
        showAlert({
          title: 'Success',
          description: 'Email Project Added',
          status: 'success',
        });
        // await fetchData();
        setNewEmailProject({
          name: '',
          desc: '',
        });
      },
      onError: (error) => {
        //console.error('Error adding new project:', error);
        showAlert({
          title: 'Failure',
          description: `Error adding new project`,
          status: 'error',
        });
      },
      invalidateKeys: [
        `/core/organizations/${accountDetails.orgId}/getEmailProjects`,
        `/core/organizations/${accountDetails.orgId}/getRecipients/${selectedProject.id}`,
      ],
    },
    ({ data, variables, context }) => {
      ////console.log(data);
    },
  );
  const handleEmailProjectSubmit = async (e) => {
    e.preventDefault();
    // ////console.log('Hekki')
    ////console.log(newEmailProject);
    if (emailProjects.length > 9) {
      showAlert({
        title: 'Failure',
        description: 'Email projects limit exceeded.',
        status: 'failure',
      });
    } else {
      emailProjectMutation({
        name: newEmailProject.name,
        desc: newEmailProject.desc,
        html_template: emailContent,
      });
    }
  };
  const {
    isLoading,
    isSuccess,
    data: mailStatusData,
    mutate: checkMailStatusMutation,
  } = usePostMutation(
    `/core/organizations/${accountDetails.orgId}/getStatusOfEmails`,
    {},
    {
      onSuccess: (response) => {
        ////console.log(response.data);
        setMailStatus(response.data);
      },
    },
  );
  const nextStep = async () => {
    if (step == 3) {
      ////console.log('hi');
      addNewRecipients();
    }
    ////console.log(step);
    setStep((prev) => Math.min(prev + 1, 5));
    // if(step == 4){
    //   checkMailStatusMutation({
    //     emailArray: recipients.map((value)=> value.email)
    //   })
    // }
  };
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="outside" isCentered>
        <ModalOverlay />
        <ModalContent
          sx={{
            minWidth: { base: '95vw', md: '70vw' },
            height: { base: '600px', md: '750px' },
          }}
          borderRadius="10px"
        >
          <ModalHeader
            fontSize="28px"
            backgroundColor="#AFB4E9"
            p={6}
            borderTopLeftRadius="10px"
            borderTopRightRadius="10px"
            color="black"
          >
            <Text fontFamily={inter.style.fontFamily} fontSize="25px">
              Send QR Tickets
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}>
            {step === 1 && (
              <Box>
                <FormControl id="name" mb={4}>
                  <FormLabel fontFamily={inter.style.fontFamily}>Select Email Project: </FormLabel>
                  <Select
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    placeholder="Select an Email recipient list"
                    // value={}
                    onChange={(e) => {
                      // ////console.log(emailProjects[e.target.value]['html_template']);
                      setSelectedProject(emailProjects[e.target.value]);
                      setEmailContent(emailProjects[e.target.value]['html_template']);
                    }}
                  >
                    {emailProjects.map((value, index) => {
                      // ////console.log(value);
                      return (
                        <option key={index} value={index}>
                          {value.name}
                        </option>
                      );
                    })}
                  </Select>
                  {/* <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                   type="text" placeholder="Enter your name" /> */}
                </FormControl>
                {selectedProject && (
                  <TableContainer
                    sx={{
                      //   border: '1px solid grey',
                      borderRadius: '20px',
                      padding: '5px',
                    }}
                  >
                    <Table
                      variant="simple"
                      size="lg"
                      borderWidth="2px"
                      borderCollapse="separate"
                      backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    >
                      <Tbody>
                        <Tr borderWidth={'2px'}>
                          <Th>
                            <StyledText> ID: </StyledText>
                          </Th>
                          <Th>{selectedProject.id}</Th>
                        </Tr>
                        <Tr borderWidth={'2px'}>
                          <Th>
                            <StyledText>Description: </StyledText>{' '}
                          </Th>
                          <Th>{selectedProject.description}</Th>
                        </Tr>
                        <Tr borderWidth={'2px'}>
                          <Th>
                            <StyledText> name:</StyledText>{' '}
                          </Th>
                          <Th>{selectedProject.name}</Th>
                        </Tr>
                      </Tbody>
                    </Table>
                  </TableContainer>
                )}
                <Box
                  sx={{
                    width: '100%',
                    color: 'black',
                    fontWeight: '500',
                    textAlign: 'center',
                    fontSize: '2rem',
                  }}
                >
                  <Text fontFamily={inter.style.fontFamily}> ------ OR ------</Text>
                </Box>
                <FormControl onSubmit={handleEmailProjectSubmit}>
                  <FormLabel fontFamily={inter.style.fontFamily}>
                    Create a new Email Project:
                  </FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    onChange={(e) =>
                      setNewEmailProject((preValue) => ({
                        ...preValue,
                        name: e.target.value,
                      }))
                    }
                    value={newEmailProject.name}
                  />
                  <FormLabel fontFamily={inter.style.fontFamily}>Description:</FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    onChange={(e) =>
                      setNewEmailProject((preValue) => ({
                        ...preValue,
                        desc: e.target.value,
                      }))
                    }
                    value={newEmailProject.desc}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                      flexDirection: 'column',
                    }}
                  >
                    <Button
                      backgroundColor="#AFB4E9"
                      color="black"
                      _hover={{ backgroundColor: '#D0D6F6 ' }}
                      type="submit"
                      mt={'30px'}
                      onClick={handleEmailProjectSubmit}
                    >
                      <StyledText> Create new project</StyledText>
                    </Button>
                  </Box>
                </FormControl>
              </Box>
            )}
            {step === 2 && (
              <FormControl
                id="email-content"
                data-color-mode="light"
                mb={4}
                // sx={{
                //   display: 'flex',
                //   alignItems: 'center',
                //   justifyContent: 'center',
                //   flexDirection: 'column',
                //   width: '100%',
                // }}
              >
                <FormLabel fontFamily={inter.style.fontFamily}>Email Content: </FormLabel>
                {/* <div className="wmde-markdown-var"> </div> */}
                <MDEditor value={emailContent} onChange={setEmailContent} height={450} />
                <Button
                  backgroundColor="#AFB4E9"
                  color="black"
                  _hover={{ backgroundColor: '#D0D6F6 ' }}
                  mt={'5'}
                  onClick={updateEmailTemplate}
                >
                  <StyledText> Save Changes</StyledText>
                </Button>
              </FormControl>
            )}
            {step === 3 && (
              <FormControl id="email" mb={4}>
                <FormLabel fontFamily={inter.style.fontFamily}>
                  Add your recipients to email project
                </FormLabel>
                {/* <Input
                  backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                 type="email" placeholder="Enter your email" /> */}
                <DataDisplay
                  columns={[
                    { field: 'checkInKey', headerName: 'QR Code' },
                    { field: 'firstName', headerName: 'Name' },
                    { field: 'email', headerName: 'Email' },
                  ]}
                  rows={participants}
                  overflowY="visible"
                  height="500px"
                  onRowClick={(value) => {
                    ////console.log(value);
                  }}
                  isCheckBox={true}
                  state={recipients.map((value) => value.email)}
                  // state={recipients}
                  setState={(selectedValue) => {
                    //////console.log(selectedValue);
                    if (Array.isArray(selectedValue)) {
                      // ////console.log(selectedValue);
                      //////console.log('hello trigger')
                      if (selectedValue.length > 0) {
                        setRecipients(participants);
                      } else {
                        setRecipients([]);
                      }
                    } else {
                      //////console.log('trigger')
                      setRecipients((prevSelectedRows) => {
                        ////console.log(prevSelectedRows);
                        const myIds = prevSelectedRows.map((value) => value.email);
                        return myIds.includes(selectedValue.email)
                          ? prevSelectedRows.filter((value) => value.email !== selectedValue.email)
                          : [...prevSelectedRows, selectedValue];
                      });
                    }
                    // setRecipients((value))
                  }}
                />
              </FormControl>
            )}
            {step === 4 && (
              <Box>
                <FormControl id="email" mb={4}>
                  <FormLabel fontFamily={inter.style.fontFamily}>Enter email subject: </FormLabel>
                  <Input
                    backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE12'}
                    type="text"
                    placeholder="Enter the subject for your email: "
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </FormControl>
                <Box>
                  <StyledText textStyle={'lg'}>Preview your email: </StyledText>
                  <div
                    // mt={'10px'}
                    // p={'20px'}
                    style={{
                      border: '1px solid #ccc',
                      maxHeight: '450px',
                      overflowY: 'auto',
                      padding: '20px',
                      marginTop: '10px',
                    }}
                    dangerouslySetInnerHTML={{ __html: renderHtml(emailContent) }}
                  />
                </Box>
              </Box>
            )}
            {step === 5 && (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <Box width={'100%'}>
                  <StyledText fontWeight="bold" mb={2}>
                    Emails sent:
                  </StyledText>
                  <DataDisplayNew
                    columns={[
                      { field: 'checkInKey', headerName: 'QR Code' },
                      { field: 'firstName', headerName: 'Name' },
                      { field: 'email', headerName: 'Email' },
                    ]}
                    height="250px"
                    rows={recipients}
                    overflowY="visible"
                  ></DataDisplayNew>
                </Box>
                <Box width={'100%'}>
                  <StyledText fontWeight="bold" mb={2}>
                    Email not sent:
                  </StyledText>
                  <DataDisplayNew
                    columns={[
                      { field: 'checkInKey', headerName: 'QR Code' },
                      { field: 'firstName', headerName: 'Name' },
                      { field: 'email', headerName: 'Email' },
                    ]}
                    rows={participants.filter((participant) => !recipients.includes(participant))}
                    height="250px"
                    overflowY="visible"
                  ></DataDisplayNew>
                </Box>
              </Box>
            )}
          </ModalBody>

          <ModalFooter
            backgroundColor={colorMode === 'light' ? '#EEEFFF' : '#101116'}
            borderBottomRadius="10px"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: step === 1 ? 'center' : step < 5 ? 'space-between' : 'flex-end',
              padding: '20px',
            }}
          >
            {step > 1 && step !== 5 && (
              <Button
                width={'20%'}
                backgroundColor={colorMode === 'light' ? '#04050B12' : '#FBFBFE1212'}
                onClick={prevStep}
                mr={3}
              >
                <StyledText> Previous</StyledText>
              </Button>
            )}
            {step < 4 && (
              <Button
                onClick={() => {
                  if (step === 2) {
                    updateEmailTemplate();
                    if (!(flag1 || flag2)) {
                      nextStep();
                    } else {
                      showAlert({
                        title: 'Failure...make sure',
                        description: 'Check whether {{}} is present and < something > is not',
                        status: 'success',
                      });
                    }
                  } else {
                    nextStep();
                  }
                  //   ////console.log(step);
                }}
                width={'20%'}
                backgroundColor="#AFB4E9"
                color="black"
                _hover={{ backgroundColor: '#D0D6F6 ' }}
              >
                <StyledText> Next</StyledText>
              </Button>
            )}
            {step === 4 && (
              <Button
                backgroundColor="#AFB4E9"
                color="black"
                _hover={{ backgroundColor: '#D0D6F6 ' }}
                onClick={sendEmails}
              >
                <StyledText>Send Emails</StyledText>
              </Button>
            )}
            {step === 5 && (
              <Button
                onClick={() => {
                  onClose();
                  setStep(1);
                  //   ////console.log(step);
                }}
                backgroundColor="#AFB4E9"
                color="black"
                _hover={{ backgroundColor: '#D0D6F6 ' }}
              >
                <StyledText>Close</StyledText>
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MultiStepModal;
