import styled from "styled-components";
import Swal from "sweetalert2";
import { db } from "../firebase";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";

const SidebarOption = ({ Icon, title, addChannelOption, id }) => {
  const dispatch = useDispatch();

  const addChannel = () => {
    Swal.fire({
      title: "Please Enter the Channel Name",
      input: "text",
      showCancelButton: true,
    }).then((channelName) => {
      if (channelName.value) {
        db.collection("rooms").add({
          name: channelName.value,
        });
      }
    });
  };

  const selectChannel = () => {
    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };

  return (
    <SidebarOptionContainer onClick={addChannelOption && addChannel}>
      {Icon && <Icon fontSize="small" style={{ margin: "0.5rem" }} />}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel onClick={selectChannel}>
          <span>#</span>
          {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
};

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: var(--slack-color);
  }

  > h3 {
    font-weight: 500;
  }
`;

const SidebarOptionChannel = styled.h2`
  width: 100%;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.5rem;

  > span {
    padding: 1rem;
  }
`;
