import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import styles from '../../styles/admin/layout/header.module.css'
import logoImg from '../../image/profileEXImg.png'
/**
 * Rendering the login page.
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 04.
 * @returns
 */
export default function AdminHeader() {
    return (
        <>
            <Head>
                <title>관리자 페이지</title>
                <meta property='og:title' content='관리자 페이지' key='title'/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            {/* header */}
            <div className="p-3 " style={{backgroundColor: '#0d6efd'}}>
                <a href="# " className="d-flex align-items-center mb-2 mb-lg-0 text-black text-decoration-none">
                    <Image className={styles.logoImg}  src='/image/metapilot.svg' alt='' width={30} height={30}  />
                    <div className={styles.title} >관리자 페이지</div>
                </a>
            </div>
        </>
    )
};
