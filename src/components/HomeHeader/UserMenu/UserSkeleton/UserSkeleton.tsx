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
            width={{ "2xl": "70px", lg: "70px", md: "50px", sm: 0, base: 0 }}
            rounded="md"
            startColor="#29292E"
            endColor="#36363b"
          ></Skeleton>
          <Skeleton
            isLoaded={isLoaded}
            fadeDuration={4}
            height="24px"
            width={{ "2xl": "120px", lg: "120px", md: "90px", sm: 0, base: 0 }}
            rounded="md"
            startColor="#29292E"
            endColor="#36363b"
          ></Skeleton>
        </VStack>
        <SkeletonCircle size="48px" startColor="#29292E" endColor="#36363b" />
      </HStack>
    </>
  );
};
