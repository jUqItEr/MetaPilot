import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/menu/comment.module.css'
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
export default function AdminCommentPage() {
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
                        <div className= {`${styles.pageTitle } border-bottom `}><span className={styles.pageTitleFont}>댓글</span></div>
                        <label className="text-body-tertiary p-3">내 블로그에 등록된 댓글을 모아서 보면서 ID 기준으로 차단 설정을 할 수 있습니다</label>
                        <div className= {`${styles.pageContent } border-bottom `}>
                            <div class={"border-bottom"} style={{maxHeight:'600px', overflowY: 'auto' }}>
                            <table className="table table-hover " style={{width :'950px',height:'100px'}}>
                                <thead className={'table-secondary'}>
                                <tr>
                                    <th style={{width:'50px'}}><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></th>
                                    <th style={{width:'150px'}}>작성자</th>
                                    <th style={{width:'800px'}}>내용</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></td>
                                    <td>
                                        <div className={'fs-5 fw-bold'}>김수현</div>
                                        <div className={'fs-6'}>gommzzy</div>
                                    </td>
                                    <td>
                                        <div className={'fs-6 fw-bold'}>글 제목text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate </div>
                                        <div className={'fs-6'}>댓글 내용</div>
                                        <div className={'fs-6'}>2023. 12. 08. 01:21</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></td>
                                    <td>
                                        <div className={'fs-5 fw-bold'}>김수현</div>
                                        <div className={'fs-6'}>gommzzy</div>
                                    </td>
                                    <td>
                                        <div className={'fs-6 fw-bold'}>글 제목text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate </div>
                                        <div className={'fs-6'}>댓글 내용</div>
                                        <div className={'fs-6'}>2023. 12. 08. 01:21</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></td>
                                    <td>
                                        <div className={'fs-5 fw-bold'}>김수현</div>
                                        <div className={'fs-6'}>gommzzy</div>
                                    </td>
                                    <td>
                                        <div className={'fs-6 fw-bold'}>글 제목text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate </div>
                                        <div className={'fs-6'}>댓글 내용</div>
                                        <div className={'fs-6'}>2023. 12. 08. 01:21</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></td>
                                    <td>
                                        <div className={'fs-5 fw-bold'}>김수현</div>
                                        <div className={'fs-6'}>gommzzy</div>
                                    </td>
                                    <td>
                                        <div className={'fs-6 fw-bold'}>글 제목text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate </div>
                                        <div className={'fs-6'}>댓글 내용</div>
                                        <div className={'fs-6'}>2023. 12. 08. 01:21</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></td>
                                    <td>
                                        <div className={'fs-5 fw-bold'}>김수현</div>
                                        <div className={'fs-6'}>gommzzy</div>
                                    </td>
                                    <td>
                                        <div className={'fs-6 fw-bold'}>글 제목text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate </div>
                                        <div className={'fs-6'}>댓글 내용</div>
                                        <div className={'fs-6'}>2023. 12. 08. 01:21</div>
                                    </td>
                                </tr>
                                <tr>
                                    <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"/></td>
                                    <td>
                                        <div className={'fs-5 fw-bold'}>김수현</div>
                                        <div className={'fs-6'}>gommzzy</div>
                                    </td>
                                    <td>
                                        <div className={'fs-6 fw-bold'}>글 제목text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate text-truncate </div>
                                        <div className={'fs-6'}>댓글 내용</div>
                                        <div className={'fs-6'}>2023. 12. 08. 01:21</div>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <button type="submit" className="btn btn-primary fs-5 fw-bold  m-3 px-5 py-1">삭제</button>
                                <button type="submit" className="btn btn-primary fs-5 fw-bold m-3 px-5 py-1">차단후 삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
