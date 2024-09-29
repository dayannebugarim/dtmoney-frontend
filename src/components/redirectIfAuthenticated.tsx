/* eslint-disable react/display-name */
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { Spinner, Center } from "@chakra-ui/react";

export const redirectIfAuthenticated = (
  WrappedComponent: React.ComponentType
) => {
  return (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const cookies = parseCookies();
      const token = cookies["token"];

      if (token) {
        router.push("/");
      } else {
        setLoading(false);
      }
    }, [router]);

    if (loading) {
      return (
        <Center height="100vh">
          <Spinner size="xl" />
        </Center>
      );
    }

    return <WrappedComponent {...props} />;
  };
};
