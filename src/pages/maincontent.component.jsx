import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";

import LaborContext from "../context/laborContext";
import TableList from "../components/tablelist.component";

const MainContent = () => {
  const [userHour, setUserHour] = useState({});
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  // component did mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/laborInfo/12341234")
      .then((res) => {
        setUserHour(res.data);
        setLoad(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoad(true);
      });
    return () => null;
  }, []);

  if (load) {
    return (
      <>
        {error ? (
          <div>{error.message}</div>
        ) : (
          <Row>
            <Col md={12}>
              <LaborContext.Provider value={[userHour, setUserHour]}>
                <TableList />
              </LaborContext.Provider>
            </Col>
          </Row>
        )}
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
};

export default MainContent;
