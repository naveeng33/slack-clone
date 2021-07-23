import styled from "styled-components";
import { Button } from "@material-ui/core";
import { auth, provider } from "../firebase";

const Login = () => {
  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => alert(err.message));
  };

  return (
    <LoginContainer>
      <LoginInnerContainer>
        <img
          src="https://cdn.mos.cms.futurecdn.net/SDDw7CnuoUGax6x9mTo7dd.jpg"
          alt=""
        />
        <h1>Sign in to Griffindor</h1>
        <p>griffindor.slack.co</p>
        <Button onClick={signIn}>Sign In With Google</Button>
      </LoginInnerContainer>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: #efefef;
  box-shadow: 0 0 0.6rem grey;
`;

const LoginInnerContainer = styled.div`
  padding: 6.25rem;
  background-color: #fff;
  text-align: center;
  border-radius: 0.5rem;

  > img {
    object-fit: contain;
    height: 6.25rem;
    margin-bottom: 2.5rem;
  }

  > button {
    text-transform: inherit !important;
    color: #fff;
    background-color: #0a8d48 !important;
    margin-top: 2rem;
  }
`;
