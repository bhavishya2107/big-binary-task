import React from "react";
import { Form } from "react-bootstrap";

const FilterBySuccessFailure = ({ setCurrentLaunch }) => {
  return (
    <div>
      <p>Filter Success/Failed:</p>
      <Form.Group>
        <Form.Control
          as="select"
          onChange={(e) => {
            setCurrentLaunch(e.target.value);
          }}
          size="sm"
        >
          <option value="all">-- Filter on Sucess/Failure --</option>
          <option value="success">Successful Launches</option>
          <option value="fail">Failed Launches</option>
        </Form.Control>
        <br />
      </Form.Group>
    </div>
  );
};

export default FilterBySuccessFailure;
