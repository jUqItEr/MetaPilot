import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/design/layout.module.css'
import {useEffect} from "react"
import AdminHeader from "../../../layout/admin/header";
import AdminSidebar from "../../../layout/admin/sidebar";


/**
 * Rendering the login page.
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 04.
 * @returns
 */
export default function AdminLayoutPage() {
    return (
        <>
            <Head>
                <title>관리자 페이지</title>
                <meta property='og:title' content='관리자 페이지' key='title'/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div id={styles.wrap}>
                {/*header*/}
                <AdminHeader/>
                <div className="d-flex flex-nowrap">
                    {/*sidebar*/}
                    <AdminSidebar/>
                    {/* content */}
                    <div className={styles.content} >
                        <div className={styles.pageTitle}><span className={styles.pageTitleFont}>레이아웃 관리</span></div>
                        <div className={styles.pageContent}>
                            <div className={styles.layoutIcon}>
                                <button  className={styles.layoutIconBtn}>
                                    <Image src='/image/layoutIcon1.png' alt='' width={300} height={300} />
                                </button>
                                <button  className={styles.layoutIconBtn}>
                                    <Image src='/image/layoutIcon2.png' alt='' width={300} height={300} />
                                </button>
                            </div>
                            <div className={styles.layoutImg}>
                                <Image src='/image/layoutImg1.png' alt='' width={400} height={300} />
                            </div>
                            <div className={styles.submitBtn}>
                                <button type="submit" className="btn btn-primary mb-3">레이아웃 적용</button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};
