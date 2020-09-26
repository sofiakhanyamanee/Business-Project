import React, { useState } from "react";
import UserKit from "../data/UserKit";
import styled from 'styled-components'

const Paragraph = styled.p`
font-size: 22px;
margin 20px 0;
text-shadow: 0 0.6px 0 rgba(255, 255, 255, 0.4)
`

const Form = styled.div`
// background: orange;
width: 100%;
text-align: center;
margin: 150px 0;
`

const InputField = styled.input`
width: 20vw;
height: 6vh;
margin: 5px;
border: none;
border-radius: 12pt;
padding-left: 12px;
outline:none;
opacity: 0.5;
`

const CreateBtn = styled.button`
border:none;
outline: none;
background: whitesmoke;
width: 15vw;
height: 5vh;
margin-top: 20px;
border-radius: 12pt;
opacity: 0.9;
font-size: 15px;
color: #364947;

&:hover {
  background:#364947;
  color:whitesmoke;
}
`

export default function CreateCustomer({ fetchCustomers }) {
  const [name, setName] = useState("");
  const [organisationNr, setOrganisationNr] = useState("");
  const [vatNr, setVatNr] = useState("");
  const [reference, setReference] = useState("");
  const [paymentTerm, setPaymentTerm] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const userKit = new UserKit();

  function handleCreateCustomer() {
    const payload = {
      name,
      organisationNr,
      vatNr,
      reference,
      paymentTerm,
      website,
      email,
      phoneNumber,
    };
    userKit
      .createCustomer(payload)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        fetchCustomers();
      });
  }

  return (
    <Form>
      <Paragraph>Create new customer</Paragraph>
      <InputField
        type="text"
        placeholder="Customer name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></InputField>
      <InputField
        type="text"
        placeholder="Organisation number"
        value={organisationNr}
        onChange={(e) => setOrganisationNr(e.target.value)}
      ></InputField>
      <InputField
        type="text"
        placeholder="VAT-number"
        value={vatNr}
        onChange={(e) => setVatNr(e.target.value)}
      ></InputField>
      <InputField
        type="text"
        placeholder="Reference"
        value={reference}
        onChange={(e) => setReference(e.target.value)}
      ></InputField>
      <InputField
        type="text"
        placeholder="Payment term"
        value={paymentTerm}
        onChange={(e) => setPaymentTerm(e.target.value)}
      ></InputField>
      <InputField
        type="text"
        placeholder="Website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
      ></InputField>
      <InputField
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></InputField>
      <InputField
        type="text"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      ></InputField>
      <div>
      <CreateBtn onClick={handleCreateCustomer}>Create customer</CreateBtn>
      </div>
  
    </Form>
  );
}
