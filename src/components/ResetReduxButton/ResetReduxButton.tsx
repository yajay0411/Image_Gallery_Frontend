// ExampleComponent.js
import React from "react";
import { resetPersistedState } from "../../redux/Store";

const ResetReduxButton: React.FC = () => {
  const handleResetRedux = async () => {

    await resetPersistedState();
    window.location.reload();
  };

  return (
    <div>
      <button onClick={handleResetRedux}>Reset Persisted State</button>
    </div>
  );
};

export default ResetReduxButton;
