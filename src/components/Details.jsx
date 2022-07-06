import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"



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

const InputDescription = styled.textarea`
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
min-height: 80px;
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

export const Details = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()
  const Id = localStorage.getItem('brand_id')
  const handleSubmit = e => {
    e.preventDefault();
    console.log(name, description);

    // API part
    var payload = JSON.stringify({
      "name": name,
      "description": description
    })

    var config = {
      method: 'post',
      url: 'https://mavx-api.herokuapp.com/brands/' + Id + '/profile',
      headers: {
        'Content-Type': 'application/json'
      },
      data: payload
    };

    axios(config)
      .then(function (response) {
        console.log('set', JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })

    navigate('/campaign')
  }

  const handlenameChange = e => {
    e.preventDefault();

    console.log(e.target.value);
    setName(e.target.value)
  };
  const handlePasswordChange = e => {
    e.preventDefault();
    console.log(e.target.value);
    setDescription(e.target.value)
  };

  return (
    <div>
      <Title>{'Brand Profile'}</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="name"
          name="name"
          value={name}
          placeholder={'Enter your name'}
          onChange={handlenameChange}
          defaultValue={''}
        />
        <InputDescription
          type="description"
          name="description "
          value={description}
          placeholder={'Enter your description '}
          onChange={handlePasswordChange}
          defaultValue={''}
        />
        <Button>Submit</Button>
      </Form>
    </div>
  )
}
