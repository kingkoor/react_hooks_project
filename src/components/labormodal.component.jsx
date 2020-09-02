import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form, FormGroup } from "react-bootstrap";
import LaborContext from "../context/laborContext";
import all_labor_code from "../assets/complete_data.json";

const LaborModal = () => {
  const { hour_lab, show_l } = useContext(LaborContext);
  const [userHour, setUserHour] = hour_lab;
  const [show, setShow] = show_l;

  const [checkboxes, setCheckBoxes] = useState([]);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // component did mount
  useEffect(() => {
    let labor_code = all_labor_code.filter(
      (rest_labor_code) =>
        !userHour.time_info.some(
          (user_code) => user_code.id === rest_labor_code.id
        )
    );
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
                  // onChange={(e) =>
                  //   handleSelection({
                  //     id: item.id,
                  //     project: item.project,
                  //     hours: 0,
                  //     checked: e.currentTarget.checked,
                  //   })
                  // }
                />
              ))}
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            // onClick={() => {
            //   this.props.handleSubmit({ items: this.state.selected_codes });
            //   handleClose;
            // }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LaborModal;
