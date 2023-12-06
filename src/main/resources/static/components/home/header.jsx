import axios from 'axios'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export const TopHeader = () => {
    const [header, setHeader] = useState([])
    
    useEffect(() => {
        const getHeader = async () => {
            return axios({
                method: 'get',
                url: '/category/api/categoryHeader'
            })
            .then((res) => {
                setHeader(res.data)
            })
        }
        getHeader()
    }, [])

    return (
        <>
            {
                header?.map((menu) => (
                    <Link href='/category' key={menu['id']}>
                        <a className='nav-link'>{menu['subject']}</a>
                    </Link>
                ))
            }
            
        </>
    )
}