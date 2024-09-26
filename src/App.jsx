import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { Routes, Route, Link } from "react-router-dom";
import AddGames from "./Components/AddGames";
import EditUser from "./Components/EditUser";
import ViewGames from "./Components/ViewGames";
import { useState } from "react";
import { Container, Nav, Row } from "react-bootstrap";
import LeaderBoard from "./Components/LeaderBoard";
import useFetch from "./Hooks/useFetch";



// figure out fetching leader board and displaying

function App() {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});
  const [leaders, setLeaders] = useState(null)
  const {get, results} = useFetch('http://localhost:3000');

  function handleLogoutClick() {
    setIsLoggedin(false);
    setUser({});
  }

  function handleResetUser(sessions, average, totalGamesPlayed) {
    sessions.sort((a, b) => {
      if (a.date > b.date) {
        return 1;
      } else if (a.date < b.date) {
        return -1;
      }
      return 0;
    });
    setUser({ ...user, sessions, average, totalGamesPlayed });
  }

  function handleLoginSubmitClick(valUser) {
    setUser(valUser);
    setIsLoggedin(true);
    
  }

  function handleEditUser(updatedUser) {
    setUser(updatedUser);
  }

  function getLeaders() {
    get('/users')
    setLeaders(results)
  }

  
  
  return (
    <>
      <Container fluid className="background-img">
        <Header
          onLogoutClick={handleLogoutClick}
          isLoggedIn={isLoggedIn}
        ></Header>

        <Row>
          {isLoggedIn ? (
            <Nav className="d-flex justify-content-around">
              <Link className="navLink" to="/">
                Home
              </Link>
              <Link className="navLink" to="/addGames">
                Add Games
              </Link>
              <Link className="navLink" to="/viewGames">
                View Games
              </Link>
              <Link className="navLink" to="leaderBoard">
                LeaderBoard
              </Link>
              <Link className="navLink" to="/editUser">
                Edit User
              </Link>
            </Nav>
          ) : (
            <div></div>
          )}
        </Row>

        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                isLoggedIn={isLoggedIn}
                onLoginSubmitClick={handleLoginSubmitClick}
              ></Home>
            }
          />
          <Route
            path="/addGames"
            element={<AddGames user={user} onResetUser={handleResetUser} />}
          />
          <Route
            path="/viewGames"
            element={<ViewGames user={user} onResetUser={handleResetUser} />}
          />
          <Route
            path="/leaderBoard"
            element={<LeaderBoard leaders={leaders} onGetLeaders={getLeaders}  />}
          />
          <Route
            path="/editUser"
            element={<EditUser user={user} onEditUser={handleEditUser} />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
