import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Container, Alert } from 'react-bootstrap';

const MerchantForm = () => {
  const baseURL = "http://localhost:5052/api/merchant";
  const navigate = useNavigate();
  const [enteredfullName, setName] = useState('');
  const [enteredbankName, setBank] = useState('');
  const [enteredaccountNumber, setAccountNumber] = useState('');
  const [enteredswiftCode, setSwiftCode] = useState('');
  const [enteredbalance, setEnteredbalance] = useState('');


  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };

  const bankChangeHandler = (event) => {
    setBank(event.target.value);
  };

  const accountNumberChangeHandler = (event) => {
    setAccountNumber(event.target.value);
  };

  const swiftCodeChangeHandler = (event) => {
    setSwiftCode(event.target.value);
  };
  const balanceChangeHandler = (event) => {
    setEnteredbalance(event.target.value);
  };


  const submitActionHandler = (event) => {
    event.preventDefault();
    axios
      .post(baseURL, {
        "name": enteredfullName,
        "bankName": enteredbankName,
        "accountNumber": enteredaccountNumber,
        "swiftCode": enteredswiftCode,
        "balance": enteredbalance
      })
      .then((response) => {
        alert("Employee " + enteredfullName + " added!");
        navigate("/read");
      }).catch(error => {
        alert("error===" + error);
      });

  };

  const cancelHandler = () => {
    //reset the values of input fields
    setName("");
    setBank("");
    setAccountNumber("");
    setSwiftCode("");
    setEnteredbalance("");
    navigate("/read");

  }
  return (
    <Alert variant='primary'>
      <Container>
        <Form onSubmit={submitActionHandler}>
          <Form.Group controlId="form.Name">
            <Form.Label>fullName</Form.Label>
            <Form.Control type="text" value={enteredfullName} onChange={nameChangeHandler} placeholder="fullName" required />
          </Form.Group>
          <Form.Group controlId="form.Role">
            <Form.Label>bankName</Form.Label>
            <Form.Control type="text" value={enteredbankName} onChange={bankChangeHandler} placeholder="Enter bankName" required />
          </Form.Group>
          <Form.Group controlId="form.Name">
            <Form.Label>accountNumber</Form.Label>
            <Form.Control type="text" value={enteredaccountNumber} onChange={accountNumberChangeHandler} placeholder="Enter accountNumber" required />
          </Form.Group>
          <Form.Group controlId="form.Role">
            <Form.Label>swiftCode</Form.Label>
            <Form.Control type="text" value={enteredswiftCode} onChange={swiftCodeChangeHandler} placeholder="Enter swiftCode" required />
          </Form.Group><Form.Group controlId="form.Name">
            <Form.Label>balance</Form.Label>
            <Form.Control type="text" value={enteredbalance} onChange={balanceChangeHandler} placeholder="Enter balance" required />
          </Form.Group>
          <br></br>
          <Button type='submit'>Add Merchant</Button>
          &nbsp;&nbsp;&nbsp;
          <Button type='submit' onClick={() => cancelHandler()}>Cancel</Button>
        </Form>

      </Container>
    </Alert>

  );
}
export default MerchantForm;