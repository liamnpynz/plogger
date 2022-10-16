import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.scss";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { WorkoutContextProvider } from "./context/workout.context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Router>
      <AuthProvider>
        <WorkoutContextProvider>
          <App />
        </WorkoutContextProvider>
      </AuthProvider>
    </Router>
  </>
);
