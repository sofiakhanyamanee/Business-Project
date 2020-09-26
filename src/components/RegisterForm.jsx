import React from "react";
import UserKit from "../data/UserKit";
import styled from "styled-components";
import { useHistory } from 'react-router-dom'
import { useForm } from "react-hook-form";

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

const Form = styled.form`
  display: flex;
  flex-flow: wrap;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const InputField = styled.input`
width: 20vw;
height: 6vh;
border: none;
border-radius: 12pt;
padding: 0 12px;
outline:none;
opacity: 0.5;
margin: 15px 0;
`;

const BtnBox = styled.div`
display: flex;
justify-content: center;
width: 100%;
`

const RegisterBtn = styled.button`
border:none;
outline: none;
background:#364947;
width: 20vw;
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

  const { register, handleSubmit, errors } = useForm();

  const userKit = new UserKit();
  const history = useHistory();

  function handleRegister(data) {
    console.log(data)
    userKit.register(
      data
    );
      history.push("/activate-user")
  }

  return (
    <Wrapper>
      <ApplicationHeading>Business Application</ApplicationHeading>
      <Paragraph>Create new account</Paragraph>
      <Form onSubmit={handleSubmit(handleRegister)}>
        <InputField ref={register({required:true})} name="firstName" type="text" placeholder="Firstname"></InputField>
        {errors.firstName && errors.firstName.type === "required" && (<p>* required</p>)}
        <InputField ref={register({required:true})} name="lastName" type="text" placeholder="Lastname"></InputField>
        {errors.lastName && errors.lastName.type === "required" && (<p>* required</p>)}
        <InputField ref={register({required:true})} name="email" type="email" placeholder="Email"></InputField>
        {errors.email && errors.email.type === "required" && (<p>* required</p>)}
        <InputField ref={register({required:true})} name="password" type="password" placeholder="Password"></InputField>
        {errors.password && errors.password.type === "required" && (<p>* required</p>)}
        <InputField ref={register({required:true})} name="organisationName" type="text" placeholder="Organisation name"></InputField>
        {errors.organisationName && errors.organisationName.type === "required" && (<p>* required</p>)}
        <InputField  ref={register({required:true})} name="organisationKind"type="number" placeholder="Organisation kind (0, 1, 2)"></InputField>
        {errors.organisationKind && errors.organisationKind.type === "required" && (<p>* required</p>)}
        <BtnBox>
        <RegisterBtn>Register</RegisterBtn>
        </BtnBox>
      </Form>
    </Wrapper>
  );
}
