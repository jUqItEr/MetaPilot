import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'


export function TopMenu() {
    const [header, setHeader] = useState([])

    useEffect(() => {
        const getHeader = async () => {
            return axios({
                method: 'get',
                url: '/api/category/header'
            })
                .then((res) => {
                    setHeader(res.data)
                })
        }
        getHeader()
    }, [])

    return (
        <>
            <Link href='/' as={'/'} key={1}>
                <a className='nav-link'>홈</a>
            </Link>
            {header?.map((menu) => (
                <Link href='/category/[id]' as={`/category/${menu.id}`} key={menu.id}>
                    <a className='nav-link'>{menu.subject}</a>
                </Link>
            ))}

        </>
    )
}