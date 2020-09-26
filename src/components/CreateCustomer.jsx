import React, { useEffect } from "react";
import UserKit from "../data/UserKit";
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Paragraph = styled.p`
font-size: 22px;
margin 20px 0;
text-shadow: 0 0.6px 0 rgba(255, 255, 255, 0.4);
width: 100%;
text-align: center;
`

const Form = styled.form`
width: 100%;
`

const InputBox = styled.div`
display: flex;
flex-flow: wrap;
justify-content: space-between;
align-items: center;
width: 100%;
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
const BtnBox = styled.div`
display: flex;
justify-content: center;
width: 100%;
`

const CreateBtn = styled.button`
border:none;
outline: none;
background: whitesmoke;
width: 15vw;
height: 5vh;
margin-top: 10px;
border-radius: 12pt;
opacity: 0.9;
font-size: 15px;
color: #364947;
display: block;

&:hover {
  background:#364947;
  color:whitesmoke;
}
`
const ErrorBox = styled.div`
display: flex;
flex-direction: column;
align-items:center;
margin: 10px 0;
text-align: left;
`

const ErrorMsg = styled.p`
color: whitesmoke;
`

export default function CreateCustomer({ fetchCustomers }) {
  const userKit = new UserKit();
  const { register, handleSubmit, errors } = useForm();


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
      <InputBox>
        <InputField ref={register({required:true})} name="name" type="text" placeholder="Customer name"></InputField> 
        <InputField ref={register({required:true})} name="organisationNr" type="text" placeholder="Organisation number"></InputField>    
        <InputField ref={register({required:true, pattern: {value: /^SE[0-9]{10}$/g}, minLength: 12, maxLength:12,})} name="vatNr" type="text" placeholder="VAT-number"></InputField>
        <InputField ref={register({required:true})} name="reference" type="text" placeholder="Reference"></InputField>
        <InputField ref={register({required:true, minLength: 1})} name="paymentTerm" type="number" placeholder="Payment term"></InputField>
        <InputField ref={register({required:true})} name="website" type="text" placeholder="Website"></InputField>
        <InputField ref={register({required:true})} name="email" type="email" placeholder="Email"></InputField>
        <InputField ref={register({required:true})} name="phoneNumber" type="text" placeholder="Phone number"></InputField>
      </InputBox>
      <ErrorBox>
        {errors.name && errors.name.type === "required" && (<ErrorMsg>- Please enter customer name</ErrorMsg>)}
        {errors.organisationNr && errors.organisationNr.type === "required" && (<ErrorMsg>- Please enter organisation number</ErrorMsg>)}
        {errors.vatNr && errors.vatNr.type === "required" && (<ErrorMsg>- Please enter vat number</ErrorMsg>)}
        {errors.vatNr && errors.vatNr.type === "pattern" && (<ErrorMsg>- Vat number must start with "SE" + 10 numbers</ErrorMsg>)}
        {errors.vatNr && errors.vatNr.type === "minLength" && (<ErrorMsg>- Vat number must be 12 letters</ErrorMsg>)}
        {errors.vatNr && errors.vatNr.type === "maxLength" && (<ErrorMsg>- Vat number must be 12 letters</ErrorMsg>)}
        {errors.reference && errors.reference.type === "required" && (<ErrorMsg>- Please enter reference</ErrorMsg>)}
        {errors.paymentTerm && errors.paymentTerm.type === "required" && (<ErrorMsg>- Please enter payment term</ErrorMsg>)}
        {errors.paymentTerm && errors.paymentTerm.type === "minLength" && (<ErrorMsg>- Payment term shall contain a number</ErrorMsg>)}
        {errors.website && errors.website.type === "required" && (<ErrorMsg>- Please enter website</ErrorMsg>)}
        {errors.email && errors.email.type === "required" && (<ErrorMsg>- Please enter email</ErrorMsg>)}
        {errors.phoneNumber && errors.phoneNumber.type === "required" && (<ErrorMsg>- Please enter phone number</ErrorMsg>)}
      </ErrorBox>
       <BtnBox>
      <CreateBtn>Create customer</CreateBtn>
      </BtnBox>
    </Form>

    </>
  );
}
