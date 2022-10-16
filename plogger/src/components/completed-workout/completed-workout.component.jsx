import CardTitle from "../card-title/card-title.component";
import "./completed-workout.styles.scss";

const CompletedWorkout = ({ displayedWorkout }) => {
  const DisplayableEmoji = () => {
    if (displayedWorkout.sentiment === "avg") {
      return "😐";
    } else if (displayedWorkout.sentiment === "sad") {
      return "😔";
    } else {
      return "😁";
    }
  };

  return (
    <div className="outer-workout-details-container">
      <div className="workout-details-container" id="xyz">
        <CardTitle title={displayedWorkout.timestamp} />

        <div>
          <div className="metadata-row">
            <div className="metadata-tag">
              <DisplayableEmoji />
            </div>
            <div className="metadata-tag">{displayedWorkout.effort}/10</div>
            <div className="metadata-tag">{displayedWorkout.id}</div>
          </div>
          <div>
            {displayedWorkout.workout.map((item) => {
              if (item.mode === "overall") {
                return (
                  <div className="grouped-workout" key={item.id}>
                    <div className="top-row">
                      <div className="exercise-name">
                        <b>{item.ex_name}</b>
                      </div>
                      <div className="exercise-desc">
                        <b>{item.weight}</b>
                        <span className="units">kg</span> X<b> {item.sets}</b>
                        <span className="units">sets</span> X<b> {item.reps}</b>
                        <span className="units">reps</span>
                      </div>
                    </div>
                  </div>
                );
              }
              if (item.mode === "sets") {
                return (
                  <div className="different-sets-workout" key={item.id}>
                    <div className="top-row">
                      <div className="exercise-name">
                        <b>{item.ex_name}</b>
                      </div>
                      <div className="exercise-desc">
                        <span className="descriptor">Individual sets</span>
                      </div>
                    </div>
                    <div className="exercise-desc">
                      {item.individual_sets.map((item) => {
                        return (
                          <p key={item.set_id}>
                            <b>{item.individual_weight}</b>
                            <span className="units">kg</span> X
                            <b> {item.individual_reps}</b>
                            <span className="units">reps</span>
                          </p>
                        );
                      })}
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletedWorkout;
