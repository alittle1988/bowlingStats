import { Col, Container, Row, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";

function LastThreeTable(props) {
  const { user } = props;
  const { sessions } = user;
  const [lastThree, setLastThree] = useState(
    sessions.slice(-3, sessions.length + 1)
  );
  const [lastThreeTotPins, setLastThreeTotPins] = useState(() => {
    let totPins = 0;
    lastThree.forEach((each) => {
      totPins += each.totalPins;
    });
    return totPins;
  });
  const [lastThreeAvg, setLastThreeAvg] = useState(() => {
    let totAvg = 0;
    lastThree.forEach((each) => {
      totAvg += each.seshAvg;
    });
    return Math.floor(totAvg / lastThree.length);
  });



  return (
    <Container>
      <Row className="w-100">
        <Table striped bordered className="m-4">
          <thead>
            <tr>
              <th>Date</th>
              <th>Game 1</th>
              <th>Game 2</th>
              <th>Game 3</th>
              <th>Game 4</th>
              <th>Game 5</th>
              <th>Total Pins</th>
              <th>Sesh Avg.</th>
            </tr>
          </thead>
          {sessions.length > 0 ? (
            <tbody>
              {lastThree.map((each, index) => {
                if (index <= 2) {
                  return (
                    <tr key={index}>
                      <td>{each.date}</td>
                      {each.game1 ? <td>{each.game1}</td> : <td>N/A</td>}
                      {each.game2 ? <td>{each.game2}</td> : <td>N/A</td>}
                      {each.game3 ? <td>{each.game3}</td> : <td>N/A</td>}
                      {each.game4 ? <td>{each.game4}</td> : <td>N/A</td>}
                      {each.game5 ? <td>{each.game5}</td> : <td>N/A</td>}
                      <td>{each.totalPins}</td>
                      <td>{each.seshAvg}</td>
                    </tr>
                  );
                }
              })}
            </tbody>
          ) : (
            <div>No Data</div>
          )}
        </Table>
      </Row>
      <Row className="text-center">
        <Col lg={6}>
          <p className="last3Tot">Last Three Total Pins: {lastThreeTotPins}</p>
        </Col>
        <Col lg={6}>
          <p className="last3Tot">Last Three Average: {lastThreeAvg}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default LastThreeTable;

LastThreeTable.propTypes = {
  user: PropTypes.object,
};
