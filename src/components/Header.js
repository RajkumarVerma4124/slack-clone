import { Avatar } from '@material-ui/core'
import { AccessTime, PowerSettingsNew, Search } from '@material-ui/icons'
import { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import styled from 'styled-components'
import { auth } from '../firebase'

function Header() {
  const [show, setShow] = useState(false)
  const [user] = useAuthState(auth)

  return (
    <Container>
      {/* Header leftl */}
      <HeaderLeft>
        <HeaderAvatar src={user?.photoURL} alt={user?.displayName} />
        <AccessTime />
      </HeaderLeft>
      {/* Header Search */}
      <HeaderSearch>
        <Search />
        <input placeholder='Search' />
      </HeaderSearch>
      {/* Header Right */}
      <HeaderRight>
        <div className='header__right'>
          <PowerSettingsNew onMouseOver={() => setShow(!show)} />
          {show && (
            <div onClick={() => auth.signOut()} className='header__signout'>
              Signout
            </div>
          )}
        </div>
      </HeaderRight>
    </Container>
  )
}

export default Header

const Container = styled.div`
  display: flex;
  position: fixed;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  background-color: var(--slack-color);
  color: #fff;
`
const HeaderLeft = styled.div`
  display: flex;
  flex: 0.3;
  align-items: center;
  margin-left: 20px;

  > .MuiSvgIcon-root {
    margin-left: auto;
    margin-right: 30px;
  }
`
const HeaderAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.9;
  }
`
const HeaderSearch = styled.div`
  display: flex;
  align-items: center;
  flex: 0.4;
  background-color: #421f44;
  padding: 0 50px;
  border-radius: 10px;
  color: gray;
  border: 1px solid gray;

  @media (max-width: 768px) {
    display: none;
  }

  input {
    background-color: transparent;
    outline: none;
    border: none;
    color: #fff;
    text-align: center;
    min-width: 30vw;
  }
`
const HeaderRight = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.3;
  align-items: flex-end;
  margin-right: 50px;

  .header__right {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .MuiSvgIcon-root {
      margin-left: auto;
      cursor: pointer;
      margin-top: -5px;
      margin-right: 25px;
      position: sticky;
    }
  }
  .header__signout {
    background: var(--slack-color);
    margin-right: 60px;
    margin-top: -29px;
    width: 75px;
    height: 30px;
    padding: 7px;
    padding-bottom: 1px;
    cursor: pointer;
    text-align: center;
    align-self: center;
    justify-content: center;
    border-radius: 20px;
    border: 1px solid lightgray;
    z-index: 999;
    font-weight: 600;
    color: #fff;
    --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
      var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
`;
