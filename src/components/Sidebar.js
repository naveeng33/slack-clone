import styled from "styled-components";
import SidebarOption from "./SidebarOption";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import CreateIcon from "@material-ui/icons/Create";
import InsertCommentIcon from "@material-ui/icons/InsertComment";
import InboxIcon from "@material-ui/icons/Inbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import AppsIcon from "@material-ui/icons/Apps";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";

import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

const Sidebar = () => {
  const [channels] = useCollection(db.collection("rooms"));

  const [user] = useAuthState(auth);

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarInfo>
          <h2>GRINFFINDOR</h2>
          <h3>
            <FiberManualRecordIcon />
            {user?.displayName}
          </h3>
        </SidebarInfo>
        <CreateIcon />
      </SidebarHeader>

      <SidebarOption Icon={InsertCommentIcon} title="Threads" />
      <SidebarOption Icon={InboxIcon} title="Mentions & Reactions" />
      <SidebarOption Icon={DraftsIcon} title="Saved Items" />
      <SidebarOption Icon={BookmarkBorderIcon} title="Channel Browser" />
      <SidebarOption Icon={PeopleAltIcon} title="People & User groups" />
      <SidebarOption Icon={AppsIcon} title="Apps" />
      <SidebarOption Icon={FileCopyIcon} title="File Browser" />
      <SidebarOption Icon={ExpandLessIcon} title="Show Less" />

      <hr />
      <SidebarOption Icon={ExpandMoreIcon} title="Channels" />
      <hr />
      <SidebarOption Icon={AddIcon} addChannelOption title="Add Channel" />

      {channels?.docs.map((doc) => (
        <SidebarOption key={doc.id} id={doc.id} title={doc.data().name} />
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  overflow-y: auto;

  background-color: var(--secondary-color);
  flex: 0.3;
  color: #fff;
  margin-top: 3.8rem;
  border-top: 1px solid #69006e;
  max-width: 12rem;
  ::-webkit-scrollbar {
    width: 0.5rem;
  }
  > hr {
    margin: 0.6rem 0;
    border: 1px solid #69006e;
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  padding: 0.8rem;
  border-bottom: 1px solid #69006e;
  /* position: sticky;
  top: 0; */
  /* z-index: 999; */

  > .MuiSvgIcon-root {
    color: #69006e;
    background-color: #fff;
    border-radius: 50%;
    padding: 0.4rem;
    font-size: 2rem;
  }
`;

const SidebarInfo = styled.div`
  flex: 1;

  > h2 {
    font-size: 1rem;
    font-weight: bolder;
    margin-bottom: 0.3rem;
  }

  > h3 {
    display: flex;
    align-items: center;
    font-size: 0.8rem;
    font-weight: 400;

    > .MuiSvgIcon-root {
      font-size: 0.8rem;
      margin-right: 0.2rem;
      color: green;
    }
  }
`;
