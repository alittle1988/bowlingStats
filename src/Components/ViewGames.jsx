import ViewGamesTable from "../Tables/ViewGamesTable";
import { Container, Row, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import EditSeshForm from "../Forms/EditSeshForm";

function ViewGames(props) {
  const { user, onResetUser } = props;
  const [filteredList, setFilteredList] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState(
    Array.from(new Array(20), (val, index) => index - year)
  );
  const [months, setMonths] = useState([
    "Januaray",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [editSwitch, setEditSwitch] = useState(false);
  const [editSesh, setEditSesh] = useState({});

  function handleEditSwitch(selSesh) {
    setEditSesh(selSesh);

    setEditSwitch(!editSwitch);
  }

  function filterArrayByDate(from) {
    let begin;
    let end;
    switch (from) {
      case "Januaray":
        begin = `${year}` + "-" + "01";
        end = `${year}` + "-" + "02";
        break;
      case "Feburary":
        begin = `${year}` + "-" + "02";
        end = `${year}` + "-" + "03";
        break;
      case "March":
        begin = `${year}` + "-" + "03";
        end = `${year}` + "-" + "04";
        break;
      case "April":
        begin = `${year}` + "-" + "04";
        end = `${year}` + "-" + "05";
        break;
      case "May":
        begin = `${year}` + "-" + "05";
        end = `${year}` + "-" + "06";
        break;
      case "June":
        begin = `${year}` + "-" + "06";
        end = `${year}` + "-" + "07";
        break;
      case "July":
        begin = `${year}` + "-" + "07";
        end = `${year}` + "-" + "08";
        break;
      case "August":
        begin = `${year}` + "-" + "08";
        end = `${year}` + "-" + "09";
        break;
      case "September":
        begin = `${year}` + "-" + "09";
        end = `${year}` + "-" + "10";
        break;
      case "October":
        begin = `${year}` + "-" + "10";
        end = `${year}` + "-" + "11";
        break;
      case "November":
        begin = `${year}` + "-" + "11";
        end = `${year}` + "-" + "12";
        break;
      case "December":
        begin = `${year}` + "-" + "12";
        end = `${year}` + "-" + "01-31";
        break;
      default:
        console.log("no date selected");
    }

    let newArray = user.sessions.filter((item) => {
      if (item.date >= begin && item.date <= end) {
        return item;
      }
    });

    setFilteredList(newArray);
  }

  useEffect(() => {
    filterArrayByDate(month);
  }, [month, user]);
  // filter sessions in date order

  return (
    <>
      {editSwitch ? (
        <EditSeshForm
          user={user}
          onHandleEditSwitch={handleEditSwitch}
          sesh={editSesh}
          onResetUser={onResetUser}
        />
      ) : (
        <Container>
          <Row>
            <h4 className="text-center mt-5">View Games</h4>
          </Row>
          <Row>
            <Col lg={6}>
              <Form>
                <Form.Label htmlFor="year">Year:</Form.Label>
                <Form.Select
                  id="year"
                  className="w-50"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                >
                  {years.map((year, index) => {
                    return <option key={index}>{Math.abs(year)}</option>;
                  })}
                </Form.Select>
              </Form>
            </Col>
            <Col lg={6}>
              <Form.Label htmlFor="month">Month:</Form.Label>
              <Form.Select
                id="month"
                className="w-50"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option>{month}</option>
                {months.map((month) => {
                  return <option key={month}>{month}</option>;
                })}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mt-5">
            <ViewGamesTable
              onHandleEditSwitch={handleEditSwitch}
              onResetUser={onResetUser}
              filteredList={filteredList}
              user={user}
            />
          </Row>
        </Container>
      )}
    </>
  );
}

export default ViewGames;

ViewGames.propTypes = {
  user: PropTypes.object,
  onResetUser: PropTypes.func,
};
