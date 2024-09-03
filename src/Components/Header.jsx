import { Container, Row } from "react-bootstrap";
import useFetch from "../Hooks/useFetch";
import { miyagi } from "ldrs";
import PropTypes from 'prop-types'

function Header(props) {
  const { onLogoutClick } = props;
  miyagi.register();

  function handleButtonClick() {}

  return (
    <Container >
      <Row className="text-end text-primary">
        <p onClick={onLogoutClick}>Logout</p>
      </Row>
      <h1 className="text-center my-5 text-light">Welcome to Bowling Stats</h1>
    </Container>
  );
}

export default Header;

Header.propTypes = {
  onLogoutClick: PropTypes.func
}
