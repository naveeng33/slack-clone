import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <HeaderContainer>
      <HeaderLeft>
        <HeaderAvatar
          onClick={() => auth.signOut()}
          src={user?.photoURL}
          alt={user?.displayName[0]}
        />
        <AccessTimeIcon />
      </HeaderLeft>

      <HeaderSearch>
        <SearchIcon />
        <HeaderInput placeholder="Search the Grinffindor" />
      </HeaderSearch>

      <HeaderRight>
        <HelpOutlineIcon />
      </HeaderRight>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0;
  width: 100%;
  position: fixed;
  background-color: var(--slack-color);
  color: #fff;
`;

const HeaderLeft = styled.div`
  flex: 0.3;
  display: flex;
  align-items: center;
  /* justify-content: space-between; */
  margin-left: 1.25rem;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 1.8rem;
  }
`;

const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const HeaderSearch = styled.div`
  flex: 0.4;
  display: flex;
  align-items: center;
  background-color: var(--secondary-color);
  border: 1px solid grey;
  border-radius: 0.3rem;
  padding: 0.3rem;
  color: grey;
  text-align: center;
`;

const HeaderInput = styled.input`
  background-color: transparent;
  border: none;
  outline: none;
  color: #fff;
  flex: 1;
  text-align: center;
`;

const HeaderRight = styled.div`
  flex: 0.3;
  display: flex;
  align-items: flex-end;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 1.25rem;
  }
`;
