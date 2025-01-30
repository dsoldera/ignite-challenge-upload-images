import {
  Box,
  Heading,
  Image,
  Text
} from '@chakra-ui/react';

export interface Card {
  title: string;
  description: string;
  url: string;
  ts?: number;
  id: string;
}

interface CardProps {
  card: Card;
  viewImage: (url: string) => void;
}

export const Card = ({ card, viewImage }: CardProps) => {
  console.log('card', card);
  //const [isLoading, setIsLoading] = useState(true);

  return (
    <Box key={card.id} borderRadius="md" bgColor="pGray.800">
      {/* <Skeleton loading={!isLoading}> */}
        <Image
          src={card.url}
          alt={card.title}
          objectFit="cover"
          w="max"
          h={48}
          borderTopRadius="md"
          onClick={() => viewImage(card.url)}
          // onLoad={() => setIsLoading(false)}
          cursor="pointer"
        />
      {/* </Skeleton> */}

      <Box pt={5} pb={4} px={6}>
        {/* {isLoading ? ( 
          <>
            <SkeletonText fontSize="2xl" mt={2} noOfLines={1} />
            <SkeletonText fontSize="md" mt={7} noOfLines={1} />
          </>
         ) : ( */}
          <>
            <Heading fontSize="2xl">{card.title}</Heading>
            <Text mt={2.5} fontSize="md">
              {card.description}
            </Text>
          </>
        {/* )} */}
      </Box>
    </Box>
  );
}
