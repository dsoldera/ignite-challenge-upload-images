import { Box, Flex, Heading } from '@chakra-ui/react';
import { ProgressBar, ProgressRoot } from './ui/progress';

export const Loading = () => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      h="100vh"
      flexDir="column"
    >
      <Box>
        <Heading>Carregando aplicação...</Heading>
        <ProgressRoot maxW="240px">
          <ProgressBar />
        </ProgressRoot>
      </Box>
    </Flex>
  );
}
