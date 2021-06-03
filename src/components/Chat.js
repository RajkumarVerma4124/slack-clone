import {
  Button,
  IconButton,
  makeStyles,
  Modal,
  TextField,
} from '@material-ui/core'
import {
  Create,
  DeleteForeverOutlined,
  InfoOutlined,
  StarBorderOutlined,
} from '@material-ui/icons'
import { useEffect, useRef, useState } from 'react'
import { useCollection, useDocument } from 'react-firebase-hooks/firestore'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { selectRoomId } from '../features/appSlice'
import { db } from '../firebase'
import ChatInput from './ChatInput'
import Message from './Message'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
  }
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function Chat() {
  const classes = useStyles()
  const [modalStyle] = useState(getModalStyle)
  const chatRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const roomId = useSelector(selectRoomId)
  const [roomDetails] = useDocument(
    roomId && db.collection('rooms').doc(roomId)
  )
  const [roomMessages, loading] = useCollection(
    roomId &&
      db
        .collection('rooms')
        .doc(roomId)
        .collection('messages')
        .orderBy('timestamp', 'asc')
  )

  const editRoom = () => {
    db.collection('rooms').doc(roomId).set(
      {
        name: input,
      },
      { merge: true }
    )
    setOpen(false)
    setInput('')
  }

  const deleteRoom = () => {
    window.location.reload()
    db.collection('rooms').doc(roomId).delete()
  }

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: 'smooth',
    })
  }, [roomId, loading])

  return (
    <Container>
      {roomDetails && roomMessages && (
        <>
          <ModalContent open={open} onClose={() => setOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
              <h1>Edit</h1>
              <form>
                <TextField
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  variant='outlined'
                  placeholder={roomDetails?.data().name}
                />
                <button onClick={editRoom} type='submit' />
              </form>
            </div>
          </ModalContent>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>#{roomDetails?.data().name}</strong>
              </h4>
              <StarBorderOutlined />
            </HeaderLeft>
            <HeaderRight>
              <IconButton>
                <Create onClick={() => setOpen(true)} />
              </IconButton>
              <IconButton>
                <DeleteForeverOutlined onClick={deleteRoom} />
              </IconButton>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImg } = doc.data()
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImg={userImg}
                />
              )
            })}
            <ChatBottom ref={chatRef} />
          </ChatMessages>
          <ChatInput
            chatRef={chatRef}
            channelId={roomId}
            channelName={roomDetails?.data().name}
          />
        </>
      )}
    </Container>
  )
}

export default Chat

const Container = styled.div`
  flex: 0.7;
  flex-grow: 1;
  overflow-y: scroll;
  margin-top: 70px;
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
  }
  .MuiSvgIcon-root {
    margin-left: 10px;
    cursor: pointer;
    font-size: 18px;
  }
`
const HeaderRight = styled.div`
  p {
    display: flex;
    align-items: center;
    font-size: 14px;
    .MuiSvgIcon-root {
      margin-right: 5px;
      font-size: 16px;
    }
  }
`
const ChatMessages = styled.div``
const ChatBottom = styled.div`
  height: 100px;
`
const ModalContent = styled(Modal)`
  div > form > button {
    display: none;
  }
`
