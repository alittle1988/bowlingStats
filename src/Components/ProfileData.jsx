import { PropTypes } from 'prop-types';
import { Col, Container, Row } from "react-bootstrap";

function ProfileData(props) {
  const { user } = props;
  
  return (
    <Container >
        <Row>
            <h3 className='m-4'>Profile</h3>
        </Row>
        <Row className='profileBorder bg-light'>
          <Col>
            <p className='mt-3 profileData'>Username: {user.userName}</p>
            <p className='profileData'>First Name: {user.firstName}</p>
            <p className='profileData'>Last Name: {user.lastName}</p>
            <p className='profileData'>Goal Average: {user.goalAvg}</p>
            <p className='profileData'>Actual Average: {Math.floor(user.average * 10) / 10}</p>
            <p className='profileData'>Hand: {user.hand}</p>
            <p className='profileData'>Ball Size: {user.ballWeight}lbs</p>

          </Col>
          <Col>
            {user.img ? <img className='w-75 profileImg pt-2' src={user.img} /> : <div></div>}
          </Col>
        </Row>
    </Container>
  );
}

export default ProfileData;

ProfileData.propTypes = {
  user: PropTypes.object,
};
