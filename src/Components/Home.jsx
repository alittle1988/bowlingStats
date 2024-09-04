import React from 'react'
import { Container, Row } from 'react-bootstrap'
import LoginPage from './LoginPage';
import PropTypes from 'prop-types';
import UserHome from './UserHome';

function Home(props) {
    const {isLoggedIn, onLoginSubmitClick} = props;
  return (
    <Container>
        <Row>
            {isLoggedIn ? <UserHome></UserHome> : <LoginPage onLoginSubmitClick={onLoginSubmitClick}></LoginPage>}
        </Row>
    </Container>
  )
}

export default Home

Home.propTypes = {
    isLoggedIn: PropTypes.bool,
    onLoginSubmitClick: PropTypes.func,
}