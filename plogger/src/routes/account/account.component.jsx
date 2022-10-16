import "./account.styles.scss";
import CardTitle from "../../components/card-title/card-title.component";
import SettingsPanel from "../../components/settings-panel/settings-panel.component";
import WorkoutHistory from "../../components/workout-history/workout-history.component";

import { ToastContainer } from "react-toastify";

const Account = () => {
  return (
    <div className="outer-account-container">
      <div className="account-container">
        <CardTitle title="My Workouts" />
        <WorkoutHistory />
      </div>
      <SettingsPanel />
      <ToastContainer />
    </div>
  );
};

export default Account;
