import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Nav from "./routes/nav/nav.component";
import Home from "./routes/home/home.component";
import Results from "./routes/results/results.component";
import Account from "./routes/account/account.component";
import Secure from "./routes/secure-container/secure.jsx";
import WorkoutDetails from "./routes/workout-details/workout-details";
import SignIn from "./routes/sign-in/sign-in.component";
import Privacy from "./routes/privacy/privacy.component";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Nav />}>
        <Route path="/" element={<Home />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/results" element={<Results />} />
        <Route path="/workouts/:id" element={<WorkoutDetails />} />
        <Route path="/signin" element={<SignIn />} />
        <Route
          path="/account"
          element={
            <Secure>
              <Account />
            </Secure>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
