import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled, { keyframes } from "styled-components"
import { useAxiosGet } from "../utils/clientRequest"


const Title = styled.div`
font-family: auto;
font-size: xx-large;
text-align: center;
`

const Name = styled.div`
font-family: auto;
font-size: xx-large;
text-align: center;
color: #f03d4e;
margin-top: 20px;
`

const Description = styled.div`
font-family: auto;
font-size: xx-large;
text-align: center;
color: #f03d4e;
margin-top: 20px;
`
const Products = styled.div`
display: flex;
flex-flow: row;
justify-content: space-between;
margin-top: 20px;
`

const Influencers = styled.div`
display: flex;
flex-flow: row;
justify-content: space-between;
margin-top: 20px;
`

const PIname = styled.div`
display: flex;
flex-flow: row;
font-weight: 600;
justify-content: space-between;
margin-top: 20px;
`
const PIimage = styled.img`
display: flex;
flex-flow: row;
justify-content: space-between;
margin-top: 20px;
border-radius: 100px;
`

export const CampaignDetailsView = () => {

    const [data, setData] = useState(null)
    const [shouldRender, setShouldRender] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShouldRender(true);
        }, 500);
    }, [shouldRender]);


    useEffect(() => {
        const campaignId = localStorage.getItem('campaign_id')
        var config = {
            method: 'get',
            url: 'https://mavx-api.herokuapp.com/campaigns/' + campaignId,
        }
        axios(config)
            .then(function (response) {
                console.log('clickerd', JSON.stringify(response.data))
                setData(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [setData, data])

    const name = data?.campaign?.name
    const description = data?.campaign?.description
    return (
        <div>
            {shouldRender && <>
                <Title>{'Campaign'}</Title>
                <Name>{"Name:" + name}</Name>
                <Description>{"Description:" + description}</Description>
                <Name>{"Products"}</Name>
                <Products>
                    {data?.campaign?.products?.map((p) => (
                        <div>
                            <PIname>{p.name}</PIname>
                            <PIimage src={p.img_url} />
                        </div>
                    ))}
                </Products>
                <Name>{"Influencers"}</Name>
                <Influencers>
                    {data?.influencers?.map((i) => (
                        <div>
                            <PIname>{i.name}</PIname>
                            <PIimage src={i.img_url} />
                        </div>
                    ))}
                </Influencers>
            </>}
        </div >
    )
}
