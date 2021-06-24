import styled from 'styled-components'

function Message({ message, timestamp, user, userImg }) {
  return (
    <Container>
      <img src={userImg} alt="" />
      <MessageInfo>
        <h4>
          {user}{" "}
          {timestamp ? (
            <span>{new Date(timestamp?.toDate()).toUTCString()}</span>
          ) : (
            <span>loading...</span>
          )}
        </h4>
        <p>{message}</p>
      </MessageInfo>
    </Container>
  );
}

export default Message

const Container = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  img {
    object-fit: contain;
    border-radius: 8px;
    height: 50px;
  }
`
const MessageInfo = styled.div`
  padding-left: 10px;
  h4 > span {
    color: gray;
    font-weight: 300;
    margin-left: 4px;
    font-size: 10px;
  }
`
