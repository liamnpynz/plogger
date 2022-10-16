import { useContext } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { WorkoutContext } from "../../context/workout.context";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";
import "./sentiment-container.styles.scss";
import Button from "@mui/material/Button";
import { UserAuth } from "../../context/auth.context";
import { addWorkout } from "../../utils/firebase.utils";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import date from "date-and-time";
import SaveIcon from "@mui/icons-material/Save";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";

const SentimentContainer = () => {
  const workoutContextContainer = useContext(WorkoutContext);
  const { workoutContext, setWorkoutContext } = workoutContextContainer;

  const { user } = UserAuth();
  const navigate = useNavigate();

  const saveWorkoutToDatabase = async () => {
    const setCompleted = workoutContext.programme;
    const timeNow = date.format(new Date(), "ddd, DD MMM YY hh:mm A");
    const exportSet = {
      id: uuidv4(),
      sentiment: workoutContext.sentiment,
      effort: workoutContext.effort,
      programme: workoutContext.programme,
      workout: workoutContext[setCompleted],
      timestamp: timeNow,
    };

    try {
      await addWorkout(exportSet);
      navigate("/account");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const sentimentHandle = (emotion) => {
    const newObjectForInjection = JSON.parse(JSON.stringify(workoutContext));
    newObjectForInjection.sentiment = emotion;
    setWorkoutContext(newObjectForInjection);
  };

  <div className="sentiments"></div>;

  const handleSlider = (e) => {
    const newObjectForInjection = JSON.parse(JSON.stringify(workoutContext));
    newObjectForInjection.effort = e.target.value;
    setWorkoutContext(newObjectForInjection);
  };

  return (
    <div className="sentiment-container">
      <div className="slider-label">
        <p>EFFORT METER</p>
      </div>

      <div className="slider-container">
        <Box
          sx={{}}
          style={{
            marginLeft: "20px",
            marginRight: "20px",
            marginTop: "0px",
          }}
        >
          <Slider
            aria-label="Effort"
            defaultValue={7}
            valueLabelDisplay="off"
            step={1}
            onChange={(e) => handleSlider(e)}
            min={1}
            max={11}
            style={{ color: "#38E54D" }}
          />
        </Box>
      </div>

      <div className="bottom-row">
        <div className="sentiments">
          <span
            name="sad"
            className={
              workoutContext.sentiment === "sad"
                ? "sentiment-picked"
                : "sentiment"
            }
            onClick={() => sentimentHandle("sad")}
          >
            😔
          </span>
          <span
            name="avg"
            className={
              workoutContext.sentiment === "avg"
                ? "sentiment-picked"
                : "sentiment"
            }
            onClick={() => sentimentHandle("avg")}
          >
            😐
          </span>
          <span
            name="happy"
            className={
              workoutContext.sentiment === "happy"
                ? "sentiment-picked"
                : "sentiment"
            }
            onClick={() => sentimentHandle("happy")}
          >
            😁
          </span>
        </div>

        <div className="button-container">
          {user ? (
            <Button
              size="large"
              variant="contained"
              onClick={() => saveWorkoutToDatabase()}
              startIcon={<SaveIcon sx={{ paddingBottom: "3px" }} />}
              style={{
                width: "100%",
                minHeight: "60px",
                backgroundColor: "#38E54D",
              }}
            >
              Log To Account
            </Button>
          ) : (
            <Link to="/results" style={{ textDecoration: "none" }}>
              <Button
                size="large"
                variant="contained"
                startIcon={<DoubleArrowIcon sx={{ paddingBottom: "2px" }} />}
                style={{
                  color: "#2192FF",
                  width: "100%",
                  minHeight: "60px",
                  backgroundColor: "white",
                }}
              >
                Continue to Log
              </Button>
            </Link>
          )}
        </div>

        <ToastContainer />
      </div>
    </div>
  );
};

export default SentimentContainer;
