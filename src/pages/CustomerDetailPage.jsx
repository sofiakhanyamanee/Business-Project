import React, { useState, useEffect } from "react";
import UserKit from "../data/UserKit";
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components'
import { useForm } from 'react-hook-form'

const Wrapper = styled.main`
width: 10vw;
height: 100vh;
display: flex;
justify-content: center;
align-items: center;

& a {
  position:absolute;
  top: 20px;
  left: 20px;
  color: whitesmoke;
  border: 1px solid whitesmoke;
  border-radius: 12pt;
  text-decoration: none;
  padding: 10px;
  
    &:hover {
      background:#364947;
      color: white:smoke;
      border: none;
    }
}
`

const Heading = styled.h1`
padding: 8px 0;
font-weight: 300;
`

const Container = styled.div`
width: 40vw;
height: 40vh;
background: whitesmoke;
color:#364947;
padding: 25px;
border-radius: 12pt;
opacity: 0.8;
`
const Ul = styled.ul`
`

const Li = styled.li`
color: #364947;
list-style-type: none;
padding: 4px 0;
`

const ButtonBox = styled.div`
width: 100%;
backgorund:orange;
display: flex;
justify-content: center;
align-items: center;
`

const Button = styled.button`
border:none;
border: 1px solid #364947;
outline: none;
background: whitesmoke;
width: 15vw;
height: 5vh;
margin-top: 20px;
border-radius: 12pt;
opacity: 0.9;
font-size: 15px;
color: #364947;
margin-right: 10px;

&:hover {
  background:#364947;
  color:whitesmoke;
}
`

const FormBtns = styled(Button)`
border: none;
`

const FormBox = styled.form`
text-align: center;
margin-left: 80px;
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


export default function CustomerDetailPage(props) {
  const history = useHistory();
  const [toggleInput, setToggleInput] = useState(false);
  const [customerDetail, setCustomerDetail] = useState([])
  const id = props.match.params.id;
  const userKit = new UserKit();
  const { register, handleSubmit, errors } = useForm();

  function handleDeleteCustomer() {
    userKit.deleteCustomer(id).then((res) => {
      console.log("Delete Status " + res.status);
      history.push("/home");
    });
  }

  useEffect(() => {
    fetchCustomerDetails()
  }, [])


  function fetchCustomerDetails() {
    userKit.getCustomerDetails(id)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setCustomerDetail(data);
    })
  }

  
  function handleEditCustomer() {
    setToggleInput(true);
  }


  function editInfo(data) {
    userKit.editCustomer(id, data)
      .then(() => {
        fetchCustomerDetails()
        alert("Your info has being updated!")
        setToggleInput(false)
        // history.push("/home");
      });
  }

  function showEditor() {
    if (toggleInput === true) {
      console.log("edit this shit");
      return (
        <FormBox onSubmit={handleSubmit(editInfo)}>
          <InputField ref={register({required:true})} name="name" type="text" defaultValue={customerDetail.name}></InputField>
          <InputField ref={register({required:true})} name="organisationNr" type="text" defaultValue={customerDetail.organisationNr}></InputField>
          <InputField ref={register({required:true, pattern: {value: /^SE[0-9]{10}$/g}, minLength: 12, maxLength:12,})}  name="vatNr" type="text" defaultValue={customerDetail.vatNr}></InputField>
          {errors.vatNr && errors.vatNr.type === "pattern" && (<p>- Vat number must start with "SE" + 10 numbers</p>)}
          {errors.vatNr && errors.vatNr.type === "minLength" && (<p>- Vat number must contain 12 letters</p>)}
          {errors.vatNr && errors.vatNr.type === "maxLength" && (<p>- Vat number can not contain more than 12 letters</p>)}
          <InputField ref={register({required:true, minLength: 1})} name="paymentTerm" type="number" defaultValue={customerDetail.paymentTerm}></InputField>
          {errors.paymentTerm && errors.paymentTerm.type === "minLength" && (<p>- Payment term shall contain a number</p>)}
          <InputField ref={register({required:true})} name="email" type="email" defaultValue={customerDetail.email}></InputField>
          <InputField ref={register({required:true})} name="reference" type="text" defaultValue={customerDetail.reference}></InputField>
          <InputField ref={register({required:true})} name="website" type="text" defaultValue={customerDetail.website}></InputField>
          <InputField ref={register({required:true})} name="phoneNumber" type="text" defaultValue={customerDetail.phoneNumber}></InputField>
          <FormBtns>Save changes</FormBtns>
          <FormBtns onClick={() => setToggleInput(false)}>Cancel</FormBtns>
        </FormBox>
      );
    }
  }


  return (
    <Wrapper>
      <Link to="/home">Back to startpage</Link>
      <Container>
      <Heading>{`${customerDetail.name}`}</Heading>
      <Ul>
        <Li>{`OrgNr: ${customerDetail.organisationNr}`}</Li>
        <Li>{`VatNr: ${customerDetail.vatNr}`}</Li>
        <Li>{`PaymentTerm: ${customerDetail.paymentTerm}`}</Li>
        <Li>{`Email: ${customerDetail.email}`}</Li>
        <Li>{`Ref: ${customerDetail.reference}`}</Li>
        <Li>{`Website: ${customerDetail.website}`}</Li>
        <Li>{`Phone: ${customerDetail.phoneNumber}`}</Li>
      </Ul>
      <ButtonBox>
      <Button onClick={handleEditCustomer}>Edit</Button>
      <Button delete onClick={handleDeleteCustomer}>Delete customer</Button>
      </ButtonBox>
      </Container>
      {showEditor()}
    </Wrapper>
  );
}
