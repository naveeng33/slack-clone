import styled from "styled-components";
import { Button } from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import { useState } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput = ({ channelName, channelId, chatRef }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault();

    if (!channelId) {
      return false;
    }

    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user?.displayName,
      userImage: user?.photoURL,
    });

    chatRef.current.scrollIntoView({
      behavior: "smooth",
    });

    setInput("");
  };

  return (
    <ChatInputContainer>
      <form onSubmit={sendMessage}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder={`Message #${channelName}`}
        />
        <Button type="submit">
          {/* SEND &nbsp; */}
          <SendIcon fontSize="small" />
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 1rem;
  background-color: lightgrey;
  position: fixed;
  bottom: 0.5rem;
  transform: translateX(2%);
  width: 80vw;
  margin: 0 auto !important;
  > form {
    display: flex;
    justify-content: center;
    padding: 0.5rem;

    > input {
      background: transparent;
      border: none;
      outline: none;
      flex: 1;
    }
  }
`;
