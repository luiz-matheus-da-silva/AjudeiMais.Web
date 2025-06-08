import React, { useEffect, useState } from "react";
import ProfileHero from "./ProfileHero";
import ProfileRecentsAdvertisements from "./ProfileRecentsAdvertisements";
import { useLocation } from "react-router-dom";
import { Alert } from "../../../components/Alert";

const UserProfile = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const loginSuccess = params.get("login") === "success";
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (loginSuccess) {
      setAlert({
        type: "success",
        message: "Login efetuado com sucesso!",
      });
    }
  }, [loginSuccess]);

  return (
    <>
      {alert && (
        <Alert
          type={alert.type}
          children={alert.message}
          onClose={() => setAlert(null)}
          duration={1200}
        />
      )}

      <ProfileHero />
      <ProfileRecentsAdvertisements />
    </>
  );
};

export default UserProfile;
