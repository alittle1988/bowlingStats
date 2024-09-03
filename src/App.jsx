import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./Components/Header";
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
        <Header onLogoutClick={handleLogoutClick}></Header>
        <hr className="text-light mb-5"></hr>
        {isLoggedin ? (
          <div></div>
        ) : (
          <LoginPage onLoginSubmitClick={handleLoginSubmitClick} />
        )}
      </Container>
    </>
  );
}

export default App;
