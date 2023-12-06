'use client';

import $ from 'jquery'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link';
import { TopHeader } from '../../components/home/header';
import { useTheme } from 'next-themes';

const ThemeChanger = () => {
    const [ mounted, setMounted ] = useState(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className=''>
            <h1>{theme}</h1>
            <button onClick={() => setTheme('light')}>Light!</button>
            <button onClick={() => setTheme('dark')}>Dark!</button>
        </div>
    )
}

export default function IndexHeader() {
    const [info, setInfo]  = useState([])

    const getInfo = async () => {
        axios({
            method: 'get',
            url: '/api/info',
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
            <header className='navbar navbar-expand-lg bg-light border-bottom'>
                <div className='container-fluid'>
                    <Link href='/'>
                        <a className='navbar-brand'>{info['title']}</a>
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav'>
                            <TopHeader/>
                        </div>
                    </div>
                </div>
            </header>
            <nav className='navbar navbar-expand-md'>
                <h1>한글 테스트</h1>
                <ThemeChanger/>
            </nav>
            
        </>
    )
}