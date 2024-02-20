import { Card, CardBody, Image, Text } from '@chakra-ui/react';
const ItemCard = (props) => {
  if ((props.logo = '')) {
    props.logo = '/ThisIsAnORG.png';
  }
  return (
    <Card maxW="md">
      <CardBody>
        <Image src={props.logo} alt="logo of org" maxH="100px" maxW="150px" borderRadius="lg" />
        <Text as="b" fontSize="xl">
          {props.name}{' '}
        </Text>
      </CardBody>
    </Card>
  );
};

export default ItemCard;
