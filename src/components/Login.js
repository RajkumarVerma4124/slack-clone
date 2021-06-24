import styled from 'styled-components'
import { auth, provider } from '../firebase'
import Head from './Head'

function Login() {
  const signIn = (e) => {
    e.preventDefault()
    auth.signInWithPopup(provider)
  }
  return (
    <Container>
      <Head />
      <Section>
        <Hero>
          <h1>Created By R.V</h1>
          <img src='images/slack.jpg' alt='' />
        </Hero>
        <Form>
          <Google onClick={signIn}>
            <img src='images/google.png' alt='' />
            <h1>Sign in with Google</h1>
          </Google>
        </Form>
      </Section>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: grid;
  height: 100vh;
  width: 100vw;
  background-color: white;
`;

const Section = styled.section`
  display: flex;
  align-content: start;
  min-height: 700px;
  padding-bottom: 138px;
  padding: 60px 130px;
  position: relative;
  flex-wrap: wrap;
  width: 100%;
  max-width: 1128px;
  align-items: center;
  margin: auto;
  border-radius: 20px;
  --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  @media (max-width: 768px) {
    margin: auto;
    min-height: 0px;
  }
`;
const Hero = styled.div`
  width: 100%;
  align-items: center;
  h1 {
    padding-bottom: 0;
    padding-left: 15px;
    padding-top: 150px;
    width: 55%;
    font-size: 56px;
    color: #800080;
    font-weight: 200;
    line-height: 70px;
    z-index: 1;
    
    @media (max-width: 768px) {
      text-align: center;
      font-size: 35px;
      width: 100%;
      line-height: 2;
    }
  }

  > img {
    width: 700px;
    height: 600px;
    position: absolute;
    bottom: 150px;
    right: 30px;
    
    @media (max-width: 768px) {
      width: 700px;
      height: 670px;
      margin-top: 10px;
      position: absolute;
      top: 120px;
      right: -400px;
      z-index: -1;
    }
  }
`
const Form = styled.div`
  margin-top: 50px;
  margin-left: 10px;
  width: 350px;
  @media (max-width: 768px) {
    margin-top: 400px;
  }
`

const Google = styled.button`
  display: flex;
  cursor: pointer;
  justify-content: center;
  background-color: #fff;
  align-items: center;
  height: 56px;
  width: 100%;
  border-radius: 28px;
  --tw-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  transition-duration: 167ms;
  img {
    object-fit: contain;
    width: 30px;
  }
  h1 {
    margin-left: 10px;
    font-weight: 500;
  }
  color: rgba(0, 0, 0, 0.6);
  &:hover {
    background-color: rgba(207, 207, 207, 0.25);
    color: rgba(0, 0, 0, 0.75);
  }
`;
