import React, { useState } from "react";
import UserKit from "../data/UserKit";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 60vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid whitesmoke;
  padding: 50px 80px;
`;

const ApplicationHeading = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 30px;
`;

const Paragraph = styled.p`
  color: white;
  text-align: center;
  margin-bottom: 60px;
  font-size: 23px;
  color:#364947;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  // background:slategrey;
`;

const Label = styled.label`
  font-size: 20px;
  color: whitesmoke;
  // font-family: tahoma;
`;

const InputField = styled.input`
width: 20vw;
height: 6vh;
border: none;
border-radius: 12pt;
padding-left: 12px;
outline:none;
opacity: 0.5;
`;

const LabelAndInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 8px 0;
`;

const RegisterBtn = styled.button`
border:none;
outline: none;
background:#364947;
width: 48vw;
height: 6vh;
margin-top: 20px;
border-radius: 12pt;
opacity: 0.9;
font-size: 18px;
color: whitesmoke;
cursor: pointer;

&:hover {
  background: #80BA7F;
  color:#364947;
}

`;

export default function RegisterForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationKind, setOrganisationKind] = useState("");

  const userKit = new UserKit();

  function handleRegister() {
    userKit.register(
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind
    );
  }

  function renderInput(index, placeholder, stateVariable, stateSetVariable) {
    return (
      <div key={index}>
        <LabelAndInput>
          <Label>{placeholder}:</Label>
          <InputField
            value={stateVariable}
            onChange={(e) => stateSetVariable(e.target.value)}
          />
        </LabelAndInput>
      </div>
    );
  }

  const inputObjects = [
    ["First Name", firstName, setFirstName],
    ["Last Name", lastName, setLastName],
    ["Email", email, setEmail],
    ["Password", password, setPassword],
    ["Organisation Name", organisationName, setOrganisationName],
    ["Organisation Kind (0,1,2)", organisationKind, setOrganisationKind],
  ];

  return (
    <Wrapper>
      <ApplicationHeading>Business Application</ApplicationHeading>
      <Paragraph>Create new account</Paragraph>
      <Form>
        {inputObjects.map((inputItem, index) => {
          return renderInput(index, inputItem[0], inputItem[1], inputItem[2]);
        })}
        <RegisterBtn onClick={handleRegister}>Register</RegisterBtn>
      </Form>
    </Wrapper>
  );
}
