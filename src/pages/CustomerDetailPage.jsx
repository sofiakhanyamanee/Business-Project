import React, { useState, useContext } from "react";
import { CustomerContext } from "../contexts/CustomerContext";
import UserKit from "../data/UserKit";
import { useHistory, Link } from "react-router-dom";
import styled from 'styled-components'

const Wrapper = styled.main`
width: 100vw;
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
  const { customerList } = useContext(CustomerContext);
  const customerID = props.match.params.id;

  const customer = customerList.find(
    (item) => item.id.toString() === customerID
  );

  const userKit = new UserKit();

  function handleDeleteCustomer() {
    userKit.deleteCustomer(customerID).then((res) => {
      console.log("Delete Status " + res.status);
      history.push("/home");
    });
  }

  function handleEditCustomer() {
    setToggleInput(true);
  }

  const [name, setName] = useState(customer.name);
  const [organisationNr, setOrganisationNr] = useState(customer.organisationNr);
  const [vatNr, setVatNr] = useState(customer.vatNr);
  const [reference, setReference] = useState(customer.reference);
  const [paymentTerm, setPaymentTerm] = useState(customer.paymentTerm);
  const [website, setWebsite] = useState(customer.website);
  const [email, setEmail] = useState(customer.email);
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);

  function showEditor() {
    if (toggleInput === true) {
      console.log("edit this shit");
      return (
        <FormBox>
          <InputField
            onChange={(e) => setName(e.target.value)}
            placeholder={customer.name}
          />
          <InputField
            onChange={(e) => setOrganisationNr(e.target.value)}
            placeholder={customer.organisationNr}
          />
          <InputField
            onChange={(e) => setVatNr(e.target.value)}
            placeholder={customer.vatNr}
          />
          <InputField
            onChange={(e) => setPaymentTerm(e.target.value)}
            placeholder={customer.paymentTerm}
          />
          <InputField
            onChange={(e) => setEmail(e.target.value)}
            placeholder={customer.email}
          />
          <InputField
            onChange={(e) => setReference(e.target.value)}
            placeholder={customer.reference}
          />
          <InputField
            onChange={(e) => setWebsite(e.target.value)}
            placeholder={customer.website}
          />
          <InputField
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={customer.phoneNumber}
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
      <Heading>{`${customer.name}`}</Heading>
      <Ul>
        <Li>{`OrgNr: ${customer.organisationNr}`}</Li>
        <Li>{`VatNr: ${customer.vatNr}`}</Li>
        <Li>{`PaymentTerm: ${customer.paymentTerm}`}</Li>
        <Li>{`Email: ${customer.email}`}</Li>
        <Li>{`Ref: ${customer.reference}`}</Li>
        <Li>{`Website: ${customer.website}`}</Li>
        <Li>{`Phone: ${customer.phoneNumber}`}</Li>
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
