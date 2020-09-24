import React, { useState, useContext } from "react";
import { CustomerContext } from "../contexts/CustomerContext";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";

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
        <div>
          <p>time to ediiit</p>
          <input
            onChange={(e) => setName(e.target.value)}
            placeholder={customer.name}
          />
          <input
            onChange={(e) => setOrganisationNr(e.target.value)}
            placeholder={customer.organisationNr}
          />
          <input
            onChange={(e) => setVatNr(e.target.value)}
            placeholder={customer.vatNr}
          />
          <input
            onChange={(e) => setPaymentTerm(e.target.value)}
            placeholder={customer.paymentTerm}
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder={customer.email}
          />
          <input
            onChange={(e) => setReference(e.target.value)}
            placeholder={customer.reference}
          />
          <input
            onChange={(e) => setWebsite(e.target.value)}
            placeholder={customer.website}
          />
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder={customer.phoneNumber}
          />
          <button onClick={() => setToggleInput(false)}>Cancel</button>
          <button onClick={editInfo}>Save changes</button>
        </div>
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

  // useEffect(() => {
  //   editInfo();
  // }, []);

  return (
    <div>
      <h1>{`Kund: ${customer.name}`}</h1>
      <ul>
        <li>{`OrgNr: ${customer.organisationNr}`}</li>
        <li>{`VatNr: ${customer.vatNr}`}</li>
        <li>{`PaymentTerm: ${customer.paymentTerm}`}</li>
        <li>{`Email: ${customer.email}`}</li>
        <li>{`Ref: ${customer.reference}`}</li>
        <li>{`Website: ${customer.website}`}</li>
        <li>{`Phone: ${customer.phoneNumber}`}</li>
      </ul>
      <button onClick={handleDeleteCustomer}>DELETE CUSTOMER</button>
      <button onClick={handleEditCustomer}>EDIT</button>
      {showEditor()}
    </div>
  );
}
