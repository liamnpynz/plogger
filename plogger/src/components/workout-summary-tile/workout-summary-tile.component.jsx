import "./workout-summary-tile.styles.scss";
import MetadataRow from "../metadata-row/metadata-row.component";
import { Link } from "react-router-dom";

const WorkoutSummaryTile = (props) => {
  const workout = props.workout;
  return (
    <div className="each-workout-container" key={workout.id}>
      <div className="time-stamp">
        <Link style={{ color: "grey" }} to={`/workouts/${workout.id}`}>
          {workout.timestamp}
        </Link>
      </div>
      <MetadataRow
        key={workout.id}
        tags={[`${workout.programme}`, `${workout.effort}/10`, `${workout.id}`]}
      />
    </div>
  );
};

export default WorkoutSummaryTile;
