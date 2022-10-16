import React from "react";
import GymContainer from "../../components/gym-container/gym-container.component";
import SentimentContainer from "../../components/sentiment-container/sentiment-container.component";
import { ErrorBoundary } from "react-error-boundary";
import "./home.styles.scss";

function ErrorFallback({ error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

const Home = () => {
  return (
    <div className="everything-below-nav">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <GymContainer />
        <SentimentContainer />
      </ErrorBoundary>
    </div>
  );
};

export default Home;
