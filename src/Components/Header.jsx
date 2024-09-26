import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { miyagi } from "ldrs";
import PropTypes from "prop-types";

function Header(props) {
  const { onLogoutClick, isLoggedIn } = props;
  miyagi.register();

  return (
    <Container fluid >
      <Row className="text-end text-primary">
        {isLoggedIn ? <Link to="/" className="navLink" onClick={onLogoutClick}>
          Logout
        </Link> : <div></div>}
      </Row>
      <Link to="/">
        <h1 className="text-center pt-5 mb-3 text-light text-decoration-underline ">
          {isLoggedIn ? "The Bowling Stats" : "Welcome to Bowling Stats"}
        </h1>
      </Link>
    </Container>
  );
}

export default Header;

Header.propTypes = {
  onLogoutClick: PropTypes.func,
  isLoggedIn: PropTypes.bool,
};
