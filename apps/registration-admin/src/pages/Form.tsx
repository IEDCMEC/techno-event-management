import { FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useFetch } from '../hooks/useFetch';
import { useAlert } from '../hooks/useAlert';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Form = () => {
  const [attributes, setAttributes] = useState<any[]>([]);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const { eventID, orgID } = useParams<{ eventID: string; orgID: string }>();
  const { get, post } = useFetch();
  const showAlert = useAlert();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEventAttributes = async () => {
      const checkResponse = await get(`/registration/${orgID}/event/${eventID}/verify`);
      if (checkResponse?.status === 200) {
        const response = await get(`/registration/${orgID}/event/${eventID}/attributes`);
        if (response?.status === 200) {
          setAttributes(response?.data.attributes || []);
        } else {
          showAlert({
            title: 'Error',
            description: response?.data.error,
            status: 'error',
          });
        }
      } else {
        navigate('/');
      }
    };
    fetchEventAttributes();
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);
    const response = await post(`/registration/${orgID}/event/${eventID}/submit`, formData);
    if (response?.status === 200) {
      showAlert({
        title: 'Success',
        description: 'Form submitted successfully!',
        status: 'success',
      });
      navigate('/');
    } else {
      showAlert({
        title: 'Error',
        description: response?.data.error || 'Submission failed.',
        status: 'error',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {attributes.map((attr: any, index: number) => (
        <FormControl mb={5} key={index} isRequired>
          <FormLabel>{attr.name}</FormLabel>
          <Input
            id={attr.id}
            name={attr.name} // Use the attribute name as the input name
            placeholder={`${attr.name}`}
            onChange={handleInputChange} // Handle input change
            required // Mark as required
          />
        </FormControl>
      ))}
      <Button type="submit" colorScheme="blue">
        Submit
      </Button>
    </form>
  );
};

export default Form;