import "./ppl-selector.styles.scss";
import { useContext } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { WorkoutContext } from "../../context/workout.context";

const PPLSelector = () => {
  const workoutContextContainer = useContext(WorkoutContext);
  const { workoutContext, setWorkoutContext } =
    workoutContextContainer;

  const changeProgrammeHandler = (e) => {
    const newProgramme = e.target.value;
    const copyOfCurrentContextForInjection = JSON.parse(
      JSON.stringify(workoutContext)
    );
    copyOfCurrentContextForInjection.programme = newProgramme;
    setWorkoutContext(copyOfCurrentContextForInjection);
  };

  return (
    <>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 80 }}
        style={{ marginBottom: "23px" }}
      >
        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
        <Select
          variant="filled"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={workoutContext.programme}
          disableUnderline={true}
          defaultValue={workoutContext.programme}
          onChange={(e) => changeProgrammeHandler(e)}
          label="Today"
          style={{ color: "white" }}
          sx={{ height: 65 }}
        >
          <MenuItem value={"Push"}>Push</MenuItem>
          <MenuItem value={"Pull"}>Pull</MenuItem>
          <MenuItem value={"Legs"}>Legs</MenuItem>
        </Select>
      </FormControl>
    </>
  );
};

export default PPLSelector;
