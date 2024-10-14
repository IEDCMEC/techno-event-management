import { Heading } from '@chakra-ui/react';
import { Highlight } from '@chakra-ui/react';
import { color } from 'framer-motion';
import React from 'react';

const ComingSoon = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '2rem',
        height: '75%',
      }}
    >
      <Heading as="h1" size="4xl">
        <Highlight
          query="Coming Soon !"
          styles={{
            px: '6',
            py: '1',
            rounded: 'full',
            bg: '#319795',
            color: 'whiteAlpha.900',
          }}
        >
          Coming Soon !
        </Highlight>
      </Heading>
      <Heading as="h3" size="lg">
        Check back soon for updates.
      </Heading>
    </div>
  );
};

export default ComingSoon;
