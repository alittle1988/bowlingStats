import { Button, Container, Form, Row } from "react-bootstrap";
import PropTypes from "prop-types";
import { useState } from "react";
import useFetch from "../Hooks/useFetch";
import { quantum } from "ldrs";
import { useNavigate } from "react-router-dom";

function EditUser(props) {
  const { user, onEditUser } = props;
  const [newUserName, setNewUserName] = useState(user.userName);
  const [newPass, setNewPass] = useState(user.password);
  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [newLastName, setNewLastName] = useState(user.lastName);
  const [newHand, setNewHand] = useState(user.hand);
  const [newGoalAvg, setNewGoalAvg] = useState(user.goalAvg);
  const [newBallWeight, setNewBallWeight] = useState(user.ballWeight);
  const { put, loading } = useFetch("http://localhost:3000");
  const navigate = useNavigate();
  quantum.register();

  

  function handleEditSubmitClick(e) {
    e.preventDefault();
    let updatedUser = {
      userName: newUserName,
      firstName: newFirstName,
      lastName: newLastName,
      password: newPass,
      hand: newHand,
      ballWeight: newBallWeight,
      goalAvg: newGoalAvg,
      sessions: user.sessions,
      _id: user._id,
      average: user.average
    };
    onEditUser(updatedUser);
    put(`/users/${user._id}`, updatedUser);
    alert('User has been updated!')
    navigate('/')
    
  }

  return (
    <>
      {loading ? (
        <l-quantum size="45" speed="1.75" color="red"></l-quantum>
      ) : (
        <Container>
          <Row className="my-5">
            <h3>Edit User</h3>
          </Row>
          <Row>
            <Form onSubmit={handleEditSubmitClick}>
              <Form.Group>
                <Form.Label htmlFor="editedUserName" className="mt-3">
                  UserName:
                </Form.Label>
                <Form.Control
                  id="editedUserName"
                  type="text"
                  value={newUserName}
                  onChange={(e) => setNewUserName(e.target.value)}
                  className="w-25"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="editedPassword" className="mt-3">
                  Password:
                </Form.Label>
                <Form.Control
                  id="editedPassword"
                  type="password"
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  className="w-25"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="editedFName" className="mt-3">
                  First name:
                </Form.Label>
                <Form.Control
                  id="editedFName"
                  type="text"
                  value={newFirstName}
                  onChange={(e) => setNewFirstName(e.target.value)}
                  className="w-25"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="editedLName" className="mt-3">
                  Last Name:
                </Form.Label>
                <Form.Control
                  id="editedLName"
                  type="text"
                  value={newLastName}
                  onChange={(e) => setNewLastName(e.target.value)}
                  className="w-25"
                ></Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="editedHand" className="mt-3">
                  Hand:
                </Form.Label>
                <Form.Select
                  id="editedHand"
                  value={newHand}
                  onChange={(e) => setNewHand(e.target.value)}
                  className="w-25"
                >
                  <option>Right</option>
                  <option>Left</option>
                  <option>Both</option>
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="editedBallWeight" className="mt-3">
                  Ball Weight:
                </Form.Label>
                <Form.Control
                  id="editedBallWeight"
                  value={newBallWeight}
                  onChange={(e) => setNewBallWeight(e.target.value)}
                  className="w-25"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="editedGoalAvg" className="mt-3">
                  Goal Average:
                </Form.Label>
                <Form.Control
                  id="editedGoalAvg"
                  value={newGoalAvg}
                  onChange={(e) => setNewGoalAvg(e.target.value)}
                  max={300}
                  className="w-25"
                />
              </Form.Group>
              <Button type="submit" className="mt-3">
                Submit
              </Button>
            </Form>
          </Row>
        </Container>
      )}
    </>
  );
}

export default EditUser;

EditUser.propTypes = {
  user: PropTypes.object,
  onEditUser: PropTypes.func,
};
