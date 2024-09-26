import { Container, Row } from "react-bootstrap";
import LoginPage from "./LoginPage";
import PropTypes from "prop-types";
import UserHome from "./UserHome";

function Home(props) {
  const { isLoggedIn, onLoginSubmitClick, user } = props;
  return (
    <Container fluid>
      <Row>
        {isLoggedIn ? (
          <UserHome user={user}></UserHome>
        ) : (
          <LoginPage onLoginSubmitClick={onLoginSubmitClick}></LoginPage>
        )}
      </Row>
    </Container>
  );
}

export default Home;

Home.propTypes = {
  isLoggedIn: PropTypes.bool,
  onLoginSubmitClick: PropTypes.func,
  user: PropTypes.object,
};
