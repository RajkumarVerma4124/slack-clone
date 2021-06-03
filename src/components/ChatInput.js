import { Button } from '@material-ui/core'
import styled from 'styled-components'
import firebase from 'firebase'
import { auth, db } from '../firebase'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'

function ChatInput({ channelName, channelId, chatRef }) {
  const [input, setInput] = useState('')
  const [user] = useAuthState(auth)

  const sendMessage = (e) => {
    e.preventDefault()

    if (!channelId) {
      return false
    }

    db.collection('rooms').doc(channelId).collection('messages').add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImg: user?.photoURL,
    })
    chatRef.current.scrollIntoView({
      behavior: 'smooth',
    })
    setInput('')
  }
  return (
    <Container>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <button type='submit' onClick={sendMessage} />
      </form>
    </Container>
  )
}

export default ChatInput

const Container = styled.div`
  border-radius: 20px;

  form {
    position: relative;
    display: flex;
    justify-content: center;

    input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid lightgray;
      padding: 20px;
      outline: none;
      border-radius: 20px;
    }
    button {
      display: none;
    }
  }
`
