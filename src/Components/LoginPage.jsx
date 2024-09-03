import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import LoginForm from '../Forms/LoginForm';
import PropTypes from 'prop-types'

function LoginPage(props) {
    const {onLoginSubmitClick} = props;

    
  return (
    <Container >
        <h3 className='text-light'>Please Login</h3>
        <Row>
            <Col>
        <LoginForm onLoginSubmitClick={onLoginSubmitClick} />
            </Col>
        </Row>
    </Container>
  )
}

export default LoginPage

LoginPage.propTypes = {
  onLoginSubmitClick: PropTypes.func,
} 