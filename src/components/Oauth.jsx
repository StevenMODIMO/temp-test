"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";

export default function Oauth() {
  const { data: session, status } = useSession();
  const isAuth = status === "authenticated";
  const { dispatch } = useAuth();

  const getUser = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem("user_tokens"));
      const access = tokens?.access_token;

      if (!access) {
        console.error("Access token not found");
        return;
      }

      const response = await fetch(
        "https://backfatvo.salyam.uz/api_v1/user/profile/",
        {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        }
      );

      const json = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      } else {
        console.error("Error fetching user profile:", json.error);
      }
    } catch (error) {
      console.error(
        "An error occurred while fetching the user profile:",
        error
      );
    }
  };

  useEffect(() => {
    const setTokens = () => {
      localStorage.setItem(
        "user_tokens",
        JSON.stringify({
          access_token: session?.user.access,
          refresh_token: session?.user.refresh,
        })
      );
    };
    setTokens();
  }, [isAuth]);

  useEffect(() => {
    getUser()
  },[isAuth])

  return <main></main>;
}
