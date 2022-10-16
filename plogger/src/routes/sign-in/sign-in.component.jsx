import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./sign-in.styles.scss";
import { UserAuth } from "../../context/auth.context";

import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const SignIn = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const sendSigninRequest = () => handleGoogleSignIn();
  const handleGoogleSignIn = async () => {
    try {
      const gotIt = await googleSignIn();
      if (user != null) {
        navigate("/account");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/account");
    }
  }, [user]);

  return (
    <div className="outer-auth-container">
      <div className="sign-in-container">
        <p>Hey there, stranger 👻</p>

        <p>You're not signed in at the moment, but it's easy to do!</p>

        <p>
          If you're signed in you can save your workouts and review them later.
        </p>

        <div className="button-container">
          <Button
            variant="outlined"
            onClick={() => sendSigninRequest()}
            startIcon={<GoogleIcon />}
            style={{ minHeight: "60px", minWidth: "250px" }}
          >
            Sign In With Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
