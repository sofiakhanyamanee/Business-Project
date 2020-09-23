import React, { useState, useContext, useEffect } from 'react'
import CreateCustomer from '../components/CreateCustomer'
import CustomerList from '../components/CustomerList'
import { CustomerContext } from '../contexts/CustomerContext'
import { UserContext } from '../contexts/UserContext'
import UserKit from '../data/UserKit'

export default function HomePage() {
  const {customerList, setCustomerList} = useContext(CustomerContext)
  const {userInfo, setUserInfo} = useContext(UserContext)

  const userKit = new UserKit();

  function fetchCustomers() {
    userKit.getCustomerList()
    .then(res => res.json())
    .then(data => {
      // console.log(data.results)
      setCustomerList(data.results)
    })
  }

  function fetchUser(){
  userKit.getUser()
  .then(res => res.json())
  .then(data => {
    setUserInfo(data)
  })
}

useEffect(()=> {
  fetchUser()
}, [])

  return (
    <div value={{customerList, setCustomerList, userInfo, setUserInfo}}>     
    <h2>Användare: {userInfo.firstName}</h2>
    <h3>{userInfo.email}</h3>
      <CustomerList fetchCustomers={fetchCustomers}/>
      <CreateCustomer fetchCustomers={fetchCustomers}/>
    </div>
  )
}
