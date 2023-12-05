'use client';

import $ from 'jquery'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function IndexHeader() {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [info, setInfo]  = useState([])

    const header = []

    const darkModeHandler = () => {
        setIsDarkMode(!isDarkMode)

        document.body.setAttribute('data-theme', isDarkMode ? 'light' : 'dark')
    }

    const getHeader = async () => {
        axios({
            method: 'get',
            url: '/category/api/categoryHeader',
        })
        .then((res) => {
            res.data.forEach((menu) => {
                const node = $(`<Link className='nav-link' href='/category/${menu['id']}'></Link>`)

                node.appendTo($(`<a>${menu['subject']}</a>`))
                header.push(node)

                console.log(header)
            })
        })
    }

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
        getHeader()
    }, [])

    return (
        <>
        <nav className='navbar navbar-expand-lg bg-light'>
            <div className='container-fluid'>
                <a className='navbar-brand' href='#'>{info['title']}</a>
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup' aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                    <div className='navbar-nav'>
                        {header}
                        {/* <a className='nav-link active' aria-current='page' href='#'>Home</a>
                        <a className='nav-link' href='#'>Features</a>
                        <a className='nav-link' href='#'>Pricing</a>
                        <a className='nav-link disabled'>Disabled</a> */}
                    </div>
                </div>
            </div>
        </nav>
            <nav className='navbar navbar-expand-md'>
                <h1>한글 테스트</h1>
            </nav>
            <div className=''>
                <h1>Test</h1>
                <button onClick={darkModeHandler}>
                    {isDarkMode ? 'light' : 'dark'}
                </button>
            </div>
        </>
    )
}