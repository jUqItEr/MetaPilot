import axios from 'axios'
import Link from 'next/link';
import { useEffect, useState } from 'react'
import { TopMenu } from '../../components/home/menu';
import { ThemeSwitcher } from '../../components/home/switcher';

const IndexHeader = () => {
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
            <header className='navbar navbar-expand-lg border-bottom'>
                <div className='container-fluid'>
                    <Link href='/'>
                        <a className='navbar-brand'>{info['title']}</a>
                    </Link>
                    <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNavAltMarkup'
                        aria-controls='navbarNavAltMarkup' aria-expanded='false' aria-label='Toggle navigation'>
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
                        <div className='navbar-nav'>
                            <TopMenu />
                        </div>
                    </div>
                </div>
            </header>

            <nav className='navbar navbar-expand-md'>
                <h1>한글 테스트</h1>
                <ThemeSwitcher />
            </nav>
        </>
    )
}

export default IndexHeader