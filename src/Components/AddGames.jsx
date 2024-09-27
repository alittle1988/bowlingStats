import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import NewGameForm from "../Forms/NewGameForm";
import PropTypes from "prop-types";
import useFetch from "../Hooks/useFetch.js";
import { quantum } from "ldrs";
import { v4 as uuidv4 } from "uuid";
import { useNavigate} from "react-router-dom";

function AddGames(props) {
  const { user, onResetUser } = props;
  const [date, setDate] = useState("");
  const [numGames, setNumGames] = useState(1);
  const [game1, setGame1] = useState(0);
  const [game2, setGame2] = useState(0);
  const [game3, setGame3] = useState(0);
  const [game4, setGame4] = useState(0);
  const [game5, setGame5] = useState(0);
  const [val, setVal] = useState(false);
  const { put, loading } = useFetch("http://localhost:3000");
  const navigate = useNavigate();

  quantum.register();

  function handleGameChange(game, score) {
    switch (game) {
      case 1:
        setGame1(Number(score));

        break;
      case 2:
        setGame2(Number(score));
        break;
      case 3:
        setGame3(Number(score));
        break;
      case 4:
        setGame4(Number(score));
        break;
      case 5:
        setGame5(Number(score));
        break;
      default:
        alert("Incorrect game amount!");
        break;
    }
  }

  function handleAddGameSubmitClick(e) {
    e.preventDefault();
    let hiGame = user.highestGame;
    if (date === "") {
      setVal(true);
      return;
    }
    if(game1 > hiGame) {
      hiGame = game1
    }
     if(game2 > hiGame) {
      hiGame = game2
    }
     if(game3 > hiGame) {
      hiGame = game3
    }
     if(game4 > hiGame) {
      hiGame = game4
    }
     if(game5 > hiGame) {
      hiGame = game5
    }

    let totalPins =
      Number(game1) +
      Number(game2) +
      Number(game3) +
      Number(game4) +
      Number(game5);
    let seshAvg = totalPins / numGames;
    let newSesh = {};
    
    let newSessions = user.sessions
    switch (numGames) {
      case 1:
        if (game1 === 0) {
          setVal(true);
          return;
        }
        newSesh = {
          date: date,
          game1: game1,
          totalPins: totalPins,
          seshAvg: Math.round(seshAvg * 10) / 10,
          numOfGames: numGames,
          id: uuidv4(),
        };
        break;
      case 2:
        if (game1 === 0 || game2 === 0) {
          setVal(true);
          return;
        }
        newSesh = {
          date: date,
          game1: game1,
          game2: game2,
          totalPins: totalPins,
          seshAvg: Math.round(seshAvg * 10) / 10,
          numOfGames: numGames,
          id: uuidv4(),
        };
        break;
      case 3:
        if (game1 === 0 || game2 === 0 || game3 === 0) {
          setVal(true);
          return;
        }
        newSesh = {
          date: date,
          game1: game1,
          game2: game2,
          game3: game3,
          totalPins: totalPins,
          seshAvg: Math.round(seshAvg * 10) / 10,
          numOfGames: numGames,
          id: uuidv4(),
        };
        break;
      case 4:
        if (game1 === 0 || game2 === 0 || game3 === 0 || game4 === 0) {
          setVal(true);
          return;
        }
        newSesh = {
          date: date,
          game1: game1,
          game2: game2,
          game3: game3,
          game4: game4,
          totalPins: totalPins,
          seshAvg: Math.round(seshAvg * 10) / 10,
          numOfGames: numGames,
          id: uuidv4(),
        };
        break;
      case 5:
        if (
          game1 === 0 ||
          game2 === 0 ||
          game3 === 0 ||
          game4 === 0 ||
          game5 === 0
        ) {
          setVal(true);
          return;
        }
        newSesh = {
          date: date,
          game1: game1,
          game2: game2,
          game3: game3,
          game4: game4,
          game5: game5,
          totalPins: totalPins,
          seshAvg: Math.round(seshAvg * 10) / 10,
          numOfGames: numGames,
          id: uuidv4(),
        };
        break;
      default:
        console.log("No Bueno");
        break;
    }
    newSessions.push(newSesh);
    let totalGamesPlayed = user.gamesPlayed
    let totalGames = 0;
    let totalPinsAmount = 0;
    newSessions.forEach((game) => {
      totalPinsAmount += game.totalPins;
      totalGames += game.numOfGames;
      totalGamesPlayed =+ totalGames
      
    });
    let newAverage = totalPinsAmount / totalGames;
    newAverage = Math.round(newAverage * 10) / 10;
    onResetUser(newSessions, newAverage, totalGamesPlayed);

    setGame1(0);
    setGame2(0);
    setGame3(0);
    setGame4(0);
    setGame5(0);
    setDate("");
    put(`/users/${user._id}`, { sessions: newSessions, average: newAverage, gamesPlayed: totalGamesPlayed, highestGame: hiGame });
    alert(`Games have been added!`)
    navigate('/')
  }

  return (
    <Container fluid className="m-5">
      {loading ? (
        <l-quantum size="45" speed="1.75" color="red"></l-quantum>
      ) : (
        <Row>
          <Col lg="6">
            <h4 className="mt-4">Add Games</h4>
            <p className="m-0">First select a date</p>
            <p className="m-0">Then add games</p>
            <hr className="w-25 m-0"></hr>
            <Form className="mt-4" onSubmit={handleAddGameSubmitClick}>
              <Form.Group>
                <Form.Label htmlFor="date">Date:</Form.Label>
                <Form.Control
                  id="date"
                  className="w-50"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
                {val && date === "" ? (
                  <Form.Text className="text-danger">
                    Please Select Date
                  </Form.Text>
                ) : (
                  <div></div>
                )}
              </Form.Group>
              <Form.Group>
                <Form.Label htmlFor="numGames">Number of Games:</Form.Label>
                <Form.Control
                  id="numGames"
                  value={numGames}
                  className="w-50"
                  type="number"
                  min={1}
                  max={5}
                  onChange={(e) => setNumGames(Number(e.target.value))}
                ></Form.Control>
              </Form.Group>

              <NewGameForm
                disabled={date === "" ? true : false}
                game={1}
                gameScore={game1}
                onGameChange={handleGameChange}
              />
              {val && game1 === 0 ? (
                <Form.Text className="text-danger">
                  Please Enter Score
                </Form.Text>
              ) : (
                <div></div>
              )}

              {numGames >= 2 ? (
                <NewGameForm
                  disabled={date === "" ? true : false}
                  game={2}
                  gameScore={game2}
                  onGameChange={handleGameChange}
                />
              ) : (
                <div></div>
              )}
              {val && numGames >= 2 && game2 === 0 ? (
                <Form.Text className="text-danger">
                  Please Enter Score
                </Form.Text>
              ) : (
                <div></div>
              )}

              {numGames >= 3 ? (
                <NewGameForm
                  disabled={date === "" ? true : false}
                  game={3}
                  gameScore={game3}
                  onGameChange={handleGameChange}
                />
              ) : (
                <div></div>
              )}
              {val && numGames >= 3 && game3 === 0 ? (
                <Form.Text className="text-danger">
                  Please Enter Score
                </Form.Text>
              ) : (
                <div></div>
              )}
              {numGames >= 4 ? (
                <NewGameForm
                  disabled={date === "" ? true : false}
                  game={4}
                  gameScore={game4}
                  onGameChange={handleGameChange}
                />
              ) : (
                <div></div>
              )}
              {val && numGames >= 4 && game4 === 0 ? (
                <Form.Text className="text-danger">
                  Please Enter Score
                </Form.Text>
              ) : (
                <div></div>
              )}
              {numGames >= 5 ? (
                <NewGameForm
                  disabled={date === "" ? true : false}
                  game={5}
                  gameScore={game5}
                  onGameChange={handleGameChange}
                />
              ) : (
                <div></div>
              )}
              {val && numGames >= 5 && game5 === 0 ? (
                <Form.Text className="text-danger">
                  Please Enter Score
                </Form.Text>
              ) : (
                <div></div>
              )}
              
              <Button type="submit" className="mt-2">
                Submit
              </Button>
              
            </Form>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default AddGames;

AddGames.propTypes = {
  user: PropTypes.object,
  onResetUser: PropTypes.func,
};
