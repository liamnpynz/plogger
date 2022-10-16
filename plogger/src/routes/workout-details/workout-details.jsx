import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { UserAuth } from "../../context/auth.context";
import StandardSkeletonScreen from "../../components/standard-skeleton-screen/standard-skeleton-screen.component";

import { retrieveUsersWorkoutHistory } from "../../utils/firebase.utils";
import CompletedWorkout from "../../components/completed-workout/completed-workout.component";

const WorkoutDetails = () => {
  const params = useParams();

  const { user } = UserAuth();
  const [displayedWorkout, setDisplayedWorkout] = useState([]);
  const [isRetrieving, setIsRetrieving] = useState(true);

  useEffect(() => {
    const getRecentWorkouts = async () => {
      const workoutID = params.id;
      const results = await retrieveUsersWorkoutHistory();
      const locatedExerciseArray = results.workouts.filter(
        (item) => item.id === workoutID
      );
      const theExercise = locatedExerciseArray[0];
      setDisplayedWorkout(theExercise);
      setIsRetrieving(false);
    };
    getRecentWorkouts();
  }, [user]);

  return (
    <>
      {!isRetrieving ? (
        <CompletedWorkout displayedWorkout={displayedWorkout} />
      ) : (
        <StandardSkeletonScreen />
      )}
    </>
  );
};

export default WorkoutDetails;
