import { Button } from '@material-ui/core'
import styled from 'styled-components'

function Head() {
  return (
    <Container>
      <img src='images/logo.png' alt='' />
      <HeadButton>
        <Button variant='outlined'>Why Slack?</Button>
        <Button variant='outlined'>Pricing</Button>
        <Button variant='outlined'>About Us</Button>
        <Button variant='outlined'>Create workspace</Button>
      </HeadButton>
    </Container>
  )
}

export default Head

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  img {
    object-fit: contain;
    width: 150px;
    
  }
`
const HeadButton = styled.div`
  button {
    border-radius: 20px;
    margin: 10px 4px;
  }
  @media (max-width: 768px) {
    display: none;
  }
`
