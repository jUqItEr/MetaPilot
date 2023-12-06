import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/basic/user.module.css'
import logoImg from '../../../image/profileEXImg.png'
import AdminHeader from "../../../layout/admin/header";
import AdminSidebar from "../../../layout/admin/sidebar";
import {useEffect} from "react"


/**
 * Rendering the login page.
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 04.
 * @returns
 */
export default function AdminBlockUser() {
    useEffect(() => {
        $(function () {
            $('.xclk').on('click', function () {
                const itemId = $(this).closest('li').attr('id');
                console.log(` ${itemId}`);
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
            <div id={styles.wrap}>
                {/*header*/}
                <AdminHeader/>
                <div className="d-flex flex-nowrap">
                    {/*sidebar*/}
                    <AdminSidebar/>
                    {/* content */}
                    <div className={styles.content} >
                        <div className={styles.pageTitle}><span className={styles.pageTitleFont}>차단설정</span></div>
                        <div className={styles.pageContent}>
                            <div className={styles.pageSubTitle}>사용자 차단</div>
                            <div className={styles.searchField}>
                                <form className={styles.formTarget}>
                                    <div className="col-7">
                                        <input type="text" className="form-control" id="blockId" placeholder="차단할 사용자 아이디"/>
                                    </div>
                                    <div className="col-4">
                                        <button type="submit" className="btn btn-primary mb-3"  style={{backgroundColor: '#188ACC'}}>차단하기</button>
                                    </div>
                                </form>
                            </div>

                            <ul className={styles.list}>
                                <li id="List_ITEM1" className={`${styles.listItem} `}>
                                    <div className={styles.blockUserId}>sadfsdfasdfasdf</div>
                                    <a href="#" className="xclk">x</a>
                                </li>
                                <li id="List_ITEM2" className={`${styles.listItem} `}>
                                    <div className={styles.blockUserId}>sadfsdfasdfasdf</div>
                                    <a href="#" className="xclk">x</a>
                                </li>
                                <li id="List_ITEM3" className={`${styles.listItem} `}>
                                    <div className={styles.blockUserId}>sadfsdfasdfasdf</div>
                                    <a href="#" className="xclk">x</a>
                                </li>
                                <li id="List_ITEM4" className={`${styles.listItem} `}>
                                    <div className={styles.blockUserId}>sadfsdfasdfasdf</div>
                                    <a href="#" className="xclk">x</a>
                                </li>
                                <li id="List_ITEM5" className={`${styles.listItem} `}>
                                    <div className={styles.blockUserId}>sadfsdfasdfasdf</div>
                                    <a href="#" className="xclk">x</a>
                                </li>
                            </ul>


                            <div className={styles.blockInfo}>
                                <ul>
                                    <li>사용자의 블로그 아이디를 기준으로 차단합니다.</li>
                                    <li>차단한 사용자는 히원님에게 공감,댓글, 안부글을 남길 수 없습니다.</li>
                                    <li>히원님은 차단한 사용자와 이웃관계를 맺을 수 없습니다.</li>
                                    <li>회원님은 차단한 사용자의 모든 콘텐츠를 볼 수 없습니다.</li>
                                    <li>차단된 이웃수가 반영되기까지 최대 5분 정도 소요될 수 있습니다.</li>
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};
