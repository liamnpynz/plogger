import { useState, useEffect } from "react";

import "./workout-history.styles.scss";
import StandardSkeletonScreen from "../../components/standard-skeleton-screen/standard-skeleton-screen.component";
import WorkoutSummaryTile from "../../components/workout-summary-tile/workout-summary-tile.component";

import { retrieveUsersWorkoutHistory, auth } from "../../utils/firebase.utils";
import { onAuthStateChanged } from "firebase/auth";

const WorkoutHistory = () => {
  const [isRetrieving, setIsRetrieving] = useState(true);
  const [recentWorkoutsMap, setRecentWorkoutsMap] = useState({});
  const [noWorkoutsExist, setNoWorkoutsExist] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser === null) {
        return;
      }
      const getRecentWorkouts = async () => {
        const results = await retrieveUsersWorkoutHistory();
        if (results) {
          if (results.workouts.length > 0) {
            setRecentWorkoutsMap(results);
            setIsRetrieving(false);
          } else {
            setNoWorkoutsExist(true);
            setIsRetrieving(false);
          }
        } else {
          setNoWorkoutsExist(true);
          setIsRetrieving(false);
        }
      };

      getRecentWorkouts();
      return () => {
        unsubscribe();
      };
    });
  }, []);

  const Placeholder = () => {
    if (!isRetrieving && noWorkoutsExist) {
      return (
        <div className="placeholder-box">
          <h4>
            Your workouts will show here when you've logged them. You've got
            this! 💪🏼
          </h4>
        </div>
      );
    } else {
      return <StandardSkeletonScreen />;
    }
  };

  return (
    <div className="workouts-box">
      {!isRetrieving && !noWorkoutsExist ? (
        <div>
          {recentWorkoutsMap.workouts.map((oneWorkout) => (
            <WorkoutSummaryTile key={oneWorkout.id} workout={oneWorkout} />
          ))}
        </div>
      ) : (
        <Placeholder />
      )}
    </div>
  );
};

export default WorkoutHistory;
