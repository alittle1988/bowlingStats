import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import LoginForm from '../Forms/LoginForm';
import NewUserForm from '../Forms/NewUserForm';
import PropTypes from 'prop-types'

function LoginPage(props) {
    const {onLoginSubmitClick} = props;
    const [newUserSwitch, setNewUserSwitch] = useState(true);

    function handleNewUserClick() {
      setNewUserSwitch(!newUserSwitch)
    }

    
  return (
    <Container >
        {newUserSwitch ? <h3 className='text-light'>Create New User</h3> :<h3 className='text-light'>Please Login</h3>}
        <Row>
            <Col>
        {newUserSwitch ? <NewUserForm onNewUserClick={handleNewUserClick}></NewUserForm> :<LoginForm onNewUserClick={handleNewUserClick} onLoginSubmitClick={onLoginSubmitClick} />}
            </Col>
        </Row>
    </Container>
  )
}

export default LoginPage

LoginPage.propTypes = {
  onLoginSubmitClick: PropTypes.func,
} 