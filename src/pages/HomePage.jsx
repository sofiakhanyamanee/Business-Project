import React, { useContext } from 'react'
import CreateCustomer from '../components/CreateCustomer'
import CustomerList from '../components/CustomerList'
import { CustomerContext } from '../contexts/CustomerContext'
import UserKit from '../data/UserKit'

export default function HomePage() {

  const {customerList, setCustomerList} = useContext(CustomerContext)

  const userKit = new UserKit();

  function fetchCustomers() {
    userKit.getCustomerList()
    .then(res => res.json())
    .then(data => {
      // console.log(data.results)
      setCustomerList(data.results)
    })
  }

  return (
    <div value={{customerList, setCustomerList}}>
      <CustomerList fetchCustomers={fetchCustomers}/>
      <CreateCustomer fetchCustomers={fetchCustomers}/>
    </div>
  )
}
