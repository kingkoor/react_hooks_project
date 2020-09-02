import React, { useContext } from "react";
import { Table, Button, Card } from "react-bootstrap";
import moment from "moment";
import LaborContext from "../context/laborContext";

const TableList = () => {
  const [userHour, setUserHour] = useContext(LaborContext);

  const delteItem = (itemId) => {
    const update_work_list = userHour.time_info.filter(
      (el) => el.id !== itemId
    );
    setUserHour({ time_info: update_work_list });
  };

  const handleChange = (e) => {
    console.log(e);
  };

  const renderLaborAllocation = (laborAllocation, index) => {
    console.log("inside", laborAllocation);
    return (
      <tr key={index}>
        <td>{laborAllocation.project}</td>
        <td>
          <input
            type="text"
            size="5"
            value={laborAllocation.percent}
            autoFocus="autofocus"
            onChange={handleChange}
          />
        </td>
        <td>{laborAllocation.percent}</td>
        <td>
          <Button
            variant="danger"
            onClick={() => delteItem(laborAllocation.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  };

  return (
    <Card>
      <Card.Header>
        Week: {moment(userHour["p_start_date"]).format("LL")} -{" "}
        {moment(userHour["p_end_date"]).format("LL")}
      </Card.Header>
      <Card.Body>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Labor Allocation</th>
              <th>Hours</th>
              <th>Percentage</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {userHour["time_info"] && userHour["time_info"].length > 0 ? (
              userHour["time_info"].map(renderLaborAllocation)
            ) : (
              <tr>
                <td colSpan="4">No Record</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export default TableList;
