import React, { useContext } from "react";
import { Table, Button, Card } from "react-bootstrap";
import moment from "moment";
import LaborContext from "../context/laborContext";
import LaborModal from "./labormodal.component";
import Axios from "axios";

const TableList = () => {
  // const [userHour, setUserHour] = useContext(LaborContext);
  const { hour_lab, show_l } = useContext(LaborContext);
  const [userHour, setUserHour] = hour_lab;
  const [show, setShow] = show_l;

  // delete function
  const delteItem = (itemId) => {
    let update_work_list = userHour.time_info.filter((el) => el.id !== itemId);
    update_work_list = calculate_percent(update_work_list);

    setUserHour({ ...userHour, time_info: update_work_list });
  };

  const calculate_percent = (hourList) => {
    let sum_hour = hourList.reduce((total, element) => {
      return total + parseInt(element.hours);
    }, 0);

    // adding percentage field to each recode
    let update_percent = hourList.map((element) => {
      element.percent = ((element.hours / sum_hour) * 100).toFixed(2);
      return element;
    });

    return update_percent;
  };

  const handleBlur = (e) => {
    // console.log(e.target.value);
    let modified_item = userHour.time_info.map((el) => {
      if (el.id === e.id) {
        el.hours = e.hours;
      }
      return el;
    });
    modified_item = calculate_percent(modified_item);
    setUserHour({ ...userHour, time_info: modified_item });
    // setUserHour({ time_info: modified_item });
  };

  const renderLaborAllocation = (laborAllocation, index) => {
    // console.log("inside", laborAllocation);
    return (
      <tr key={index}>
        <td>{laborAllocation.project}</td>
        <td>
          {/* <input
            type="text"
            value={laborAllocation.hours}
            onBlur={(e) => {
              handleBlur({
                id: laborAllocation.id,
                hours: e.target.value,
              });
            }}
            size="4"
          /> */}
          <textarea
            resize="none"
            defaultValue={laborAllocation.hours}
            rows="1"
            cols="5"
            onBlur={(e) => {
              handleBlur({
                id: laborAllocation.id,
                hours: e.target.value,
              });
            }}
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

  const handleShowModal = () => {
    setShow(true);
  };

  const handleSubmit = () => {
    console.log("entry", userHour.entry_id);
    console.log("data", userHour);

    if (userHour.entry_id) {
      const url = `http://localhost:5000/laborInfo/${userHour.entry_id}`;
      const time_entry = {
        staff_id: userHour.staff_id,
        time_info: JSON.stringify(userHour.time_info),
      };

      Axios.put(url, time_entry)
        .then((res) => {
          //handle your login
          setUserHour(res.data);
          console.log(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    }
    // else {
    //   const time_entry = {
    //     staff_id: "12341234",
    //     staff_name: "Andrew Young",
    //     time_info: JSON.stringify(this.state.userLaborAllocation),
    //     periodid: "3",
    //   };
    // }
  };

  return (
    <>
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
            <tfoot>
              <tr>
                <td colSpan="2">
                  {" "}
                  <Button
                    variant="secondary"
                    size="lg"
                    block
                    onClick={handleShowModal}
                  >
                    <i className="fas fa-plus mr-2"></i>Add Labor Allocation
                    Code
                  </Button>
                </td>
                <td colSpan="2">
                  <Button size="lg" block onClick={handleSubmit}>
                    Submit
                  </Button>
                </td>
              </tr>
              {userHour["submitted_time"] && userHour["time_info"] !== null ? (
                <tr>
                  <td colSpan="4">
                    Last Update:{" "}
                    {moment(userHour["submitted_time"]).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="4">No entry made this pay period</td>
                </tr>
              )}
            </tfoot>
          </Table>
        </Card.Body>
      </Card>

      <LaborModal show={show} />
    </>
  );
};

export default TableList;
