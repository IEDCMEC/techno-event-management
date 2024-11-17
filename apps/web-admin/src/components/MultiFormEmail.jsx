'use client';

import React, { useState } from 'react';
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
} from '@chakra-ui/react';
// import { TextareaAutosize } from '@mui/material';
import dynamic from 'next/dynamic';
import DOMPurify from 'dompurify';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';
const MDEditor = dynamic(() => import('@uiw/react-md-editor').then((mod) => mod.default), {
  ssr: false,
});
// import { bold, italic } from '@uiw/react-md-editor/lib/commands';
import { useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useContext } from 'react';
import { account } from '@/contexts/MyContext';
import DataDisplay from './DataDisplay';
import { useRouter } from 'next/router';

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
  const router = useRouter();
  const { eventId } = router.query;
  const showAlert = useAlert();
  const [newEmailProject, setNewEmailProject] = useState({
    name: '',
    desc: '',
  });
  const [step, setStep] = useState(1);
  const [selectedProject, setSelectedProject] = useState({});
  const { get, post } = useFetch();
  const [recipients, setRecipients] = useState([]);
  const { accountDetails, emailProjects, setEmailProjects, participants, setParticipants } =
    useContext(account);

  useEffect(() => {
    console.log(participants);
  }, [participants]);
  // useEffect(() => {
  //   async fetchEmailTemplate = ()=>
  //   if(accountDetails.orgId){

  //   }
  // }, [accountDetails]);
  const renderHtml = (markdown) => {
    const dirtyHtml = marked(markdown); // Convert Markdown to HTML
    return DOMPurify.sanitize(dirtyHtml); // Sanitize the HTML
  };
  const addNewRecipients = async () => {
    try {
      if (accountDetails.orgId) {
        const myData = recipients.map((value) => {
          return {
            name: value.firstName,
            email: value.email,
            payload: value.checkInKey,
          };
        });
        const response = await post(
          `/core/organizations/${accountDetails.orgId}/addNewRecipients`,
          {},
          {
            projectId: selectedProject.id,
            data: myData,
          },
        );
        if (response) {
          showAlert({
            title: 'Success',
            description: `Success: ${response.data.success} Failure: ${response.data.failure}`,
            status: 'success',
          });
        } else {
          showAlert({
            title: 'Failure',
            description: `Error updating recipients`,
            status: 'failure',
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const updateEmailTemplate = async (e) => {
    e.preventDefault();
    // console.log(renderHtml(emailContent));
    try {
      if (accountDetails.orgId) {
        const response = await post(
          `/core/organizations/${accountDetails.orgId}/updateEmailProject`,
          {},
          {
            projectId: selectedProject.id,
            html_template: emailContent,
          },
        );
        if (response) {
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
        } else {
          showAlert({
            title: 'Failure',
            description: 'Failed to update email template',
            status: 'failure',
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };
  const [subject, setSubject] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        //   console.log(process.env.NEXT_PUBLIC_API_URL);
        const response = await get(`/core/organizations/${accountDetails.orgId}/getEmailProjects`);
        console.log(response);
        if (response) {
          setEmailProjects(response.data.data);
        }
        console.log(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    return () => fetchData();
  }, []);

  const nextStep = async () => {
    if (step == 3) {
      console.log('hi');
      await addNewRecipients();
    }
    console.log(step);
    setStep((prev) => Math.min(prev + 1, 4));
  };
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));
  const sendEmails = async (e) => {
    // Handle email sending logic here
    e.preventDefault();
    try {
      console.log(selectedProject);
      if (accountDetails.orgId && eventId) {
        const template = renderHtml(selectedProject.html_template);
        // console.log(template);
        const response = await post(
          `/core/organizations/${accountDetails.orgId}/events/${eventId}/mailQR`,
          {},
          {
            projectId: selectedProject.id,
            html: template,
            subject: subject,
          },
        );
        if (response.status === 200) {
          showAlert({
            title: `Emails sent to ${response.data.nSuccess} people`,
            description: `Success: ${response.data.nSuccess} \nFailure: ${response.data}`,
            status: 'success',
          });
          nextStep();
        } else {
          console.log(response.data, response.status, response);
        }
      }
      setStep(1);
    } catch (e) {
      console.log(e);
    }
    console.log('Emails sent');
    onClose();
  };
  const handleEmailProjectSubmit = async (e) => {
    e.preventDefault();
    // console.log('Hekki')
    console.log(newEmailProject);
    if (emailProjects.length > 9) {
      showAlert({
        title: 'Failure',
        description: 'Email projects limit exceeded.',
        status: 'failure',
      });
    } else {
      try {
        const response = await post(
          `/core/organizations/${accountDetails.orgId}/newEmailProject`,
          {},
          {
            name: newEmailProject.name,
            desc: newEmailProject.desc,
          },
        );
        if (response) {
          showAlert({
            title: 'Success',
            description: 'Email Project Added',
            status: 'success',
          });
          await fetchData();
          setNewEmailProject({
            name: '',
            desc: '',
          });
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  useEffect(() => {
    console.log(recipients);
  }, [recipients]);
  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          sx={{
            minWidth: { base: '95vw', md: '70vw' },
            height: { base: '600px', md: '750px' },
          }}
        >
          <ModalHeader>Send QR Tickets</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {step === 1 && (
              <Box>
                <FormControl id="name" mb={4}>
                  <FormLabel>Select Email Project: </FormLabel>
                  <Select
                    placeholder="Select an Email recipient list"
                    // value={}
                    onChange={(e) => {
                      // console.log(emailProjects[e.target.value]['html_template']);
                      setSelectedProject(emailProjects[e.target.value]);
                      setEmailContent(emailProjects[e.target.value]['html_template']);
                    }}
                  >
                    {emailProjects.map((value, index) => {
                      // console.log(value);
                      return (
                        <option key={index} value={index}>
                          {value.name}
                        </option>
                      );
                    })}
                  </Select>
                  {/* <Input type="text" placeholder="Enter your name" /> */}
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
                      borderRadius="20px"
                      size="lg"
                      borderWidth="2px"
                      borderCollapse="separate"
                    >
                      <Tbody>
                        <Tr borderWidth={'2px'}>
                          <Th>ID: </Th>
                          <Th>{selectedProject.id}</Th>
                        </Tr>
                        <Tr borderWidth={'2px'}>
                          <Th>Description: </Th>
                          <Th>{selectedProject.description}</Th>
                        </Tr>
                        <Tr borderWidth={'2px'}>
                          <Th>name: </Th>
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
                  ------ OR ------
                </Box>
                <FormControl onSubmit={handleEmailProjectSubmit}>
                  <FormLabel>Create a new Email Project:</FormLabel>
                  <Input
                    onChange={(e) =>
                      setNewEmailProject((preValue) => ({
                        ...preValue,
                        name: e.target.value,
                      }))
                    }
                    value={newEmailProject.name}
                  />
                  <FormLabel>Description:</FormLabel>
                  <Input
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
                    <Button type="submit" mt={'30px'} onClick={handleEmailProjectSubmit}>
                      Create new project
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
                <FormLabel>Email Content: </FormLabel>
                {/* <div className="wmde-markdown-var"> </div> */}
                <MDEditor value={emailContent} onChange={setEmailContent} height={450} />
                <Button mt={'5'} onClick={updateEmailTemplate}>
                  Save Changes
                </Button>
              </FormControl>
            )}
            {step === 3 && (
              <FormControl id="email" mb={4}>
                <FormLabel>Add your recipients to email project</FormLabel>
                {/* <Input type="email" placeholder="Enter your email" /> */}
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
                    console.log(value);
                  }}
                  state={recipients.map((value) => value.id)}
                  // state={recipients}
                  setState={(selectedValue) => {
                    //console.log(selectedValue);
                    if (Array.isArray(selectedValue)) {
                      // console.log(selectedValue);
                      //console.log('hello trigger')
                      if (selectedValue.length > 0) {
                        setRecipients(participants);
                      } else {
                        setRecipients([]);
                      }
                    } else {
                      //console.log('trigger')
                      setRecipients((prevSelectedRows) => {
                        const myIds = prevSelectedRows.map((value) => value.id);
                        return myIds.includes(selectedValue.id)
                          ? prevSelectedRows.filter((value) => value.id !== selectedValue.id)
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
                  <FormLabel>Enter email subject: </FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter the subject for your email: "
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </FormControl>
                <Box>
                  <Text textStyle={'lg'}>Preview your email: </Text>
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
              <Box>
                
              </Box>
            )}
          </ModalBody>

          <ModalFooter
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: step > 1 ? 'space-between' : 'center',
              padding: '20px',
            }}
          >
            {step > 1 && (
              <Button onClick={prevStep} mr={3}>
                Previous
              </Button>
            )}
            {step < 4 ? (
              <Button
                onClick={() => {
                  nextStep();
                  //   console.log(step);
                }}
              >
                Next
              </Button>
            ) : (
              <Button colorScheme="blue" onClick={sendEmails}>
                Send Emails
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MultiStepModal;
