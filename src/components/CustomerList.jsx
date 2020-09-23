import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { CustomerContext } from '../contexts/CustomerContext'

const Wrapper = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`

export default function CustomerList({fetchCustomers}) {

  const { customerList } = useContext(CustomerContext)

  useEffect(()=> {
    fetchCustomers()
  }, [])


  return (
    <Wrapper> 
      <h1>Home</h1>
          {customerList && customerList.map(customerItem => {
            const id = customerItem.id
          return <Link to={`/customer/${id}`} key={id}>{customerItem.name}</Link>
          })}
    </Wrapper>
  )
}
