import { Card, CardBody, Image, Text, Box } from '@chakra-ui/react';
import { useRouter } from 'next/router';
const ItemCard = (props) => {
  const router = useRouter();

  if (props.logo == '') {
    var logo = '/ThisIsAnORG.png';
  } else {
    var logo = props.logo;
  }
  return (
    <Box
      boxShadow="base"
      backgroundColor="D9D9D9"
      borderRadius="30px"
      borderColor="gray"
      height="180px"
      width="180px"
      display="flex"
      flexDir="column"
      alignItems="center"
    >
      <Image
        src={logo}
        alt="logo of org"
        maxH="100px"
        maxW="150px"
        borderRadius="30px"
        p="10px"
        textAlign="center"
      />
      <Text as="b" fontSize="xl" maxW="150px" textAlign="center">
        {props.name}
      </Text>
    </Box>
  );
};

export default ItemCard;
