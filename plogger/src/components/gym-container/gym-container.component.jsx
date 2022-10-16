import GymCard from "../gym-card/gym-card.component";
import { useContext } from "react";
import React from "react";
import { WorkoutContext } from "../../context/workout.context";
import "react-toastify/dist/ReactToastify.css";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import "./gym-container.styles.scss";
import { v4 as uuidv4 } from "uuid";

const GymContainer = (props) => {
  const workoutContextContainer = useContext(WorkoutContext);
  const { workoutContext, setWorkoutContext} =
    workoutContextContainer;

  const addHandler = () => {
    const copyOfCurrentContextForInjection = JSON.parse(
      JSON.stringify(workoutContext)
    );
    const randomNewExerciseID = uuidv4();
    const defaultNewExerciseName = "New Exercise";

    const mostRecentSetsPositionInArray =
      workoutContext[workoutContext.programme].length - 1;

    const defaultWeightForNewExercises =
      workoutContext[workoutContext.programme][mostRecentSetsPositionInArray]
        ?.weight;
    const defaultSetsForNewExercises =
      workoutContext[workoutContext.programme][mostRecentSetsPositionInArray]
        ?.sets;
    const defaultRepsForNewExercises =
      workoutContext[workoutContext.programme][mostRecentSetsPositionInArray]
        ?.reps;

    const absoluteDefaultWeightForNewExercises = 60;
    const absoluteDefaultSetsForNewExercises = 5;
    const absoluteDefaultRepsForNewExercises = 5;

    copyOfCurrentContextForInjection[
      copyOfCurrentContextForInjection.programme
    ].push({
      id: randomNewExerciseID,
      ex_name: defaultNewExerciseName,
      sentiment: "avg",
      effort: "7",
      mode: "overall",
      toggled_count: 0,
      individual_sets: [],
      weight: defaultWeightForNewExercises
        ? defaultWeightForNewExercises
        : absoluteDefaultWeightForNewExercises,
      sets: defaultSetsForNewExercises
        ? defaultSetsForNewExercises
        : absoluteDefaultSetsForNewExercises,
      reps: defaultRepsForNewExercises
        ? defaultRepsForNewExercises
        : absoluteDefaultRepsForNewExercises,
    });
    setWorkoutContext(copyOfCurrentContextForInjection);
  };

  return (
    <div className="gymbag">
      {workoutContext[workoutContext.programme].map((todaysExercise) => (
        <GymCard key={todaysExercise.id} exerciseToRender={todaysExercise.id} />
      ))}
      <Box sx={{ "& > :not(style)": { m: 1 } }}>
        <Fab
          variant="extended"
          size="small"
          style={{
            backgroundColor: "lightgrey",
            color: "grey",
            marginLeft: "20px",
            zIndex: "5",
          }}
          onClick={() => addHandler()}
          aria-label="add"
        >
          <AddIcon />
          Add Exercise
        </Fab>
      </Box>
    </div>
  );
};

export default GymContainer;
