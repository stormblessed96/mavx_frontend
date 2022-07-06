import React from "react"
import { Routes, Route } from "react-router-dom"
import { Campaign } from "../components/Campaign"
import { CampaignDetails } from "../components/CampaignDetails"
import { CampaignDetailsView } from "../components/CampaignDetailsView"
import { Details } from "../components/Details"
import { Login } from "../components/Login"
import { SignUp } from "../components/SignUp"





export const SimpleRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/details" element={<Details />} />
            <Route path="/campaign" element={<Campaign />} />
            <Route path="/campaign-details" element={<CampaignDetails />} />
            <Route path="/campaign-view" element={<CampaignDetailsView />} />
        </Routes>
    )
}