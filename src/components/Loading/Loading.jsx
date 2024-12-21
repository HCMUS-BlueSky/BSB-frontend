import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div className="loading-container d-flex justify-content-center align-items-center">
      <Spinner
        animation="border"
        role="status"
        style={{ width: "3rem", height: "3rem" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};

export default Loading;
