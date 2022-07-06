import axios from "axios"
import { useEffect, useState } from "react"

export const useAxiosGet = (url, method) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
    const [loaded, setLoaded] = useState(false)
    var config = {
        method: method,
        url: url,
    };
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.request(config)
                setData(response.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoaded(true)
            }
        })()
    }, [])

    return { data, error, loaded }
}

export const useAxiosGetProducts = (url, method) => {
    const [products, setProducts] = useState(null)
    const [error, setError] = useState("")
    const [loaded, setLoaded] = useState(false)
    var config = {
        method: method,
        url: url,
    };
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.request(config)
                setProducts(response.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoaded(true)
            }
        })()
    }, [])

    return { products, error, loaded }
}

export const useAxiosGetInfluencers = (url, method) => {
    const [influencers, setInfluencers] = useState(null)
    const [error, setError] = useState("")
    const [loaded, setLoaded] = useState(false)
    var config = {
        method: method,
        url: url,
    };
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.request(config)
                setInfluencers(response.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoaded(true)
            }
        })()
    }, [])

    return { influencers, error, loaded }
}

export const useAxiosPost = (url, method, payload) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState("")
    const [loaded, setLoaded] = useState(false)
    var config = {
        method: method,
        url: url,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2NTcyODQ0NDEuNDAwNDU4LCJpYXQiOjE2NTY0MjA0NDEuNDAwNDY3LCJpc3MiOiJodHRwczovL3Jldmlld3MtYXBpLm1lcmNhcmkuaW4vIiwic3ViIjoiMTQyNTYifQ.ViAEOxJ7hRIT-5bJy3qRmvNEdRCJNj3zpUbXjLAlFq8',
            'Content-Type': 'application/json'
        },
        data: payload
    }
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.request(config)
                setData(response.data)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoaded(true)
            }
        })()
    }, [])

    return { data, error, loaded }
}