import { Skeleton } from "@chakra-ui/react";

interface ChartSkeletonProps {
  isLoaded: boolean;
}

export const ChartSkeleton: React.FC<ChartSkeletonProps> = ({ isLoaded }) => {
  return (
    <>
      <Skeleton
        isLoaded={isLoaded}
        fadeDuration={2}
        paddingX={10}
        paddingY={6}
        w="100%"
        height={300}
        rounded="md"
        startColor="#29292E"
        endColor="#36363b"
      ></Skeleton>
    </>
  );
};
