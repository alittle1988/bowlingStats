import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";

function CongratsForAverage() {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
  });
  return (
    <Container>
      <Row>
        <h1 className="text-center mt-5">CONGRAGULATIONS!!!</h1>
        {showConfetti && <Confetti />}
      </Row>
      <Row className="profileBorder bg-light text-center m-4 ">
        <h4 className="mt-3">You have reached you goal average!</h4>
        <h4>Please set a new goal average</h4>
        <Link to="/editUser" className="mb-3">
          Edit Goal Average
        </Link>
      </Row>
    </Container>
  );
}

export default CongratsForAverage;
