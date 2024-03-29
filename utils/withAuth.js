import React, { useEffect, useState } from "react";
import useRefetchingSession from "@/hooks/useRefetchingSession";
import { signIn } from "next-auth/react";
import LoginPage from "@/components/auth-components/LoginPage";

export const withAuth = () => (Component) => {
  const WithAuth = (props) => {
    const [cachedSession, setCachedSession] = useState(null);
    const { data: session, status, update } = useRefetchingSession();

    useEffect(() => {
      if (status === "authenticated") {
        setCachedSession(session);
      }
    }, [session, status]);

    if (status !== "loading" && !session) {
      return <LoginPage />;
    } else {
      return (
        <Component
          session={cachedSession}
          status={status}
          update={update}
          {...props}
        />
      );
    }
  };
  return WithAuth;
};
