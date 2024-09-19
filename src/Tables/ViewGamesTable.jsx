import { Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";

function ViewGamesTable(props) {
  const { user, filteredList } = props;
  
  
  

  return (
    <Table striped bordered hover responsive className="backgrd">
      <thead>
        <tr>
          <th>Date</th>
          <th>Game 1</th>
          <th>Game 2</th>
          <th>Game 3</th>
          <th>Game 4</th>
          <th>Game 5</th>
          <th>Session Avg.</th>
          <th>Total Pins</th>
        </tr>
      </thead>
      <tbody>
        {filteredList.map((sesh, index) => {
          return (
            <tr key={index}>
              <td>{sesh.date}</td>
              <td>{sesh.game1}</td>
              {sesh.game2 ? <td>{sesh.game2}</td> : <td>N/A</td>}
              {sesh.game3 ? <td>{sesh.game3}</td> : <td>N/A</td>}
              {sesh.game4 ? <td>{sesh.game4}</td> : <td>N/A</td>}
              {sesh.game5 ? <td>{sesh.game5}</td> : <td>N/A</td>}
              <td>{sesh.seshAvg}</td>
              <td>{sesh.totalPins}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ViewGamesTable;

ViewGamesTable.propTypes = {
  user: PropTypes.object,
  filteredList: PropTypes.array,
};
