import { createContext, useState } from "react";
import jsonData from "../defaultdata.json";
import { useEffect } from "react";

export const WorkoutContext = createContext({
  WorkoutContext: [
    {
      requestingSave: false,
      sentiment: "",
      programme: "",
      id: 0,
      ex_name: "",
      mode: "",
      toggled_count: 0,
      weight: 0,
      sets: 0,
      reps: 0,
    },
  ],
  setWorkoutContext: () => {},
});

export const WorkoutContextProvider = ({ children }) => {
  const [workoutContext, setWorkoutContext] = useState(() => {
    const existingValueInLocalStorage = localStorage.getItem("your-workout");
    return existingValueInLocalStorage !== null
      ? JSON.parse(existingValueInLocalStorage, function (key, value) {
          if (key === "sets") {
            return Math.floor(value);
          }

          if (key === "effort") {
            return Math.floor(value);
          }

          if (
            key === "weight" ||
            key === "individual_weight" ||
            key === "reps" ||
            key === "individual_reps"
          ) {
            return parseFloat(value);
          }

          return value;
        })
      : jsonData;
  });

  useEffect(() => {
    localStorage.setItem("your-workout", JSON.stringify(workoutContext));
  }, [workoutContext]);

  const value = { workoutContext, setWorkoutContext };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};
