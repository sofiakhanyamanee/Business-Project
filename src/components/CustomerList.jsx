import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CustomerContext } from "../contexts/CustomerContext";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Paragraph = styled.p`
color: #364947;
font-size: 22px;
`

const Table = styled.table`
text-align: center;
margin-top: 20px;
color: black;
border-radius: 12pt;
`

const TableHeading = styled.th`
margin-bottom: 10px;
background: #E3E5E5;
width: 20vw;
padding: 15px 0;
`

const TableRow = styled.tr`
// background: transparent;
`
const TableData = styled.td`
width: 20vw;
padding: 10px 0;
`
const Hr = styled.hr`
width: 300%;
`


export default function CustomerList({ fetchCustomers }) {
  const { customerList } = useContext(CustomerContext);

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <Wrapper>
      <Table>
      <TableRow>
        <TableHeading>Customer</TableHeading>
        <TableHeading>Organisation Nr</TableHeading>
        <TableHeading>Reference</TableHeading>
      </TableRow>

      {customerList.length > 0 ? (
        customerList.map((customerItem) => {
          const id = customerItem.id;
          return (<>
                  <TableRow>
                  <Link to={`/customer/${id}`} key={id}><TableData>{customerItem.name}</TableData></Link>
                  <TableData>{customerItem.organisationNr}</TableData>
                  <TableData>{customerItem.reference}</TableData>
                  </TableRow>
                  <Hr/>
                  </>
          );
        })
      ) : (
        <Paragraph>You don't have any customers</Paragraph>
      )}
      </Table>
    </Wrapper>
  );
}
