import { FormControl, FormLabel, Input } from '@chakra-ui/react';
// import {router} from 'next/router'
import { useFetch } from '../../web-admin/src/hooks/useFetch';
import { useAlert } from '../../web-admin/src/hooks/useAlert';
import { useEffect, useState } from 'react';

const Form = () => {
  const [attributes, setAttributes] = useState([]);
  const orgId = '';
  const eventId = '';
  const { get } = useFetch();
  const showAlert = useAlert();

  useEffect(() => {
    const fetchEventAttributes = async () => {
      const response = await get(`/core/organizations/${orgId}/events/${eventId}/attributes`);
      if (response?.status === 200) {
        setAttributes(response?.data.attributes || []);
      } else {
        showAlert({
          title: 'Error',
          description: response?.data.error,
          status: 'error',
        });
      }
    };
    fetchEventAttributes();
  }, []);

  return (
    <div>
      {attributes.map((attr: any, index: number) => {
        return (
          <FormControl mb={5} key={index}>
            <FormLabel>{attr.name}</FormLabel>
            <Input placeholder={`${attr.name}`} />
          </FormControl>
        );
      })}
    </div>
  );
};

export default Form;
