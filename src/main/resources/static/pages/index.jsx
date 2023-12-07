import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import IndexHeader from '../layout/home/header';


const IndexPage = () => {
    const [info, setInfo] = useState([])
    
    /**
     * Get CMS Information from API server.
     * 
     * @author Kiseok Kang (@jUqItEr)
     * @since 2023. 12. 04.
     * @version 1.0.0
     */
    const getInfo = async () => {
        axios({
            method: 'get',
            url: '/api/info'
        })
        .then((res) => {
            setInfo(res.data !== undefined ? res.data.data : null)
        })
    }

    useEffect(() => {
        getInfo()
    }, [])

    return (
        <>
            <Head>
                <title>{info.title}</title>
            </Head>
            <IndexHeader/>
        </>
    )
}

export default IndexPage