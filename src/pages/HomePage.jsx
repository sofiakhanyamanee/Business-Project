import React, { useContext, useEffect } from 'react'
import CreateCustomer from '../components/CreateCustomer'
import CustomerList from '../components/CustomerList'
import { CustomerContext } from '../contexts/CustomerContext'
import { UserContext } from '../contexts/UserContext'
import UserKit from '../data/UserKit'
import styled from 'styled-components'

const Container = styled.main`
width: 100vw;
height: 100vh;
display: flex;
background: teal;
`

const Heading = styled.h1`
text-align: center;
font-weight: ${props => props.applikation ? "300px": "normal"};
padding-bottom: 20px;
font-size: 28px;
font-family: arial;
color: ${props => props.applikation ? "whitesmoke": "grey"};
`

const ApplicationHeading = styled(Heading)`
font-size:20px;
position:absolute;
top: 20px;
left: 20px;
`

const CustomerListBox = styled.div`
background: #F5F5F5;
width: 50vw;
padding: 50px 30px;

& a {
  color: black;
  text-decoration: none;

  &:hover {
    color:#364947;;
  }
}
`

const CreateCustomerBox = styled.div`
background: #739994;
width: 50vw;
padding: 50px 30px;
color: #364947;
display: flex;
justify-content: center;
align-items: center;
`

const User = styled.div`
display: flex;
position: absolute;
bottom: 10px;
left: 10px;
color: whitesmoke;
`

const Paragraph = styled.p`
padding-right: 5px;
`

const SignOutBtn = styled.button`
position: absolute;
top: 0px;
right: 20px;
border:none;
outline: none;
background: #739994;
width: 7vw;
height: 5vh;
margin-top: 20px;
border-radius: 12pt;
opacity: 0.9;
font-size: 15px;
color: whitesmoke;

&:hover {
  background:whitesmoke;
  color:#364947;
  border: 1px solid #739994;
}
`


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
  fetchCustomers()
}, [])

  return (
    <Container value={{customerList, setCustomerList, userInfo, setUserInfo}}>   
       <CreateCustomerBox>
         <ApplicationHeading applikation>Business Application</ApplicationHeading>
         <CreateCustomer fetchCustomers={fetchCustomers}/>

         <User>
         <Paragraph>Logged in as: {userInfo.firstName} {userInfo.lastName}</Paragraph>
         <Paragraph>|</Paragraph>
         <Paragraph>{userInfo.email}</Paragraph>
         </User>
       </CreateCustomerBox>

        <CustomerListBox> 
          <Heading>Customers</Heading>
          <CustomerList fetchCustomers={fetchCustomers}/>
          <SignOutBtn>Log out</SignOutBtn>
        </CustomerListBox>

    </Container>
  )
}
