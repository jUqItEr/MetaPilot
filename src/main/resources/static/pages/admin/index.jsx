import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'

export default function AdminPage() {
    const [info, setInfo] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: 'api/info'
        })
        .then((res) => {
            setInfo(res.data !== undefined ? res.data.data : null)
        })
    }, [])

    return (
        <>
            <Head>
                <title>{info['title']}</title>
                <meta property='og:title' content='관리자 페이지' key='title' />
            </Head>
            <section></section>
        </>
    )
}