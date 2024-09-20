import { Button, Container, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import EditSeshForm from "../Forms/EditSeshForm";
import useFetch from "../Hooks/useFetch";

function ViewGamesTable(props) {
  const { user, filteredList, onHandleEditSwitch, onResetUser } = props;
  const {put, loading} = useFetch('http://localhost:3000')
  

  function handleDeleteClick(sesh) {
    if ( confirm("Are you sure you want to delete the Session?")) {
      user.sessions.forEach((item, index) => {
        if(sesh.id === item.id) {
          user.sessions.splice(index, 1)
          console.log("found It")
        }
      })
      let totPins = 0;
      let totGames = 0;
      user.sessions.forEach(item => {
        totPins += item.totalPins;
        totGames += item.numOfGames;
      })
      let newAvg = totPins/totGames;
      onResetUser(user.sessions, newAvg)
      put(`/users/${user._id}`, {sessions: user.sessions, average: newAvg})
    }
    
  }

  //  adding delete button functionality to all

  return (
    <Container>
       <Table striped bordered hover responsive className="backgrd">
        <thead>
          <tr className="text-center">
            <th>Date</th>
            <th>Game 1</th>
            <th>Game 2</th>
            <th>Game 3</th>
            <th>Game 4</th>
            <th>Game 5</th>
            <th>Session Avg.</th>
            <th>Total Pins</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredList.map((sesh, index) => {
            return (
              <tr
                key={index}
                
                className="text-center seshRow"
              >
                <td onClick={() => onHandleEditSwitch(sesh)}>{sesh.date}</td>
                <td onClick={() => onHandleEditSwitch(sesh)}>{sesh.game1}</td>
                {sesh.game2 ? <td onClick={() => onHandleEditSwitch(sesh)}>{sesh.game2}</td> : <td onClick={() => onHandleEditSwitch(sesh)}>N/A</td>}
                {sesh.game3 ? <td onClick={() => onHandleEditSwitch(sesh)}>{sesh.game3}</td> : <td onClick={() => onHandleEditSwitch(sesh)}>N/A</td>}
                {sesh.game4 ? <td onClick={() => onHandleEditSwitch(sesh)}>{sesh.game4}</td> : <td onClick={() => onHandleEditSwitch(sesh)}>N/A</td>}
                {sesh.game5 ? <td onClick={() => onHandleEditSwitch(sesh)}>{sesh.game5}</td> : <td onClick={() => onHandleEditSwitch(sesh)}>N/A</td>}
                <td onClick={() => onHandleEditSwitch(sesh)}>{sesh.seshAvg}</td>
                <td onClick={() => onHandleEditSwitch(sesh)}>{sesh.totalPins}</td>
                <td><Button onClick={() => handleDeleteClick(sesh)} className="btn btn-danger">Delete</Button></td>
              </tr>
            );
          })}
        </tbody>
      </Table> 
    </Container>
  );
}

export default ViewGamesTable;

ViewGamesTable.propTypes = {
  user: PropTypes.object,
  filteredList: PropTypes.array,
  onHandleEditSwitch: PropTypes.func,
  onResetUser: PropTypes.func
};
