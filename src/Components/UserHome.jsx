import { PropTypes } from "prop-types";
import { Col, Container, Row } from "react-bootstrap";
import ProfileData from "./ProfileData";
import LastThree from "./LastThree";
import CongratsForAverage from "./CongratsForAverage";

function UserHome(props) {
  const { user } = props;
  const {goalAvg, average } = user;
  console.log(goalAvg, average)
  return (
    <Container>
      <Row>
        {goalAvg < average ? <CongratsForAverage /> : <div></div>}
      </Row>
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
