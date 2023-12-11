import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/menu/tag.module.css'
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
export default function AdminHashTagPage() {
    return(
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
                        <div className={`${styles.pageTitle } border-bottom `}><span className={styles.pageTitleFont}>해시태그 일괄 변경</span></div>
                        <div className= {`${styles.pageContent } border-bottom `}>
                            <div className={styles.listField}>
                                <div  style={{maxHeight:'400px', overflowY: 'auto', width:'350px'}}>
                                    <div className="list-group">
                                        <button type="button" className="list-group-item list-group-item-action ">#hello(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#hi(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#memo(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#hello(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#hi(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#memo(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#hello(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#hi(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#memo(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#hello(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#hi(1)</button>
                                        <button type="button" className="list-group-item list-group-item-action">#memo(1)</button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.setting} >
                                <label className="pb-3">태그 정렬</label>
                                <div className="input-group mb-5">
                                    <button className="btn btn-primary ps-5 pe-5 " type="button" id="btnOrderUse" style={{border:'1px solid white'}} >사용순</button>
                                    <button className="btn btn-primary ps-5 pe-5" type="button" id="btnOrderABC"style={{border:'1px solid white'}} >가나다순</button>

                                </div>
                                <label className="pb-3 mt-5">태그 수정, 삭제</label>
                                <div className="input-group ">
                                    <input type="text" className="form-control" placeholder="수정할 해시태그명을 입력하세요."   aria-describedby="button-addon2"/>
                                    <button className="btn btn-primary ps-3 pe-3" type="button" id="btnUpdate" style={{border:'1px solid white'}}>수정</button>
                                    <button className="btn btn-primary ps-3 pe-3" type="button" id="btnDelete" style={{border:'1px solid white'}}>삭제</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};
