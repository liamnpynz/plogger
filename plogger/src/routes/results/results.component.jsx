import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./results.styles.scss";
import { UserAuth } from "../../context/auth.context";
import { WorkoutContext } from "../../context/workout.context";
import StandardSkeletonScreen from "../../components/standard-skeleton-screen/standard-skeleton-screen.component";
import CompletedWorkout from "../../components/completed-workout/completed-workout.component";

import Button from "@mui/material/Button";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GoogleIcon from "@mui/icons-material/Google";
import SaveIcon from "@mui/icons-material/Save";

import date from "date-and-time";
import { v4 as uuidv4 } from "uuid";
import { addWorkout } from "../../utils/firebase.utils";

const Results = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const workoutContextContainer = useContext(WorkoutContext);
  const { workoutContext } = workoutContextContainer;

  const [displayedWorkout, setDisplayedWorkout] = useState({});
  const [isRetrieving, setIsRetrieving] = useState(true);

  const prepareWorkoutForDisplayAndExport = async () => {
    const setCompleted = workoutContext.programme;
    const timeNow = date.format(new Date(), "ddd, DD MMM YY hh:mm A");
    const id = uuidv4();
    const exportSetContents = {
      id: id,
      sentiment: workoutContext.sentiment,
      effort: workoutContext.effort,
      programme: workoutContext.programme,
      workout: workoutContext[setCompleted],
      timestamp: timeNow,
    };
    setDisplayedWorkout(exportSetContents);
    setIsRetrieving(false);
  };

  useEffect(() => {
    prepareWorkoutForDisplayAndExport();
  }, []);

  const sendGoogleSigninRequest = () => handleGoogleSignIn();
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

  const exportWorkoutToFirestore = async () => {
    try {
      await addWorkout(displayedWorkout);
      navigate("/account");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div className="record-overall-container">
      <div className="workout-area">
        {!isRetrieving ? (
          <CompletedWorkout displayedWorkout={displayedWorkout} />
        ) : (
          <StandardSkeletonScreen />
        )}
      </div>
      <div className="conclusion-area">
        <div className="message">
          {!user ? (
            <p>
              <b>Wow</b>, what a workout! Copy it to your clipboard, or sign in
              to save your history.
            </p>
          ) : null}
        </div>
        <div className="button-box">
          <Button
            size="medium"
            variant="contained"
            className="xyz"
            data-clipboard-target="#xyz"
            style={{
              minHeight: "60px",
              backgroundColor: "white",
              minWidth: "15%",
              marginRight: "5px",
            }}
          >
            <ContentCopyIcon style={{ color: "#38E54D" }} />
          </Button>
          {!user ? (
            <Button
              variant="contained"
              onClick={() => sendGoogleSigninRequest()}
              startIcon={<GoogleIcon />}
              style={{
                color: "#2192FF",
                minWidth: "70%",
                minHeight: "60px",
                backgroundColor: "white",
              }}
            >
              Sign In With Google
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => exportWorkoutToFirestore()}
              startIcon={<SaveIcon sx={{ paddingBottom: "3px" }} />}
              style={{
                color: "white",
                minWidth: "70%",
                minHeight: "60px",
                backgroundColor: "#38E54D",
              }}
            >
              Log to account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Results;
