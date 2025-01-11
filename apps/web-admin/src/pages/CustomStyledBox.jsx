import { Box, Text, Image } from '@chakra-ui/react';

const CustomStyledBox = () => {
  return (
    <Box display="flex" gap="70px" marginTop="40px" paddingLeft="20px">
      
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        width="245px"
        height="112px"
        minWidth="245px"
        padding="16px"
        gap="12px"
        borderRadius="20px"
        bg="rgba(224, 227, 255, 1)"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Text
            fontFamily="16Regular.black"
            fontSize="16px"
            fontWeight="600"
            lineHeight="20px"
            textAlign="left"
            color="var(--black, rgba(4, 5, 11, 1))"
          >
            Total Participants
          </Text>
          <Image
            src="../../../../../../../../assets/events/Users.png"
            alt="Users Icon"
            width="20px"
            height="14.89px"
          />
        </Box>
        <Text
          fontFamily="16Regular.black"
          fontSize="24px"
          fontWeight="700"
          lineHeight="36px"
          textAlign="left"
          color="var(--black, rgba(4, 5, 11, 1))"
        >
          7034
        </Text>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        width="245px"
        height="112px"
        minWidth="245px"
        padding="16px"
        gap="12px"
        borderRadius="20px"
        bg="rgba(224, 227, 255, 1)"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Text
            fontFamily="16Regular.black"
            fontSize="16px"
            fontWeight="600"
            lineHeight="20px"
            textAlign="left"
            color="var(--black, rgba(4, 5, 11, 1))"
          >
            New Sign-ups
          </Text>
          <Image
            src="../../../../../../../../assets/events/Adduser.png"
            alt="Users Icon"
            width="20px"
            height="14.89px"
          />
        </Box>
        <Text
          fontFamily="16Regular.black"
          fontSize="24px"
          fontWeight="700"
          lineHeight="36px"
          textAlign="left"
          color="var(--black, rgba(4, 5, 11, 1))"
        >
          67
        </Text>
      </Box>
       
      <Box
  display="flex"
  flexDirection="column"
  alignItems="flex-start"
  justifyContent="center"
  width="356px"
  height="112px"
  minWidth="250px"
  padding="16px"
  gap="12px"
  borderRadius="20px"
  bg="rgba(224, 227, 255, 1)"
>
  <Box
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    width="100%"
  >
    <Text
      fontFamily="16Regular.black"
      fontSize="16px"
      fontWeight="600"
      lineHeight="20px"
      textAlign="left"
      color="var(--black, rgba(4, 5, 11, 1))"
    >
      Check-in Overview
    </Text>
    <Image
      src="../../../../../../../../assets/events/Heartbeat.png"
      alt="Users Icon"
      width="20px"
      height="14.89px"
    />
  </Box>

  {/* Add the progress image below */}
  <Image
    src="../../../../../../../../assets/events/ProgressBar.png"
    alt="Progress Bar"
    width="308px"
    height="4px"
    borderRadius="100px 0px 0px 0px"
    marginTop="8px" /* Adds a gap of 8px between the box and image */
  />

<Box
    display="flex"
    justifyContent="space-between"
    alignItems="center"
    width="100%"
    marginTop="8px"
  >
    {/* Leftmost text */}
    <Text
      width="125px"
      height="20px"
      fontFamily="16Regular.black"
      fontSize="12px"
      fontWeight="400"
      lineHeight="20px"
      textAlign="left"
      textUnderlinePosition="from-font"
      textDecorationSkipInk="none"
    >
      190/400 Participants
    </Text>

    {/* Rightmost text */}
    <Text
      width="25px"
      height="20px"
      fontFamily="16Regular.black"
      fontSize="12px"
      fontWeight="400"
      lineHeight="20px"
      textAlign="left"
      textUnderlinePosition="from-font"
      textDecorationSkipInk="none"
    >
      40%
    </Text>
  </Box>

</Box>


      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        width="245px"
        height="112px"
        minWidth="245px"
        padding="16px"
        gap="12px"
        borderRadius="20px"
        bg="rgba(224, 227, 255, 1)"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
        >
          <Text
            fontFamily="16Regular.black"
            fontSize="16px"
            fontWeight="600"
            lineHeight="20px"
            textAlign="left"
            color="var(--black, rgba(4, 5, 11, 1))"
          >
            Other Data
          </Text>
          <Image
            src="../../../../../../../../assets/events/Box.png"
            alt="Users Icon"
            width="20px"
            height="14.89px"
          />
        </Box>
        <Text
          fontFamily="16Regular.black"
          fontSize="24px"
          fontWeight="700"
          lineHeight="36px"
          textAlign="left"
          color="var(--black, rgba(4, 5, 11, 1))"
        >
          4,024
        </Text>
      </Box>

    </Box>
  );
};

export default CustomStyledBox;
