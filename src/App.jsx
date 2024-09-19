import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { Routes, Route, Link } from "react-router-dom";
import AddGames from "./Components/AddGames";
import EditUser from "./Components/EditUser";
import ViewGames from "./Components/ViewGames";
import {  useState } from "react";
import { Container, Nav, Row } from "react-bootstrap";


function App() {
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});
  

  function handleLogoutClick() {
    setIsLoggedin(false);
    setUser({});
  }

  function handleResetUser(sessions, average) {
    sessions.sort((a, b) => {
      if(a.date > b.date) {
        return 1
      } else if (a.date < b.date) {
        return -1
      }
      return 0
    })
    setUser({...user, sessions, average})
  }
  
  function handleLoginSubmitClick(valUser) {
    setUser(valUser);
    setIsLoggedin(true);
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
          <Route path="/addGames" element={<AddGames user={user} onResetUser={handleResetUser} />} />
          <Route path="/viewGames" element={<ViewGames user={user} />} />
          <Route path="/editUser" element={<EditUser />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
