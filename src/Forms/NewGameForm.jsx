import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

function NewGameForm(props) {
  const { game, onGameChange, gameScore, disabled } = props;
  return (
    <Form.Group className="mt-2">
      <Form.Label htmlFor={`game${game}`}>Game {game}</Form.Label>
      <Form.Control
        disabled={disabled}
        id={`game${game}`}
        className="w-50"
        type="number"
        placeholder="Enter Game Score"
        min={0}
        max={300}
        value={gameScore}
        onChange={(e) => onGameChange(game, e.target.value)}
      ></Form.Control>
      
    </Form.Group>
  );
}

export default NewGameForm;

NewGameForm.propTypes = {
  game: PropTypes.number,
  onGameChange: PropTypes.func,
  gameScore: PropTypes.number,
  disabled: PropTypes.bool
};
