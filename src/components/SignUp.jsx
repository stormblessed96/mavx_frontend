import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { useAxiosGet, useAxiosPost } from "../utils/clientRequest"


const Root = styled.div`
  height: 100vh;
display: flex;
`

const jump = keyframes`
  from{
    transform: translateY(0)
  }
  to{
    transform: translateY(-3px)
  }
`
const Form = styled.form`
  margin: 0 auto;
  width: 100%;
  max-width: 414px;
  padding: 1.3rem;
  display: flex;
  flex-direction: column;
  position: relative;
`

const Input = styled.input`
  max-width: 100%;
  padding: 11px 13px;
  background: #f9f9fa;
  color: #f03d4e;
  margin-bottom: 0.9rem;
  border-radius: 4px;
  outline: 0;
  border: 1px solid rgba(245, 245, 245, 0.7);
  font-size: 14px;
  transition: all 0.3s ease-out;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
  :focus,
  :hover {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
  }
`

const Button = styled.button`
  max-width: 100%;
  padding: 11px 13px;
  color: rgb(253, 249, 243);
  font-weight: 600;
  text-transform: uppercase;
  background: #f03d4e;
  border: none;
  border-radius: 3px;
  outline: 0;
  cursor: pointer;
  margin-top: 0.6rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-out;
  :hover {
    background: rgb(200, 50, 70);
    animation: ${jump} 0.2s ease-out forwards;
  }
`

const Title = styled.div`
font-family: auto;
font-size: xx-large;
text-align: center;
color: #f03d4e;
`
const Image = styled.img`
height: 80vh;
`

const SideImage = styled.div`
display: flex;
margin-top: 7%;
`


const LoginRoot = styled.div`
display: flex;
flex-flow: column;
margin-top: 23%;
`

export const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const handleSubmit = e => {
    e.preventDefault();

    var payload = JSON.stringify({
      "formFields": [
        {
          "id": "email",
          "value": email
        },
        {
          "id": "password",
          "value": password
        }
      ]
    });

    // API part
    var config = {
      method: 'post',
      url: 'https://mavx-api.herokuapp.com/auth/signup',
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    };

    axios(config)
      .then(function (response) {
        console.log('clickerd', JSON.stringify(response.data))
        localStorage.setItem('brand_id', response.data.user.id)
      })
      .catch(function (error) {
        console.log(error)
      })
    navigate('/details')
  }

  const handleEmailChange = e => {
    e.preventDefault();
    setEmail(e.target.value)
  }
  const handlePasswordChange = e => {
    e.preventDefault();
    setPassword(e.target.value)
  }

  const onLoginClick = () => {
    navigate('/login')
  }

  return (
    <Root>
      <SideImage>
        <Image src={'./side_image.svg'} alt="logo" />
      </SideImage>
      <LoginRoot>
        <Title>{'Sign Up'}</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={email}
            placeholder={'Enter your email'}
            onChange={handleEmailChange}
            defaultValue={''}
          />
          <Input
            type="password"
            name="password"
            value={password}
            placeholder={'Enter your password'}
            onChange={handlePasswordChange}
            defaultValue={''}
          />
          <Button>Next</Button>
          <Button onClick={onLoginClick}>Login</Button>
        </Form>

      </LoginRoot>
    </Root>
  )
}