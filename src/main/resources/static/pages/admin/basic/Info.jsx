import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/basic/info.module.css'
import {useEffect} from "react"
import AdminHeader from "../../../layout/admin/header"
import AdminSidebar from "../../../layout/admin/sidebar"
/**
 * Rendering the blog info page
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 07.
 * @returns
 */
export default function AdminBlogInfoPage() {
    return (
        <>
            <Head>
                {/*        {`${styles. }  `}       */}
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
                        <div className={styles.pageTitle}><span className={styles.pageTitleFont}>블로그 정보</span></div>
                        <div className={styles.pageContent}>
                            <div className = {`${styles.setField} border-bottom`}>
                                <label className="form-label fw-bold" htmlFor={"exampleFormControlInput1"} style={{width:'100px'}} >블로그 명</label>
                                <input type="text" className="form-control" id={"exampleFormControlInput1"} placeholder={"블로그 명을 입력하세요"} style={{width:'300px'}}/>
                                <label className="text-body-tertiary ps-3" htmlFor={"exampleFormControlInput1"}>한글, 영문, 숫자 혼용가능(한글 기준 25자 이내)</label>
                            </div>
                            <div className = {`${styles.setField} border-bottom`}>
                                <label className="form-label fw-bold" htmlFor={"exampleFormControlInput2"} style={{width:'100px'}}>닉네임</label>
                                <input type="text" className="form-control" id={"exampleFormControlInput2"} placeholder={"블로그 명을 입력하세요"} style={{width:'300px'}}/>
                                <label className="text-body-tertiary ps-3" htmlFor={"exampleFormControlInput2"}>한글, 영문, 숫자 혼용가능(한글 기준 10자 이내)</label>
                            </div>
                            <div className = {`${styles.setField} border-bottom`}>
                                <label className="form-label fw-bold" htmlFor={"float1ingTextarea1"} style={{width:'100px'}}>소개글</label>
                                <div className="form-floating">
                                    <textarea className="form-control" placeholder={"Leave a comment here"} id={"floatingTextarea2"} style={{width:'300px',height: '120px'}}></textarea>
                                    <label htmlFor={"float1ingTextarea1"}>자기소개를 입력하세요</label>
                                </div>
                                <label className="text-body-tertiary ps-3" htmlFor={"exampleFormControlInput2"}>프로필 이미지는 가로 160px<br/> 섬네일로 생성됩니다.</label>
                            </div>
                            <div className = {`${styles.setField} border-bottom`}>
                                <label className="form-label fw-bold" htmlFor={"exampleFormControlInput3"} style={{width:'100px'}}>프로필 이미지</label>
                                <img src="/image/logo-kakao.png " className="img-thumbnail ms-5" alt="..."/>
                                <div className="container text-center">
                                    <div className="row row-cols-2 ms-2">
                                        <div className="input-group col " style={{width:'510px'}}>
                                            <input type="file" className="form-control " id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload"/>
                                            <button  type="button" className={`btn btn-primary ps-4 pe-4 `} id="inputGroupFileAddon04" >등록</button>
                                        </div>
                                        <label className="text-body-tertiary col text-start" htmlFor={"exampleFormControlInput2"} style={{width:'510px'}}>한글, 영문, 숫자 혼용가능(한글 기준 10자 이내)</label>
                                    </div>
                                </div>
                            </div>
                            <div className = {`${styles.setField} border-bottom`}>
                                <label className="form-label fw-bold" htmlFor={"float1ingTextarea1"} style={{width:'100px'}}>구글<br/>애널리틱스<br/>정보</label>
                                <div className="form-floating">
                                    <textarea className="form-control" placeholder={"Leave a comment here"} id={"floatingTextarea2"} style={{width:'300px',height: '120px'}}></textarea>
                                    <label htmlFor={"float1ingTextarea1"}>구글 애널리틱스 정보입니다.</label>
                                </div>
                                <label className="text-body-tertiary ps-3" htmlFor={"exampleFormControlInput2"}>구글 애널리틱스 정보입니다.</label>
                            </div>
                            <div className = {styles.setField} >
                                <button type="submit" className="btn btn-primary mt-2 ps-5 pe-5 pt-2 pb-2" style={{margin:'auto'}}>저장</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
