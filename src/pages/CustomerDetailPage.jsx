import React, { useContext } from "react";
import { CustomerContext } from "../contexts/CustomerContext";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";

export default function CustomerDetailPage(props) {
  const history = useHistory();
  const { customerList } = useContext(CustomerContext);

  const customerID = props.match.params.id;

  const customer = customerList.find(
    (item) => item.id.toString() === customerID
  );

  const userKit = new UserKit();

  function handleDeleteCustomer() {
    userKit.deleteCustomer(customerID).then((res) => {
      console.log("status " + res.status);
      history.push("/home");
    });
  }

  return (
    <div>
      <h1>{`Kund: ${customer.name}`}</h1>
      <p>{`Id: ${customer.id}`}</p>
      <button onClick={handleDeleteCustomer}>DELETE CUSTOMER</button>
    </div>
  );
}
