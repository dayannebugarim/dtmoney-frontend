/* eslint-disable react/display-name */
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { parseCookies } from "nookies";

export const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const cookies = parseCookies();
      const token = cookies["token"];

      if (!token) {
        router.push("/login");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };
};
