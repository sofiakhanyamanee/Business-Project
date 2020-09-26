import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import UserKit from "../data/UserKit";
import styled from 'styled-components'

const Wrapper = styled.main`
width: 100vw;
height: 100vh;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`

const Container = styled.div`
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const Heading = styled.h1`
text-align: center;
margin-bottom: 30px;
`

const ActivateBtn = styled.button`
border:none;
outline: none;
background: #739994;
width: 20vw;
height: 5vh;
margin-top: 20px;
border: 1px solid whitesmoke;
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

const InputField = styled.input`
width: 20vw;
height: 6vh;
border: none;
border-radius: 12pt;
padding: 0 12px;
outline:none;
opacity: 0.5;
margin: 15px;
`;
const BtnBox = styled.div`
width: 100vw;
display: flex;
justify-content: center;
`

const LogInButton = styled.button`
border:none;
outline: none;
background:#364947;
width: 21.5vw;
height: 6vh;
margin-top: 20px;
border-radius: 12pt;
opacity: 0.9;
font-size: 18px;
color: whitesmoke;
cursor: pointer;

&:hover {
  background: #80BA7F;
  color:#364947;
}
`

export default function LoginForm() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const history = useHistory();
  const searchString = history.location.search;
  const urlParameters = new URLSearchParams(searchString);

  const [uid, setUid] = useState(urlParameters.get("uid"));
  const [token, setToken] = useState(urlParameters.get("token"));

  const userKit = new UserKit();

  function handleActivateUser() {
    userKit.activateUser(uid, token).then(() => {
      setUid(null);
      setToken(null);
      history.push("/login");
    });
  }

  function handleLogin() {
    userKit
      .login(loginEmail, loginPassword)
      .then((res) => res.json())
      .then((data) => {
        userKit.setToken(data.token);
        history.push("/home");
      });
  }

  return (
    <Wrapper>
      {uid && token ? (
        <div>
          <h2>Activate your new account</h2>
          <ActivateBtn onClick={handleActivateUser}>Activate</ActivateBtn>
        </div>
      ) : (
        <Container>
            <Heading>Login</Heading>
            <InputField
                placeholder="Email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
            />
            <InputField
               placeholder="Password"
               value={loginPassword}
               type="password"
                onChange={(e) => setLoginPassword(e.target.value)}
            />
            <BtnBox>
              <LogInButton onClick={handleLogin}>Login</LogInButton>
            </BtnBox>
        </Container>
      )}
    </Wrapper>
  );
}
