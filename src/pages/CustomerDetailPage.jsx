import React, { useState, useContext, useEffect } from "react";
import { CustomerContext } from "../contexts/CustomerContext";
import UserKit from "../data/UserKit";
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components'

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

const FormBox = styled.div`
width: 50vw;
text-align: center;
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
  const customerID = props.match.params.id;
  const userKit = new UserKit();

  function handleDeleteCustomer() {
    userKit.deleteCustomer(customerID).then((res) => {
      console.log("Delete Status " + res.status);
      history.push("/home");
    });
  }

  useEffect(() => {
    fetchCustomerDetails()
  }, [])


  function fetchCustomerDetails() {
    userKit.getCustomerDetails(customerID)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setCustomerDetail(data);
    })
  }

  
  function handleEditCustomer() {
    setToggleInput(true);
  }

  const [name, setName] = useState(customerDetail.name);
  const [organisationNr, setOrganisationNr] = useState(customerDetail.organisationNr);
  const [vatNr, setVatNr] = useState(customerDetail.vatNr);
  const [reference, setReference] = useState(customerDetail.reference);
  const [paymentTerm, setPaymentTerm] = useState(customerDetail.paymentTerm);
  const [website, setWebsite] = useState(customerDetail.website);
  const [email, setEmail] = useState(customerDetail.email);
  const [phoneNumber, setPhoneNumber] = useState(customerDetail.phoneNumber);

  function showEditor() {
    if (toggleInput === true) {
      console.log("edit this shit");
      return (
        <FormBox>
          <InputField
            onChange={(e) => setName(e.target.value)}
            placeholder={customerDetail.name}
          />
          <InputField
            onChange={(e) => setOrganisationNr(e.target.value)}
            placeholder={customerDetail.organisationNr}
          />
          <InputField
            onChange={(e) => setVatNr(e.target.value)}
            placeholder={customerDetail.vatNr}
          />
          <InputField
            onChange={(e) => setPaymentTerm(e.target.value)}
            placeholder={customerDetail.paymentTerm}
          />
          <InputField
            onChange={(e) => setEmail(e.target.value)}
            placeholder={customerDetail.email}
          />
          <InputField
            onChange={(e) => setReference(e.target.value)}
            placeholder={customerDetail.reference}
          />
          <InputField
            onChange={(e) => setWebsite(e.target.value)}
            placeholder={customerDetail.website}
          />
          <InputField
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={customerDetail.phoneNumber}
          />
          <FormBtns onClick={() => setToggleInput(false)}>Cancel</FormBtns>
          <FormBtns onClick={editInfo}>Save changes</FormBtns>
        </FormBox>
      );
    }
  }

  function editInfo() {
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
    console.log("ID" + customerID);
    userKit
      .editCustomer(customerID, payload)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        alert("Your info has being updated!")
        history.push("/home");
      });
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
