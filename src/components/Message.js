import styled from "styled-components";

const Message = ({ user, userImage, message, timestamp }) => {
  return (
    <MessageContainer>
      <img src={userImage} alt="" />
      <MessageInfo>
        <h4>
          {user} <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </MessageContainer>
  );
};

export default Message;

const MessageContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1.25rem;
  border-bottom: 1px solid #f2f2f2;

  > img {
    height: 3.1rem;
    display: block;
    border-radius: 0.5rem !important;
    /* min-width: 2.5rem; */
    flex: 0.1;
    object-fit: contain;
  }
`;

const MessageInfo = styled.div`
  margin-left: 0.6rem;
  flex: 0.9;
  > h4 > span {
    color: grey;
    font-weight: 300;
    font-size: 0.75rem;
    margin-left: 0.75rem;
  }
`;
