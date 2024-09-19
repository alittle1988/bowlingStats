import React, { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import PropTypes from 'prop-types'
import { quantum } from "ldrs";
function LoginForm(props) {
  const { onLoginSubmitClick, onNewUserClick } = props;
  const { get, loading, results } = useFetch("http://localhost:3000");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [errorVal, setErrorVal] = useState('')

  quantum.register();

  
  function handleSubmitClick(e) {
    e.preventDefault();
   
    
    get(`/users/${userName}?password=${password}`)
    
  }

  useEffect(() => {
    
    if(results) {
        if(results.error) {
            setErrorVal(results.error)
            setUserName('')
            setPassword('')
        } else {
            onLoginSubmitClick(results.data)
        }
    } 
  }, [results, onLoginSubmitClick])
  
  return (
    <>
      {loading ? (
        <l-quantum size="45" speed="1.75" color="red"></l-quantum>
      ) : (
        <Form onSubmit={handleSubmitClick} className=" my-5">
          <Form.Group className="mb-3">
            <Form.Label htmlFor="userName" className="text-light">
              UserName:{" "}
            </Form.Label>
            <Form.Control
              value={userName}
              onChange={(e) => setUserName(e.target.value.toLowerCase())}
              id="userName"
              type="text"
              placeholder="Enter Username"
              className="w-25"
            />
            
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label htmlFor="password" className="text-light">
              Password:{" "}
            </Form.Label>
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Enter Password"
              className="w-25"
            />
          </Form.Group>
          {errorVal === '' ? <div></div> : <p className="text-danger">{errorVal}</p>}
          <Row>
            <Col lg={1}>
          <Button type="submit">Sumbit</Button>
            </Col>
            <Col>
                <Button type='button' onClick={onNewUserClick}>Create New User</Button>
            </Col>
          </Row>
        </Form>
      )}
    </>
  );
}

export default LoginForm;

LoginForm.propTypes = {
    onLoginSubmitClick: PropTypes.func,
    onNewUserClick: PropTypes.func,
}