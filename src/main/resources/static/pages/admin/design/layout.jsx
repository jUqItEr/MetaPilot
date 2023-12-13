import Head from "next/head";
import Image from 'next/image'
import axios from 'axios'
import styles from '../../../styles/admin/design/layout.module.css';
import { useState } from "react";
import AdminHeader from "../../../layout/admin/header";
import AdminSidebar from "../../../layout/admin/sidebar";

export default function AdminLayoutPage() { 
    const [imageSrc, setImageSrc] = useState('/image/layoutImg1.png')
    const [selectBtnId,setSelectBtnId ] = useState("btn1")

    const chLayout = btnId => {
        if(btnId === "btn1") {
            setImageSrc('/image/layoutImg1.png')
            setSelectBtnId("1") 
        } else if (btnId === "btn2") {
            setImageSrc('/image/layoutImg2.png')
            setSelectBtnId("2")
        } 
    }
    const submitClk = () => {
        console.log(selectBtnId)
        axios({
            params: {
                layoutId : selectBtnId,
                id : 1
            },
            method : 'post',
            url : '/api/admin/updateLayout'
        })
        .then((res) => { 
            console.log(res);
            if (res.data) {
                alert("레이아웃 변경이 완료되었습니다.");
            }
        })
        .catch((err) => {
            console.error('Request error:', err);
        })
    }

    return (
        <>
            <Head>
                <title>관리자 페이지</title>
                <meta property='og:title' content='관리자 페이지' key='title'/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div id={styles.wrap}>
                <AdminHeader/>
                <div className="d-flex flex-nowrap">
                    <AdminSidebar/>
                    <div className={styles.content} >
                        <div className={styles.pageTitle}><span className={styles.pageTitleFont}>레이아웃 관리</span></div>
                        <div className={styles.pageContent}>
                            <div className={styles.layoutIcon}>
                                <button className={styles.layoutIconBtn} id="btn1" onClick={() => chLayout("btn1")}>
                                    <Image src='/image/layoutIcon1.png' alt='' width={300} height={300} />
                                </button>
                                <button className={styles.layoutIconBtn} id="btn2" onClick={() => chLayout("btn2")}>
                                    <Image src='/image/layoutIcon2.png' alt='' width={300} height={300} />
                                </button>
                            </div>
                            <div className={styles.layoutImg}>
                                <Image src={imageSrc} id="layoutImg" alt='' width={400} height={300}/>
                            </div>
                            <div className={styles.submitBtn}>
                                <button className="btn btn-primary mb-3" type="button" onClick={() => submitClk()}>레이아웃 적용</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
