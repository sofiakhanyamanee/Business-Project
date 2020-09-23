import React, { useState } from "react";
import UserKit from "../data/UserKit";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 60vw;
  // background: coral;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  color: white;
  text-align: center;
  margin-bottom: 100px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  // background:slategrey;
  font-size: 22px;
`;

const Label = styled.label`
  color: whitesmoke;
`;

const InputField = styled.input`
  font-size: 22px;
  border: none;
  background: transparent;
  color: whitesmoke;
  border-bottom: 1px solid white;
  width: 50%;
`;

const LabelAndInput = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`;

const RegisterBtn = styled.button`
  margin-top: 35px;
  padding: 10px 0;
  border: none;
  border-radius: 8pt;
  font-size: 20px;
  outline: none;
  cursor: pointer;
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
      <Heading>Register</Heading>
      <Form>
        {inputObjects.map((inputItem, index) => {
          return renderInput(index, inputItem[0], inputItem[1], inputItem[2]);
        })}
        <RegisterBtn onClick={handleRegister}>Register</RegisterBtn>
      </Form>
    </Wrapper>
  );
}
