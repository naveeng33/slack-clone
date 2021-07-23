import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { useSelector } from "react-redux";
import { selectRoomId } from "../features/appSlice";
import { useDocument, useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import { useRef, useEffect } from "react";
import Spinner from "react-spinkit";

import Message from "./Message";
import ChatInput from "./ChatInput";

const Chat = () => {
  const chatRef = useRef(null);

  const roomId = useSelector(selectRoomId);

  const [roomDetails] = useDocument(
    roomId && db.collection("rooms").doc(roomId)
  );

  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
  );

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [roomId, loading]);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <Spinner name="line-scale-pulse-out" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }
  return (
    <ChatContainer>
      {roomDetails && roomMessages && (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>
                  #{roomDetails ? `${roomDetails.data().name}` : ""}
                </strong>
              </h4>
              <StarBorderOutlinedIcon />
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlinedIcon />
                Details
              </p>
            </HeaderRight>
          </Header>

          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, user, timestamp, userImage } = doc.data();

              return (
                <Message
                  key={doc.id}
                  message={message}
                  user={user}
                  userImage={userImage}
                  timestamp={timestamp}
                />
              );
            })}
            <ChatBottom ref={chatRef}></ChatBottom>
          </ChatMessages>

          <ChatInput
            chatRef={chatRef}
            channelName={roomDetails?.data().name}
            channelId={roomId}
          />
        </>
      )}
    </ChatContainer>
  );
};

export default Chat;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: auto;
  margin-top: 3.8rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid lightgrey;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    align-items: center;
    margin-right: 0.4rem;
  }
`;

const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
  }

  > p > .MuiSvgIcon-root {
    margin-right: 0.25rem;
    font-size: 1rem;
  }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
  padding-bottom: 11rem;
`;

const AppLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
`;

const AppLoadingContents = styled.div`
  display: grid;
  place-items: center;
  /* height: 100%; */
`;
