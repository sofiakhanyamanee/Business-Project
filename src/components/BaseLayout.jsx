import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: #282c34;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function BaseLayout({ children }) {
  return <Container>{children}</Container>;
}
