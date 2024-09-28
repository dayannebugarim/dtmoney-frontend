import { Skeleton, VStack } from "@chakra-ui/react";

interface CardSkeletonProps {
  isLoaded: boolean;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({ isLoaded }) => {
  const repeatNumber = 3;

  const greenCardStyle = {
    backgroundColor: "#015F43",
    startColor: "#067956",
    endColor: "#0a8f67",
  };

  return (
    <>
      {[...Array(repeatNumber)].map((e, i) => {
        return (
          <VStack
            backgroundColor={
              i === repeatNumber - 1
                ? greenCardStyle.backgroundColor
                : "#29292E"
            }
            padding={6}
            rounded="md"
            minW="260px"
            w="30%"
            height="133px"
            alignItems="start"
          >
            <Skeleton
              isLoaded={isLoaded}
              fadeDuration={2}
              w="30%"
              height="24px"
              rounded="md"
              startColor={
                i === repeatNumber - 1 ? greenCardStyle.startColor : "#35353a"
              }
              endColor={
                i === repeatNumber - 1 ? greenCardStyle.endColor : "#404044"
              }
            ></Skeleton>
            <Skeleton
              isLoaded={isLoaded}
              fadeDuration={4}
              w="80%"
              height="40px"
              rounded="md"
              startColor={
                i === repeatNumber - 1 ? greenCardStyle.startColor : "#35353a"
              }
              endColor={
                i === repeatNumber - 1 ? greenCardStyle.endColor : "#404044"
              }
            ></Skeleton>
          </VStack>
        );
      })}
    </>
  );
};
