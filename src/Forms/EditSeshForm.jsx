import { useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import NewGameForm from "./NewGameForm";
import PropTypes from "prop-types";
import useFetch from "../Hooks/useFetch";
import { quantum } from "ldrs";

function EditSeshForm(props) {
  const { sesh, onHandleEditSwitch, user, onResetUser } = props;
  const [newDate, setNewDate] = useState(sesh.date || "");
  const [newGame1, setNewGame1] = useState(sesh.game1 || 0);
  const [newGame2, setNewGame2] = useState(sesh.game2 || 0);
  const [newGame3, setNewGame3] = useState(sesh.game3 || 0);
  const [newGame4, setNewGame4] = useState(sesh.game4 || 0);
  const [newGame5, setNewGame5] = useState(sesh.game5 || 0);
  const [newNumGames, setNewNumGames] = useState(sesh.numOfGames);
  const [val, setVal] = useState(false);
  const { put, loading } = useFetch("http://localhost:3000");
  quantum.register();

  function handleEditGame(game, score) {
    switch (game) {
      case 1:
        setNewGame1(Number(score));

        break;
      case 2:
        setNewGame2(Number(score));
        break;
      case 3:
        setNewGame3(Number(score));
        break;
      case 4:
        setNewGame4(Number(score));
        break;
      case 5:
        setNewGame5(Number(score));
        break;
      default:
        alert("Incorrect game amount!");
        break;
    }
  }
  function handleEditSeshSubmit(e) {
    e.preventDefault();
    if (newDate === "") {
      setVal(true);
      return;
    }
    let newSesh = {};
    let totalPins =
      Number(newGame1) +
      Number(newGame2) +
      Number(newGame3) +
      Number(newGame4) +
      Number(newGame5);
    let newSeshAvg = totalPins / newNumGames;
    switch (newNumGames) {
      case 1:
        if (newGame1 === 0) {
          setVal(true);
          return;
        }
        newSesh = {
          numOfGames: newNumGames,
          date: newDate,
          game1: newGame1,
          totalPins: totalPins,
          seshAvg: Math.round(newSeshAvg * 10) / 10,
          id: sesh.id,
        };
        break;
      case 2:
        if (newGame1 === 0 || newGame2 === 0) {
          setVal(true);
          return;
        }
        newSesh = {
          numOfGames: newNumGames,
          date: newDate,
          game1: newGame1,
          game2: newGame2,
          totalPins: totalPins,
          seshAvg: Math.round(newSeshAvg * 10) / 10,
          id: sesh.id,
        };
        break;
      case 3:
        if (newGame1 === 0 || newGame2 === 0 || newGame3 === 0) {
          setVal(true);
          return;
        }
        newSesh = {
          numOfGames: newNumGames,
          date: newDate,
          game1: newGame1,
          game2: newGame2,
          game3: newGame3,
          totalPins: totalPins,
          seshAvg: Math.round(newSeshAvg * 10) / 10,
          id: sesh.id,
        };
        break;
      case 4:
        if (
          newGame1 === 0 ||
          newGame2 === 0 ||
          newGame3 === 0 ||
          newGame4 === 0
        ) {
          setVal(true);
          return;
        }
        newSesh = {
          numOfGames: newNumGames,
          date: newDate,
          game1: newGame1,
          game2: newGame2,
          game3: newGame3,
          game4: newGame4,
          totalPins: totalPins,
          seshAvg: Math.round(newSeshAvg * 10) / 10,
          id: sesh.id,
        };
        break;
      case 5:
        if (
          newGame1 === 0 ||
          newGame2 === 0 ||
          newGame3 === 0 ||
          newGame4 === 0 ||
          newGame5 === 0
        ) {
          setVal(true);
          return;
        }
        newSesh = {
          numOfGames: newNumGames,
          date: newDate,
          game1: newGame1,
          game2: newGame2,
          game3: newGame3,
          game4: newGame4,
          game5: newGame5,
          totalPins: totalPins,
          seshAvg: Math.round(newSeshAvg * 10) / 10,
          id: sesh.id,
        };
        break;
      default:
        alert("inncorrect Number of Games!");
        break;
    }

    user.sessions.forEach((item, index) => {
      if (item.id === sesh.id) {
        user.sessions.splice(index, 1, newSesh);
      }
    });
    let games = 0;
    let totPins = 0;
    user.sessions.forEach(item => {
        totPins += item.totalPins;
        games += item.numOfGames
    })
    let newAvg = totPins/games;

    put(`/users/${user._id}`, { sessions: user.sessions, average: newAvg });
    onResetUser(user.sessions, newAvg)
    onHandleEditSwitch()

  }

  return (<>
    {loading ? <l-quantum size="45" speed="1.75" color="red"></l-quantum> :<Container className="mt-5">
      <Row>
        <h3 className="mb-4 ">Edit Session Data</h3>
        <Form onSubmit={handleEditSeshSubmit}>
          <Form.Group>
            <Form.Label htmlFor="newDate" className="w-25">
              Date:
            </Form.Label>
            <Form.Control
              id="newDate"
              type="date"
              className="w-25"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            ></Form.Control>
            {val && newDate === "" ? (
              <Form.Text className="text-danger">Please Enter Date!</Form.Text>
            ) : (
              <div></div>
            )}
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Label htmlFor="newNumOfGames" className="w-25">
              Number Of Games:
            </Form.Label>
            <Form.Control
              id="newNumOfGames"
              className="w-25"
              type="number"
              min={1}
              max={5}
              value={newNumGames}
              onChange={(e) => setNewNumGames(Number(e.target.value))}
            ></Form.Control>
          </Form.Group>
          {newNumGames >= 1 ? (
            <NewGameForm
              onGameChange={handleEditGame}
              disabled={newDate === "" ? true : false}
              game={1}
              gameScore={newGame1}
            />
          ) : (
            <div></div>
          )}
          {val && newGame1 === 0 ? (
            <Form.Text className="text-danger">Please Enter a Score!</Form.Text>
          ) : (
            <div></div>
          )}
          {newNumGames >= 2 ? (
            <NewGameForm
              onGameChange={handleEditGame}
              disabled={newDate === "" ? true : false}
              game={2}
              gameScore={newGame2}
            />
          ) : (
            <div></div>
          )}
          {val && newGame2 === 0 ? (
            <Form.Text className="text-danger">Please Enter a Score!</Form.Text>
          ) : (
            <div></div>
          )}
          {newNumGames >= 3 ? (
            <NewGameForm
              onGameChange={handleEditGame}
              disabled={newDate === "" ? true : false}
              game={3}
              gameScore={newGame3}
            />
          ) : (
            <div></div>
          )}
          {val && newGame3 === 0 ? (
            <Form.Text className="text-danger">Please Enter a Score!</Form.Text>
          ) : (
            <div></div>
          )}
          {newNumGames >= 4 ? (
            <NewGameForm
              onGameChange={handleEditGame}
              disabled={newDate === "" ? true : false}
              game={4}
              gameScore={newGame4}
            />
          ) : (
            <div></div>
          )}
          {val && newGame4 === 0 ? (
            <Form.Text className="text-danger">Please Enter a Score!</Form.Text>
          ) : (
            <div></div>
          )}
          {newNumGames >= 5 ? (
            <NewGameForm
              onGameChange={handleEditGame}
              disabled={newDate === "" ? true : false}
              game={5}
              gameScore={newGame5}
            />
          ) : (
            <div></div>
          )}
          {val && newGame5 === 0 ? (
            <Form.Text className="text-danger">Please Enter a Score!</Form.Text>
          ) : (
            <div></div>
          )}
          <Row>
            <Col lg={1}>
              <Button type="submit" className="mt-3">
                Submit
              </Button>
            </Col>
            <Col lg={3}>
              <Button
                onClick={onHandleEditSwitch}
                type="button"
                className="mt-3"
              >
                Back to View Games
              </Button>
            </Col>
          </Row>
        </Form>
      </Row>
    </Container>}
  </>);
}

export default EditSeshForm;

EditSeshForm.propTypes = {
  sesh: PropTypes.object,
  onHandleEditSwitch: PropTypes.func,
  user: PropTypes.object,
  onResetUser: PropTypes.func,
};
