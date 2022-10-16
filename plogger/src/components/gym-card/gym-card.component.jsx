import { useContext } from "react";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { WorkoutContext } from "../../context/workout.context";
import SetPip from "../set-pip/set-pip.component";
import { v4 as uuidv4 } from "uuid";
import Switch from "@mui/material/Switch";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { TextField } from "@mui/material";
import "./gym-card.styles.scss";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import produce from "immer";

const GymCard = (props) => {
  const workoutContextContainer = useContext(WorkoutContext);
  const { workoutContext, setWorkoutContext } = workoutContextContainer;
  const idOfExerciseToRender = props.exerciseToRender;
  const exIndex = workoutContext[workoutContext.programme].findIndex(
    (daysExercise) => daysExercise.id === idOfExerciseToRender
  );

  const inputChangeHandler = (e) => {
    const inputType = e.target.name;
    switch (inputType) {
      case "weight-input":
        const newStateWeight = produce(workoutContext, (draftState) => {
          draftState[draftState.programme][exIndex].weight = e.target.value;
        });
        setWorkoutContext(newStateWeight);
        break;
      case "sets-input":
        if (e.target.value < 0) {
          toast.error("You can't do negative sets!");
        } else {
          const newStateSets = produce(workoutContext, (draftState) => {
            draftState[draftState.programme][exIndex].sets = e.target.value;
          });
          setWorkoutContext(newStateSets);
        }
        break;
      case "reps-input":
        if (e.target.value < 0) {
          toast.error("You can't do negative reps!");
        } else {
          const newStateReps = produce(workoutContext, (draftState) => {
            draftState[draftState.programme][exIndex].reps = e.target.value;
          });
          setWorkoutContext(newStateReps);
        }
        break;
      default:
        toast.info("Something went wrong.");
    }
  };

  const nameChangeHandler = (e) => {
    const newState = produce(workoutContext, (draftState) => {
      draftState[draftState.programme][exIndex].ex_name = e.target.value;
    });
    setWorkoutContext(newState);
  };

  const addIndividualSetHandler = () => {
    if (
      workoutContext[workoutContext.programme][exIndex].individual_sets.length >
      0
    ) {
      const lastSetInArray =
        workoutContext[workoutContext.programme][exIndex].individual_sets
          .length - 1;
      const defaultWeight =
        workoutContext[workoutContext.programme][exIndex].individual_sets[
          lastSetInArray
        ].individual_weight;
      const defaultReps =
        workoutContext[workoutContext.programme][exIndex].individual_sets[
          lastSetInArray
        ].individual_reps;
      const newSet = {
        set_id: uuidv4(),
        individual_weight: defaultWeight,
        individual_reps: defaultReps,
      };

      const newState = produce(workoutContext, (draftState) => {
        draftState[draftState.programme][exIndex].individual_sets.push(newSet);
      });
      setWorkoutContext(newState);
    } else {
      const absoluteDefaultWeightForNewExercises = 50;
      const absoluteDefaultRepsForNewExercises = 7;

      const newSet = {
        set_id: uuidv4(),
        individual_weight: workoutContext[workoutContext.programme][exIndex]
          .weight
          ? workoutContext[workoutContext.programme][exIndex].weight
          : absoluteDefaultWeightForNewExercises,
        individual_reps: workoutContext[workoutContext.programme][exIndex].reps
          ? workoutContext[workoutContext.programme][exIndex].reps
          : absoluteDefaultRepsForNewExercises,
      };

      const newState = produce(workoutContext, (draftState) => {
        draftState[draftState.programme][exIndex].individual_sets.push(newSet);
      });
      setWorkoutContext(newState);
    }
  };

  const deleteHandler = () => {
    const newState = produce(workoutContext, (draftState) => {
      draftState[draftState.programme].splice(exIndex, 1);
    });
    setWorkoutContext(newState);
  };

  const toggleHandler = () => {
    if (workoutContext[workoutContext.programme][exIndex].mode === "overall") {
      const changedContext = JSON.parse(JSON.stringify(workoutContext));
      changedContext[changedContext.programme][exIndex].mode = "sets";

      if (
        changedContext[changedContext.programme][exIndex].toggled_count === 0 ||
        changedContext[changedContext.programme][exIndex].individual_sets
          .length === 0
      ) {
        changedContext[changedContext.programme][
          exIndex
        ].individual_sets.forEach(
          (item) =>
            (item.individual_weight =
              changedContext[changedContext.programme][exIndex].weight)
        );
        changedContext[changedContext.programme][
          exIndex
        ].individual_sets.forEach(
          (item) =>
            (item.individual_reps =
              changedContext[changedContext.programme][exIndex].reps)
        );
        changedContext[changedContext.programme][exIndex].toggled_count =
          changedContext[changedContext.programme][exIndex].toggled_count + 1;

        const numGlobalSets = Math.floor(
          changedContext[changedContext.programme][exIndex].sets
        );
        const numIndividualSets =
          changedContext[changedContext.programme][exIndex].individual_sets
            .length;
        const diff = numGlobalSets - numIndividualSets;

        if (diff > 0) {
          if (diff > 50) {
            toast.error("The maximum number of sets we can handle is 50.");
            return;
          }

          changedContext[changedContext.programme][
            exIndex
          ].individual_sets.length = numIndividualSets + diff;
          changedContext[changedContext.programme][
            exIndex
          ].individual_sets.fill(
            {
              individual_weight:
                changedContext[changedContext.programme][exIndex].weight,
              individual_reps:
                changedContext[changedContext.programme][exIndex].reps,
            },
            changedContext[changedContext.programme][exIndex].individual_sets
              .length - diff
          );

          const newIndividuals = changedContext[changedContext.programme][
            exIndex
          ].individual_sets.map((item) => ({
            ...item,
            set_id: uuidv4(),
          }));

          changedContext[changedContext.programme][exIndex].individual_sets =
            newIndividuals;
        } else if (diff < 0) {
          const setsWeNeedToPop = diff * -1;

          changedContext[changedContext.programme][
            exIndex
          ].individual_sets.splice(0, setsWeNeedToPop);
        }
      }

      setWorkoutContext(changedContext);
      return;
    } else if (
      workoutContext[workoutContext.programme][exIndex].mode === "sets"
    ) {
      const changedContext = JSON.parse(JSON.stringify(workoutContext));
      changedContext[changedContext.programme][exIndex].mode = "overall";

      if (
        changedContext[workoutContext.programme][exIndex].individual_sets
          .length !== changedContext[workoutContext.programme][exIndex].sets
      ) {
        changedContext[workoutContext.programme][exIndex].sets =
          changedContext[workoutContext.programme][
            exIndex
          ].individual_sets.length;
      }
      if (
        changedContext[workoutContext.programme][exIndex].individual_sets[0]
          .individual_weight !==
        changedContext[workoutContext.programme][exIndex].weight
      ) {
        changedContext[workoutContext.programme][exIndex].weight =
          changedContext[workoutContext.programme][
            exIndex
          ].individual_sets[0].individual_weight;
      }
      if (
        changedContext[workoutContext.programme][exIndex].individual_sets[0]
          .individual_reps !==
        changedContext[workoutContext.programme][exIndex].reps
      ) {
        changedContext[workoutContext.programme][exIndex].reps =
          changedContext[workoutContext.programme][
            exIndex
          ].individual_sets[0].individual_reps;
      }
      setWorkoutContext(changedContext);
    }
  };

  return (
    <div className="gymcard">
      <div className="exercise">
        <TextField
          id="edit-name-field"
          onChange={(e) => nameChangeHandler(e)}
          value={workoutContext[workoutContext.programme][exIndex]?.ex_name}
          variant="filled"
        />
        <div className="exercise-controls">
          <FormGroup style={{}}>
            <FormControlLabel
              control={
                <Switch
                  checked={
                    workoutContext[workoutContext.programme][exIndex].mode ===
                    "sets"
                      ? true
                      : false
                  }
                  onChange={() => toggleHandler()}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              sx={{
                "& .MuiSwitch-thumb": {
                  backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="3 0 40 45"><path fill="${encodeURIComponent(
                    "#38E54D"
                  )}" d="m24 30.75-12-12 2.15-2.15L24 26.5l9.85-9.85L36 18.8Z"/></svg>')`,
                },
              }}
              value={workoutContext[workoutContext.programme][exIndex].mode}
              style={{ color: "grey", fontSize: "10px" }}
            />
          </FormGroup>
          <DeleteOutlineIcon
            onClick={() => deleteHandler()}
            sx={{
              color: "darkgrey",
              marginLeft: "-22px",
              cursor: "pointer",
              marginTop: "6.5px",
            }}
          />
        </div>
      </div>

      {workoutContext[workoutContext.programme][exIndex].mode === "overall" ? (
        <div className="rack">
          <div className="lockbox">
            <TextField
              id="outlined-number"
              name="weight-input"
              label="Weight (kg)"
              type="number"
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => inputChangeHandler(e)}
              value={workoutContext[workoutContext.programme][exIndex].weight}
              style={{
                minWidth: "100px",
                maxWidth: "130px",
                marginLeft: "10px",
              }}
            />
          </div>

          <div className="multibox">
            <TextField
              id="outlined-number"
              name="sets-input"
              label="Sets"
              type="number"
              inputProps={{ maxLength: 2 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => inputChangeHandler(e)}
              value={workoutContext[workoutContext.programme][exIndex].sets}
              style={{ minWidth: "70px", maxWidth: "90px" }}
            />
          </div>
          <div className="multibox">
            <TextField
              id="outlined-number"
              name="reps-input"
              label="Reps"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => inputChangeHandler(e)}
              value={workoutContext[workoutContext.programme][exIndex].reps}
              style={{ minWidth: "70px", maxWidth: "90px" }}
            />
          </div>
        </div>
      ) : null}
      {workoutContext[workoutContext.programme][exIndex].mode === "sets" ? (
        <>
          {workoutContext[workoutContext.programme][
            exIndex
          ].individual_sets.map((thisSet) => (
            <SetPip
              key={thisSet.set_id}
              pipID={thisSet.set_id}
              exID={workoutContext[workoutContext.programme][exIndex].id}
            />
          ))}
          <Button
            variant="outlined"
            startIcon={<AddCircleIcon />}
            onClick={() => addIndividualSetHandler()}
            style={{
              marginLeft: "10px",
              marginBottom: "10px",
              maxWidth: "150px",
              color: "#2192FF",
              borderColor: "lightgrey",
            }}
          >
            Add Set
          </Button>
        </>
      ) : null}
      <ToastContainer />
    </div>
  );
};

export default GymCard;
