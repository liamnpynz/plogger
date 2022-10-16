import { WorkoutContext } from "../../context/workout.context";
import { useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./set-pip.styles.scss";
import { TextField } from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

const SetPip = (props) => {
  const workoutContextContainer = useContext(WorkoutContext);
  const { workoutContext, setWorkoutContext } = workoutContextContainer;

  const locatedExercise = workoutContext[workoutContext.programme].filter(
    (item) => item.id === props.exID
  );
  const thisExercise = locatedExercise[0];

  const ind = thisExercise.individual_sets.findIndex(
    (item) => item.set_id === props.pipID
  );

  const thisPip = thisExercise.individual_sets[ind];

  const handleDelete = () => {
    const exerciseIndex = workoutContext[workoutContext.programme].findIndex(
      (item) => item.id === props.exID
    );

    const currentPipIndex = workoutContext[workoutContext.programme][
      exerciseIndex
    ].individual_sets.findIndex((item) => item.set_id === props.pipID);

    const copyOfCurrentContextForInjection = JSON.parse(
      JSON.stringify(workoutContext)
    );

    if (
      workoutContext[workoutContext.programme][exerciseIndex].individual_sets
        .length === 1
    ) {
      copyOfCurrentContextForInjection[
        copyOfCurrentContextForInjection.programme
      ].splice(exerciseIndex, 1);
      setWorkoutContext(copyOfCurrentContextForInjection);
      return;
    }

    copyOfCurrentContextForInjection[
      copyOfCurrentContextForInjection.programme
    ][exerciseIndex].individual_sets.splice(currentPipIndex, 1);

    setWorkoutContext(copyOfCurrentContextForInjection);
  };

  const changeHandler = (e) => {
    const changeTarget = e.target.name;
    const exerciseIndex = workoutContext[workoutContext.programme].findIndex(
      (item) => item.id === props.exID
    );
    const currentPipIndex = workoutContext[workoutContext.programme][
      exerciseIndex
    ].individual_sets.findIndex((item) => item.set_id === props.pipID);
    switch (changeTarget) {
      case "weight":
        const copyOfCurrentContextForInjection = JSON.parse(
          JSON.stringify(workoutContext)
        );
        copyOfCurrentContextForInjection[
          copyOfCurrentContextForInjection.programme
        ][exerciseIndex].individual_sets[currentPipIndex].individual_weight =
          e.target.value;
        setWorkoutContext(copyOfCurrentContextForInjection);
        break;
      case "reps":
        if (e.target.value < 0) {
          toast.error("You can't do negative reps!");
          const copyOfCurrentContextForInjection = JSON.parse(
            JSON.stringify(workoutContext)
          );
          setWorkoutContext(copyOfCurrentContextForInjection);
        } else {
          const copyOfCurrentContextForInjection = JSON.parse(
            JSON.stringify(workoutContext)
          );
          copyOfCurrentContextForInjection[
            copyOfCurrentContextForInjection.programme
          ][exerciseIndex].individual_sets[currentPipIndex].individual_reps =
            e.target.value;
          setWorkoutContext(copyOfCurrentContextForInjection);
        }
        break;
      default:
        toast.info("Something went wrong.");
    }
  };

  return (
    <div className="set-pip">
      <div className="set-pip-weight-container">
        <TextField
          id="outlined-number"
          name="weight"
          label="Weight (kg)"
          type="number"
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => changeHandler(e)}
          value={thisPip.individual_weight}
          style={{
            minWidth: "100px",
            maxWidth: "130px",
            marginLeft: "10px",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        />
      </div>
      <div className="set-pip-reps-container">
        <TextField
          id="outlined-number"
          name="reps"
          label="Reps"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          onChange={(e) => changeHandler(e)}
          value={thisPip.individual_reps}
          style={{
            minWidth: "70px",
            maxWidth: "90px",
            marginLeft: "10px",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        />
      </div>
      <RemoveCircleIcon
        onClick={() => handleDelete()}
        style={{
          marginTop: "auto",
          marginBottom: "auto",
          marginLeft: "10px",
          color: "#2192FF",
          cursor: "pointer",
        }}
      ></RemoveCircleIcon>
      <ToastContainer />
    </div>
  );
};

export default SetPip;
