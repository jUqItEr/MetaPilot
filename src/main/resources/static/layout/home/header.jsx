import Link from 'next/link';
import { useEffect, useState } from 'react'
import { TopMenu } from '../../components/home/menu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import styles from '/styles/header.module.css'
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';


const IndexHeader = ({ info, requestTime, setRequestTime }) => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)
    const [user, setUser] = useState([])
    const router = useRouter()
    
    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
        setMounted(true)
        
        setTimeout(() => setRequestTime(new Date()), 100)
    }, [user?.id, requestTime])

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    const handleAuthClick = () => {
        const isLogin = user !== null

        if (isLogin) {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            alert('로그아웃 되었습니다.')
            setRequestTime(new Date())
        } else {
            if (isLogin) {
                router.push('/')
            } else {
                router.push('/account/login')
            }
            return
        }
    }

    return (
        mounted && <>
            <header className='navbar navbar-expand-lg border-bottom'>
                <div className='container-fluid'>
                    <Link href='/'>
                        <a className='navbar-brand'>{info?.title}</a>
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
                    <button className='btn btn-Light' onClick={handleAuthClick}>
                        {user !== null ? `${user?.nickname} 로그아웃` : '로그인'}
                    </button>
                    <button className={`${styles.colorButton} btn btn-Light`} onClick={toggleTheme}>
                        <div style={{
                            alignItems: 'center',
                            display: 'flex'
                        }}>
                            <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} size='1x' className={styles.icon}/>
                            <span>&nbsp;{theme === 'light' ? '어둡게' : '밝게'}</span>    
                        </div>
                    </button>
                </div>
            </header>
        </>
    )
}

export default IndexHeader