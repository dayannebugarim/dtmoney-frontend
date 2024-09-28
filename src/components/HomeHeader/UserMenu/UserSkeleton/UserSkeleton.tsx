import { HStack, Skeleton, SkeletonCircle, VStack } from "@chakra-ui/react";

interface UserSkeletonProps {
  isLoaded: boolean;
}

export const UserSkeleton: React.FC<UserSkeletonProps> = ({ isLoaded }) => {
  return (
    <>
      <HStack spacing={4} paddingY={2} paddingRight="42px" height="72px">
        <VStack align="end" justify="center" spacing={1}>
          <Skeleton
            isLoaded={isLoaded}
            fadeDuration={2}
            height="24px"
            width="70px"
            rounded="md"
            startColor="#29292E"
            endColor="#36363b"
          ></Skeleton>
          <Skeleton
            isLoaded={isLoaded}
            fadeDuration={4}
            height="24px"
            width="120px"
            rounded="md"
            startColor="#29292E"
            endColor="#36363b"
          ></Skeleton>
        </VStack>
        <SkeletonCircle size="48px" />
      </HStack>
    </>
  );
};
