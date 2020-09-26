import React, { useState } from "react";
import UserKit from "../data/UserKit";
import styled from "styled-components";
import { useHistory } from 'react-router-dom'

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
  margin-bottom: 30px;
  font-size: 23px;
  color:#364947;
`;

const Form = styled.div`
  display: flex;
  // flex-direction: column;
  display: block;
  width: 80%;
  // background:slategrey;
`;

const InputField = styled.input`
width: 20vw;
height: 6vh;
border: none;
border-radius: 12pt;
padding-left: 12px;
outline:none;
opacity: 0.5;
margin: 10px 20px;
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
  const history = useHistory();

  function handleRegister() {
    userKit.register(
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind
    );
      history.push("/activate-user")
  }


  return (
    <Wrapper>
      <ApplicationHeading>Business Application</ApplicationHeading>
      <Paragraph>Create new account</Paragraph>
      <Form>
      <InputField
        type="text"
        placeholder="Firstname"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      ></InputField>
      <InputField
        type="text"
        placeholder="Lastname"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      ></InputField>
        <InputField
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></InputField>
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></InputField>
      <InputField
        type="text"
        placeholder="Organisation name"
        value={organisationName}
        onChange={(e) => setOrganisationName(e.target.value)}
      ></InputField>
      <InputField
        type="text"
        placeholder="Organisation kind (0, 1, 2)"
        value={organisationKind}
        onChange={(e) => setOrganisationKind(e.target.value)}
      ></InputField>
        <RegisterBtn onClick={handleRegister}>Register</RegisterBtn>
      </Form>
    </Wrapper>
  );
}
