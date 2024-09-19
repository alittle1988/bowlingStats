import { Container, Row } from "react-bootstrap";
import LastThreeTable from "../Tables/LastThreeTable";
import { PropTypes } from "prop-types";


function LastThree(props) {
  const {user} = props;
  return (
    <Container>
        <Row>
            <h3 className="m-4">Last Three Sessions</h3>
        </Row>
        <Row className='profileBorder bg-light'>
            <LastThreeTable user={user}></LastThreeTable>

        </Row>
    </Container>
  )
}

export default LastThree

LastThree.propTypes = {
  user: PropTypes.object
}