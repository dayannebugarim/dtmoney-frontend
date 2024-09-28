import { Box, Skeleton, VStack } from "@chakra-ui/react";

interface ListSkeletonProps {
  isLoaded: boolean;
}

export const ListSkeleton: React.FC<ListSkeletonProps> = ({ isLoaded }) => {
  const repeatNumber = 8;

  return (
    <>
      <Box paddingY={6} rounded="md" w="100%">
        <VStack>
          {[...Array(repeatNumber)].map((e, i) => {
            return (
              <Skeleton
                isLoaded={isLoaded}
                fadeDuration={2}
                paddingX={10}
                paddingY={6}
                w="100%"
                height="90px"
                rounded="md"
                startColor="#29292E"
                endColor="#36363b"
              ></Skeleton>
            );
          })}
        </VStack>
      </Box>
    </>
  );
};
