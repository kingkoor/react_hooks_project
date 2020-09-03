import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, FormGroup } from "react-bootstrap";
import LaborContext from "../context/laborContext";
import all_labor_code from "../assets/complete_data.json";

const LaborModal = () => {
  const { hour_lab, show_l } = useContext(LaborContext);
  const [userHour, setUserHour] = hour_lab;
  const [show, setShow] = show_l;

  const [checkboxes, setCheckBoxes] = useState([]);
  const [selectedCode, setSelectedCode] = useState([]);

  const handleClose = () => {
    setShow(false);
    setSelectedCode([]);
  };

  const handleSelection = (item) => {
    // console.log(item);
    if (item.checked) {
      if (!selectedCode.some((code) => code.id === item.id)) {
        console.log("In the list");
        setSelectedCode([...selectedCode, item]);
      }
    }
    //else if removed
    else {
      if (selectedCode.some((code) => code.id === item.id)) {
        const modified = selectedCode.filter((el) => {
          return el.id !== item.id;
        });
        setSelectedCode(modified);
      }
    }
  };

  const handleAdd = () => {
    let current_laborCodes = [];

    if (userHour.time_info) {
      current_laborCodes = userHour.time_info;
    }

    selectedCode.forEach(function (element) {
      // delete the checked property to match the state array format
      delete element.checked;
      //add default 0 as percent
      element["percent"] = 0;
      // add the item to the local variable array list
      current_laborCodes = [...current_laborCodes, element];
    });

    console.log("new list", current_laborCodes);
    setSelectedCode([]);
    console.log(userHour);

    setUserHour({ ...userHour, time_info: current_laborCodes });
    // setUserHour({ time_info: update_work_list });
    // setUserHour({ time_info: current_laborCodes });
    // update the state
    // this.setState((prevState) => ({ userLaborAllocation: current_laborCodes }));
    setShow(false);
  };

  // component did mount
  useEffect(() => {
    let labor_code;
    if (userHour.time_info) {
      labor_code = all_labor_code.filter(
        (rest_labor_code) =>
          !userHour.time_info.some(
            (user_code) => user_code.id === rest_labor_code.id
          )
      );
    } else {
      labor_code = all_labor_code;
    }

    // adding checked element to the each available code
    labor_code = labor_code.map((element) => {
      element.isChecked = false;
      return element;
    });
    setCheckBoxes(labor_code);
    return () => null;
  }, [userHour]);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false} centered>
        <Modal.Header closeButton>
          <Modal.Title>Labor Allocation Code</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <FormGroup>
              {checkboxes.map((item, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={item.project}
                  onChange={(e) =>
                    handleSelection({
                      id: item.id,
                      project: item.project,
                      hours: 0,
                      checked: e.currentTarget.checked,
                    })
                  }
                />
              ))}
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LaborModal;
