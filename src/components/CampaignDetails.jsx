import React, { useState } from "react"
import styled, { keyframes } from "styled-components"
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import { useAxiosGet, useAxiosGetInfluencers, useAxiosGetProducts } from "../utils/clientRequest";
import axios from "axios";
import { useNavigate } from "react-router-dom";




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
const ProductsDropdown = styled(MultiSelect)`
margin-top: 5px;
`

const InfluencersDropdown = styled(MultiSelect)`
margin-top: 15px;
`

export const CampaignDetails = () => {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [productsVal, setProductsVal] = useState('')
    const [influencersVal, setInfluencersVal] = useState('')

    const { products } = useAxiosGetProducts('https://mavx-api.herokuapp.com/campaigns/products', 'get')
    const { influencers } = useAxiosGetInfluencers('https://mavx-api.herokuapp.com/influencers/recommended', 'get')

    const brandId = localStorage.getItem('brand_id')

    const handlenameChange = e => {
        e.preventDefault()
        setName(e.target.value)
    };
    const handleDescriptionChange = e => {
        e.preventDefault()

        setDescription(e.target.value)
    };


    const handleOnchangeProducts = (val) => {
        setProductsVal(val)
    }

    const handleOnchangeInfluencers = (val) => {
        setInfluencersVal(val)
    }


    const productOptions = []

    products?.forEach((d) => {
        productOptions.push({ label: d.name, value: d.name })
    })

    const influencerOptions = []

    influencers?.forEach((d) => {
        influencerOptions.push({ label: d.name, value: d.name })
    })

    const handleOnClick = () => {
        const pIds = getProductIds(products, productsVal)
        const IIds = getInfluencersIds(influencers, influencersVal)

        // api
        var payload = JSON.stringify({
            "brand_id": brandId,
            "name": name,
            "description": description,
            "product_ids": pIds,
            "influencer_ids": IIds
        })



        var config = {
            method: 'post',
            url: 'https://mavx-api.herokuapp.com/campaigns',
            headers: {
                'Content-Type': 'application/json',
            },
            data: payload
        }

        axios(config)
            .then(function (response) {
                console.log('clickerd', JSON.stringify(response.data))
                localStorage.setItem('campaign_id', response.data.id)
            })
            .catch(function (error) {
                console.log(error)
            })

        navigate('/campaign-view')
    }

    return (
        <div>
            <Title>{'Campaign'}</Title>
            <Form>
                <Input
                    type="name"
                    name="name"
                    value={name}
                    placeholder={'Enter campaign name'}
                    onChange={handlenameChange}
                    defaultValue={''}
                />
                <InputDescription
                    type="description"
                    name="description "
                    value={description}
                    placeholder={'Enter campaign description '}
                    onChange={handleDescriptionChange}

                />
                <ProductsDropdown
                    className="multi-select"
                    onChange={handleOnchangeProducts}
                    options={productOptions}
                />

                <InfluencersDropdown
                    className="multi-select"
                    onChange={handleOnchangeInfluencers}
                    options={influencerOptions}
                />
                <Button onClick={handleOnClick}>Create Campaign</Button>
            </Form>
        </div>
    )
}

function getProductIds(products, val) {
    const pIds = []
    const arr = val.split(',')
    arr.forEach((a) => {
        products.forEach((p) => {
            if (p.name == a) {
                pIds.push(p.id)
            }
        })
    })

    return pIds
}

function getInfluencersIds(influencers, val) {
    const IIds = []
    const arr = val.split(',')
    arr.forEach((a) => {
        influencers.forEach((p) => {
            if (p.name == a) {
                IIds.push(p.id)
            }
        })
    })

    return IIds
}