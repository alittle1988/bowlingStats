import { PropTypes } from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import ProfileData from "./ProfileData";
import LastThree from "./LastThree";

function UserHome(props) {
  const { user } = props;
  return (
    <Container>
      <Row className="mt-5">
        <Col lg={4}>
          <ProfileData user={user} />
        </Col>

        <Col lg={8}>
          <LastThree user={user}></LastThree>
        </Col>
      </Row>
    </Container>
  );
}

export default UserHome;

UserHome.propTypes = {
  user: PropTypes.object,
};
