import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginPage";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import useFetch from "./Hooks/useFetch";

function App() {
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [user, setUser] = useState({});
  const { get, results, loading } = useFetch("http://localhost:3000");

  function handleLogoutClick() {
    setIsLoggedin(false);
  }
  console.log(user)

  function handleLoginSubmitClick(valUser) {
      setUser(valUser)
      setIsLoggedin(true)
  }
  
  return (
    <>
      <Container fluid className="background-img">
        <Header onLogoutClick={handleLogoutClick} user={user}></Header>
        <hr className="text-light mb-5"></hr>
        <Routes>
          <Route path="/" element={<Home isLoggedIn={isLoggedin} onLoginSubmitClick={handleLoginSubmitClick}></Home>} />
          
            
        </Routes>
      </Container>
    </>
  );
}

export default App;
