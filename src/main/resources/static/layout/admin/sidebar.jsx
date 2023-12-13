import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../styles/admin/layout/sidebar.module.css'
import React, {useEffect,useState} from "react";
import {faBars} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGripLines} from "@fortawesome/free-solid-svg-icons";
import Link from 'next/link';

/**
 * Rendering the login page.
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 04.
 * @returns
 */
export default function AdminSidebar() {
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    const [isMobile, setIsMobile] = useState(false);

    
    useEffect(() => {
    const handleResize = () => {
        const isMobile = window.innerWidth <= 768; // Adjust the width as needed
        const sidebarElement = document.querySelector(`.${styles.sidebar}`);

        if (isMobile) {
        sidebarElement.style.float = "left";
        sidebarElement.style.position = "fixed";
        sidebarElement.style.left = "50px";
        } else {
        // Reset styles for non-mobile devices
        sidebarElement.style.float = "none";
        sidebarElement.style.position = "static";
        sidebarElement.style.left = "auto";
        }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call handleResize initially to apply styles on page load
    handleResize();

    // Remove event listener on component unmount
    return () => {
        window.removeEventListener("resize", handleResize);
    };
    }, []);

  
    return (
        <>
            <Head>
                <title>관리자 페이지</title>
                <meta property='og:title' content='관리자 페이지' key='title'/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            {/* side bar */}
            <div className={styles.openbar} onClick={toggleSidebar}  >
                <button className={styles.barbtn}>
                    <FontAwesomeIcon icon={isSidebarOpen ? faGripLines : faBars } className={styles.fortawesomeIcon} />
                </button>
            </div>
            <div className={`${styles.sidebar} flex-shrink-0 `} style={{ width: isSidebarOpen ? '200px' : '0px'}}>
                <ul className={`${styles.sidebarlist} list-unstyled ps-0`} >
                    <li className="mb-1">
                        <button className={`${styles.btnToggle} btn  d-inline-flex align-items-center rounded border-0 collapsed`}  data-bs-toggle="collapse" data-bs-target="#home-collapse" aria-expanded="true">
                            기본설정
                        </button>
                        <div className="collapse show" id="home-collapse">
                            <ul className={`${styles.btnToggleNav } list-unstyled fw-normal pb-1 small`} >
                                <li>
                                    <Link href={"/admin/basic/info"}>
                                        <a className="link-body-emphasis d-inline-flex text-decoration-none rounded">블로그 정보</a>
                                    </Link>
                                </li>
                            </ul>
                            <ul className={`${styles.btnToggleNav } list-unstyled fw-normal pb-1 small`} >
                                <li>
                                    <Link href={"/admin/basic/user"}>
                                        <a className="link-body-emphasis d-inline-flex text-decoration-none rounded">사용자 차단</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className={`${styles.btnToggle } btn  d-inline-flex align-items-center rounded border-0 collapsed `}  data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                            디자인 설정
                        </button>
                        <div className="collapse" id="dashboard-collapse">
                            <ul className={`${styles.btnToggleNav  } list-unstyled fw-normal pb-1 small`} >
                                <li>
                                    <Link href={"/admin/design/layout"}>
                                        <a className="link-body-emphasis d-inline-flex text-decoration-none rounded">카테고리 관리</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li className="mb-1">
                        <button className={`${styles.btnToggle }  btn  d-inline-flex align-items-center rounded border-0 collapsed `} data-bs-toggle="collapse" data-bs-target="#orders-collapse" aria-expanded="false">
                            메뉴, 글 관리
                        </button>
                        <div className="collapse" id="orders-collapse">
                            <ul className={`${styles.btnToggleNav } list-unstyled fw-normal pb-1 small `} >
                                <li>
                                    <Link href={"/admin/menu/category"}>
                                        <a className="link-body-emphasis d-inline-flex text-decoration-none rounded">카테고리 관리</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/admin/menu/post"}>
                                        <a className="link-body-emphasis d-inline-flex text-decoration-none rounded">게시글 관리</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/admin/menu/comment"}>
                                        <a className="link-body-emphasis d-inline-flex text-decoration-none rounded">댓글 관리</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href={"/admin/menu/tag"}>
                                        <a className="link-body-emphasis d-inline-flex text-decoration-none rounded">해시태그 관리</a>
                                    </Link>
                                </li> 
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
                                <li>
                                    <Link href={"/admin/statistics/views"}>
                                        <a className="link-body-emphasis d-inline-flex text-decoration-none rounded">조회수</a>
                                    </Link>
                                </li> 
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>

        </>
    )
};