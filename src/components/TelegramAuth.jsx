"use client"
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function TelegramAuth() {
    const { dispatch } = useAuth();
    const params = useSearchParams();
    const access = params.get("access");
    const refresh = params.get("refresh");

    const getUser = async () => {
        try {
          const tokens = JSON.parse(localStorage.getItem("user_tokens"));
          const accessToken = tokens?.access_token;
    
          if (!accessToken) {
            console.error("Access token not found");
            return;
          }
    
          // Fetch the user profile with the access token
          const response = await fetch(
            "https://backfatvo.salyam.uz/api_v1/user/profile/",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
    
          const json = await response.json();
    
          if (response.ok) {
            // Store user data in local storage and dispatch login action
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
    if (access && refresh) {
      localStorage.setItem(
        "user_tokens",
        JSON.stringify({
          access_token: access,
          refresh_token: refresh,
        })
      );
      getUser();
    }
  }, [access, refresh]);
    return (
        <main></main>
    )
}