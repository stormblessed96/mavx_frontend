import React from "react"
import { useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { useAxiosGet } from "../utils/clientRequest"



const jump = keyframes`
from{
  transform: translateY(0)
}
to{
  transform: translateY(-3px)
}
`
// const Form = styled.form`
// margin: 0 auto;
// width: 100%;
// max-width: 414px;
// padding: 1.3rem;
// display: flex;
// flex-direction: column;
// position: relative;
// `

// const Input = styled.input`
// max-width: 100%;
// padding: 11px 13px;
// background: #f9f9fa;
// color: #f03d4e;
// margin-bottom: 0.9rem;
// border-radius: 4px;
// outline: 0;
// border: 1px solid rgba(245, 245, 245, 0.7);
// font-size: 14px;
// transition: all 0.3s ease-out;
// box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
// :focus,
// :hover {
//   box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
// }
// `

// const InputDescription = styled.textarea`
// max-width: 100%;
// padding: 11px 13px;
// background: #f9f9fa;
// color: #f03d4e;
// margin-bottom: 0.9rem;
// border-radius: 4px;
// outline: 0;
// border: 1px solid rgba(245, 245, 245, 0.7);
// font-size: 14px;
// transition: all 0.3s ease-out;
// min-height: 80px;
// box-shadow: 0 0 3px rgba(0, 0, 0, 0.1), 0 1px 1px rgba(0, 0, 0, 0.1);
// :focus,
// :hover {
//   box-shadow: 0 0 3px rgba(0, 0, 0, 0.15), 0 1px 5px rgba(0, 0, 0, 0.1);
// }
// `

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

const Name = styled.div`
font-family: auto;
font-size: xx-large;
text-align: center;
color: #f03d4e;
`

const Description = styled.div`
font-family: auto;
font-size: xx-large;
text-align: center;
color: #f03d4e;
`
const ButtonRoot = styled.div`
text-align: center;
`

export const Campaign = () => {
  const navigate = useNavigate()
  const brand_id = localStorage.getItem('brand_id')
  const { data } = useAxiosGet('https://mavx-api.herokuapp.com/brands/' + brand_id + '/profile')
  console.log("rrrrrrrr", data)
  const handleSubmit = e => {
    e.preventDefault()
    console.log(name, description)
    navigate('/campaign-details')
  }

  const name = data?.name
  const description = data?.description



  return (
    <div>
      <Title>{'Brand Profile'}</Title>
      <Name>{name}</Name>
      <Description>{description}</Description>
      <ButtonRoot>
        <Button onClick={handleSubmit}>{"Create Campaign"}</Button>
      </ButtonRoot>
    </div >
  )
}
