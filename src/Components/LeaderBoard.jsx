import { Button, Container, Row, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import useFetch from "../Hooks/useFetch";

function LeaderBoard() {
  const [leaders, setLeaders] = useState(null);
  const { get, results } = useFetch("http://localhost:3000");

  function getLeaders() {
    results.data.sort((a, b) => {
      if (a.average < b.average) {
        return 1;
      } else if (a.average > b.average) {
        return -1;
      }
      return 0;
    });
    setLeaders(results);
  }

  useEffect(() => {
    get("/users");
  }, []);

  
  return (
    <Container>
      <Row>
        <h3 className="text-center m-5">Leader Board</h3>
      </Row>

      <Row>
        {leaders ? (
          <Table striped bordered hover responsive className="backgrd">
            <thead>
              <tr>
                <th>#</th>
                <th>Bowler Name</th>
                <th>Bowler Avg.</th>
                <th>Games Played</th>
                <th>Highest Game</th>
              </tr>
            </thead>
            <tbody>
              {leaders.data.map((bowler, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{`${bowler.firstName} ${bowler.lastName}`}</td>
                    <td>{bowler.average}</td>
                    <td>{bowler.gamesPlayed}</td>
                    <td>{bowler.highestGame}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        ) : (
          <Button onClick={getLeaders}>Load Leaders</Button>
        )}
      </Row>
    </Container>
  );
}

export default LeaderBoard;
