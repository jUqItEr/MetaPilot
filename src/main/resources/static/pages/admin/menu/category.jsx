import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/menu/category.module.css'
import {useEffect} from "react"
import AdminHeader from "../../../layout/admin/header"
import AdminSidebar from "../../../layout/admin/sidebar"

/**
 * Rendering the login page.
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 04.
 * @returns
 */
export default function AdminCatePage() {
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
                        <div className={`${styles.pageTitle } border-bottom`}><span className={styles.pageTitleFont}>카테고리 관리</span></div>
                        <div className= {`${styles.pageContent } border-bottom`}>
                           <div className={styles.listField}>
                               <div className={styles.btnField}>
                                   <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `} >+ 카테고리 추가</button>
                                   <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `} >+ 구분선 추가</button>
                                   <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `} >- 삭제</button>
                               </div>
                               <div  style={{maxHeight:'400px', overflowY: 'auto', width:'350px'}}>
                                   <div className="list-group">
                                       <button type="button" className="list-group-item list-group-item-action ">hello(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">hi(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">memo(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">hello(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">hi(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">memo(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">hello(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">hi(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">memo(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">hello(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">hi(1)</button>
                                       <button type="button" className="list-group-item list-group-item-action">memo(1)</button>
                                   </div>
                               </div>
                           </div>
                           <div className={styles.setting}>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>카테고리 명</label>
                                   <input className={styles.set1} name={"categoryName"} type={"text"} placeholder={"카테고리명"} />
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>글 개수 표시</label>
                                   <input className={styles.set2} id={"cntMark"} name={"cntMark"} type={"checkbox"} placeholder={"게시판"} />
                                   <label htmlFor={"cntMark"}>카테고리 옆에 글 개수 표시</label>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>공개설정</label>
                                   <input className={styles.set3} type={"radio"} id={"public"} name={"lock"} value={"public"}/>
                                   <label htmlFor={"public"}>공개</label>
                                   <input className={styles.set3} type={"radio"} id={"private"} name={"lock"} value={"private"}/>
                                   <label htmlFor={"private"}>비공개</label>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>글보기</label>
                                   <input className={styles.set4} type={"radio"} id={"viewBlog"} name={"postView"}  value={"viewBlog"}/>
                                   <label htmlFor={"viewBlog"} ><Image className={styles.viewImg}  src='/image/viewBlog.png' alt='이미지' width={30} height={30} />블로그형</label>
                                   <input className={styles.set4} type={"radio"} id={"viewAlbum"}  name={"postView"} value={"viewAlbum"}/>
                                   <label htmlFor={"viewAlbum"}><Image className={styles.viewImg}  src='/image/viewAlbum.png' alt='이미지' width={30} height={30} />앨범형</label>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>목록보기</label>
                                   <input className={styles.set5} type={"radio"} id={"listViewClose"} name={"listView"} value={"close"}/>
                                   <label htmlFor={"listViewClose"}>목록 닫기</label>
                                   <input className={styles.set5} type={"radio"} id={"listViewOpen"}  name={"listView"} value={"open"}/>
                                   <label htmlFor={"listViewOpen"}>목록 열기</label>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>카테고리 접기</label>
                                   <input className={styles.set6} type={"radio"} id={"cateViewClose"} name={"cateView"}  value={"cateViewClose"}/>
                                   <label htmlFor={"cateViewClose"}>펼치기</label>
                                   <input className={styles.set6} type={"radio"} id={"cateViewOpen"}  name={"cateView"} value={"cateViewOpen"}/>
                                   <label htmlFor={"cateViewOpen"}>접기</label>
                               </div>
                               <button type="submit" className={`${styles.subBtn }  btn btn-primary mb-3`} >레이아웃 적용</button>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
