import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "./settings-panel.styles.scss";
import "../../routes/account/account.styles.scss";
import { UserAuth } from "../../context/auth.context";
import { WorkoutContext } from "../../context/workout.context";

import { deleteAllDocs } from "../../utils/firebase.utils";

import { Button } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { toast } from "react-toastify";
import PolicyIcon from "@mui/icons-material/Policy";

const SettingsPanel = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const workoutContextContainer = useContext(WorkoutContext);
  const { workoutContext, setWorkoutContext } = workoutContextContainer;
  const [requestingDataDeletion, setRequestingDataDeletion] = useState(false);

  const sendDeleteMyDataRequest = () => deleteMyDataRequest();
  const deleteMyDataRequest = () => {
    setRequestingDataDeletion(true);
    setTimeout(cancelDeleteRequest, 10000);
  };
  const sendConfirmedDeleteMyDataRequest = async () => {
    const uid = await user.uid;
    const newODContext = JSON.parse(JSON.stringify(workoutContext));
    newODContext.requestingSave = "false";
    setWorkoutContext(newODContext);
    localStorage.clear();
    await deleteAllDocs(uid);
    toast.success("Your data has been deleted.", { autoClose: 5000 });
    setTimeout(navigate("/"), 5000);
  };
  const cancelDeleteRequest = () => {
    setRequestingDataDeletion(false);
  };

  const handleGoogleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(
        "Sorry, it looks like there has been a problem logging you out. Please try again."
      );
    }
  };

  return (
    <div className="settings-container">
      <div className="about-box">
        <AdminPanelSettingsIcon style={{ marginRight: "12px" }} />
        <span className="title">Account Settings</span>
      </div>
      <div className="buttons-container">
        <Button
          variant="outlined"
          onClick={() => handleGoogleSignOut()}
          startIcon={<LogoutIcon />}
          style={{ margin: "5px" }}
        >
          Sign out
        </Button>
        {requestingDataDeletion === false ? (
          <Button
            variant="outlined"
            onClick={() => sendDeleteMyDataRequest()}
            startIcon={<DeleteForeverIcon style={{ color: "red" }} />}
            style={{ borderColor: "red", color: "red", margin: "5px" }}
          >
            Delete my data
          </Button>
        ) : (
          <div className="confirmation-container">
            <p>This action cannot be undone.</p>
            <Button
              variant="contained"
              onClick={() => sendConfirmedDeleteMyDataRequest()}
              startIcon={<DeleteForeverIcon style={{ color: "white" }} />}
              style={{
                borderColor: "red",
                color: "white",
                margin: "5px",
                backgroundColor: "red",
              }}
            >
              Delete my data forever
            </Button>
          </div>
        )}
        <Link to="/privacy" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            startIcon={<PolicyIcon />}
            style={{
              borderColor: "darkgrey",
              color: "darkgrey",
              margin: "5px",
              backgroundColor: "white",
            }}
          >
            View privacy policy
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SettingsPanel;
