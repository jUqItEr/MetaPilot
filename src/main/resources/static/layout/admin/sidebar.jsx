import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../styles/admin/layout/sidebar.module.css'
import {useEffect} from "react";

/**
 * Rendering the login page.
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 04.
 * @returns
 */
export default function AdminSidebar() {

    useEffect(() => {
        $(function () {
            $(".toggleBtn").click(function () {
                $(".wrapper").toggleClass("toggled");
            });
        });
    }, []);
    return (
        <>
            <Head>
                <title>관리자 페이지</title>
                <meta property='og:title' content='관리자 페이지' key='title'/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            {/* side bar */}
            <div className={`${styles.sidebar} flex-shrink-0 `} style={{width: '200px',height:'calc(100vh - 62px)', overflowX: 'hidden', borderRight:'1px solid lightgray',margin:'0',padding:'0'}}>

                <ul className="list-unstyled ps-0" style={{margin:'20px 0 0 5px'}}>
                    <li className="mb-1">
                        <button className={`${styles.btnToggle} btn  d-inline-flex align-items-center rounded border-0 collapsed`}  data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                            기본설정
                        </button>
                        <div className="collapse show" id="home-collapse">
                            <ul className={`${styles.btnToggleNav } list-unstyled fw-normal pb-1 small`} >
                                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">블로그 정보</a></li>
                            </ul>
                            <ul className={`${styles.btnToggleNav } list-unstyled fw-normal pb-1 small`} >
                                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">사용자관리(차단)</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className={`${styles.btnToggle } btn  d-inline-flex align-items-center rounded border-0 collapsed `}  data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                            디자인 설정
                        </button>
                        <div className="collapse" id="dashboard-collapse">
                            <ul className={`${styles.btnToggleNav  } list-unstyled fw-normal pb-1 small`} >
                                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">레이아웃 관리</a></li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className={`${styles.btnToggle }  btn  d-inline-flex align-items-center rounded border-0 collapsed `} data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                            메뉴, 글 관리
                        </button>
                        <div className="collapse" id="orders-collapse">
                            <ul className={`${styles.btnToggleNav } list-unstyled fw-normal pb-1 small `} >
                                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">카테고리 관리</a></li>
                                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">댓글관리</a></li>
                                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">해시태그 일괄변경</a></li>
                            </ul>
                        </div>
                    </li>
                    {/*구분선*/}
                    {/*<li className="border-top my-3"></li>*/}
                    <li className="mb-1">
                        <button className={`${styles.btnToggle}  btn d-inline-flex align-items-center rounded border-0 collapsed `} data-bs-toggle="collapse" data-bs-target="#account-collapse" aria-expanded="false">
                            내 블로그 통계
                        </button>
                        <div className="collapse" id="account-collapse">
                            <ul className={`${styles.btnToggleNav } list-unstyled fw-normal pb-1 small `}  >
                                <li><a href="#" className="link-body-emphasis d-inline-flex text-decoration-none rounded">조회수</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
};
