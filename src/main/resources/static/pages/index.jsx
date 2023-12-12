import axios from 'axios';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import IndexHeader from '../layout/home/header';
import IndexSidebar from '../layout/home/sidebar';


const IndexPage = () => {
    const [category, setCategory] = useState([])
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

        axios({
            method: 'get',
            url: '/api/category/list'
        })
        .then((res) => {
            setCategory(res.data)
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
            <IndexHeader info={info} />
            <IndexSidebar category={category} />
        </>
    )
}

export default IndexPage