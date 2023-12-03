import Image from 'next/image'
import axios from 'axios'
import Head from 'next/head'
import styles from '/styles/login.module.css'

/**
 * Rendering the login page.
 * 
 * @author Kiseok Kang (@jUqItEr)
 * @since 2023. 12. 01.
 * @returns Return the login page.
 */
export default function LoginPage() {
    return ( 
        <>
            <Head>
                <title>로그인</title>
                <meta property='og:title' content='로그인' key='title' />
            </Head>
            <div className='d-flex align-items-center py-4 bg-body-tertiary'>
                <div className={`${styles.signin} m-auto`}>
                    <Image src={'/image/bootstrap-logo.svg'} alt='' width='72' height='57' />

                    <input className={styles.radioSignIn} id='tab-1' type='radio' name='tab' />
                    <label className={styles.tab} htmlFor='tab-1'>Sign-in</label>

                    <input className={styles.radioSignUp} id='tab-1' type='radio' name='tab' />
                    <label className={styles.tab} htmlFor='tab-1'>Sign-up</label>
                </div>
            </div>
        </>
    )

    // return (
    //     <form onSubmit={handleSubmit}>
    //         <label htmlFor="id">아이디</label>
    //         <input type="text" id="id" name="id" required />

    //         <label htmlFor="password">비밀번호</label>
    //         <input type="password" id="password" name="password" required />
    //         <button type="submit" className='btn btn-primary'>로그인</button>
    //     </form>
    // )
}

/**
 * Running axios.
 */
LoginPage.handleSubmit = async (event) => {
    event.preventDefault()
    
    const getUser = () => {
        axios({
            method: 'get',
            url: `/user/${event.target.id.value}`
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }
    getUser()
}