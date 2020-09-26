import React, { useEffect } from "react";
import UserKit from "../data/UserKit";
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Paragraph = styled.p`
font-size: 22px;
margin 20px 0;
text-shadow: 0 0.6px 0 rgba(255, 255, 255, 0.4)
`

const Form = styled.form`
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
  const userKit = new UserKit();
  const { register, handleSubmit } = useForm();


  function handleCreateCustomer(data) {
      userKit.createCustomer(data)
      .then(res => res.json())
      .then(data => {
      console.log(data)
      fetchCustomers()
      })

  }

  useEffect(() => {
    handleCreateCustomer()
  }, [])

  return (
    <>
    <Form onSubmit={handleSubmit(handleCreateCustomer)}>
      <Paragraph>Create new customer</Paragraph>
      <InputField ref={register({required:true})} name="name" type="text" placeholder="Customer name"></InputField>
      <InputField ref={register({required:true})} name="organisationNr" type="text" placeholder="Organisation number"></InputField>
      <InputField ref={register({required:true})} name="vatNr" type="text" placeholder="VAT-number"></InputField>
      <InputField ref={register({required:true})} name="reference" type="text" placeholder="Reference"></InputField>
      <InputField ref={register({required:true})} name="paymentTerm" type="text" placeholder="Payment term"></InputField>
      <InputField ref={register({required:true})} name="website" type="text" placeholder="Website"></InputField>
      <InputField ref={register({required:true})} name="email" type="email" placeholder="Email"></InputField>
      <InputField ref={register({required:true})} name="phoneNumber" type="text" placeholder="Phone number"></InputField>
       <div>
      <CreateBtn>Create customer</CreateBtn>
      </div>
    </Form>
    </>
  );
}
