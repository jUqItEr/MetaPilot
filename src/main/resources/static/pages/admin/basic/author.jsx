import Head from "next/head"
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/basic/author.module.css'
import AdminHeader from "../../../layout/admin/header";
import AdminSidebar from "../../../layout/admin/sidebar";
import {useEffect,useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";


/**
 * Rendering the author page.
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 04.
 * @returns
 */

export default function AdminUserAujthor() {
    const [roleUser, setRoleUser] = useState([]);
    const [roleAdmin, setRoleAdmin] = useState([]);

    const updateUserRole = (selectUserId) => {
        axios({
            params:{
                roleId: 2,
                userId: selectUserId
            },
            method: 'post',
            url: '/api/admin/updateUserRole'
        })
        .then((res) => {
            if(res.data) {
            }else{
                alert("관리자 권한으로 변경할 수 없습니다.")
            }
        })
        .catch((err) => {
            console.error('Request error:', err);
        })
    }
    const updateAdminRole = (selectUserId) => {
        axios({
            params:{
                roleId: 1,
                userId: selectUserId
            },
            method: 'post',
            url: '/api/admin/updateUserRole'
        })
        .then((res) => {
            if(res.data) {
            }else{
                alert("사용자 권한으로 변경할 수 없습니다.")
            }
        })
        .catch((err) => {
            console.error('Request error:', err);
        })
    }
    useEffect(() => { 
    axios({
        params:{
            type:1
        },
        method: 'get',
        url: '/api/admin/readUserRole'
    })
    .then((res) => {
        setRoleUser(res.data);
    })
    .catch((err) => {
        console.error('Request error:', err);
    })  

    axios({
        params:{
            type: 2
        },
        method: 'get',
        url: '/api/admin/readUserRole'
    })
    .then((res) => {
        setRoleAdmin(res.data);
    })
    .catch((err) => {
        console.error('Request error:', err);
    }) 

    }, [roleAdmin])
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
                <div className="d-flex">
                    {/*sidebar*/}
                    <AdminSidebar/>
                    {/* content */}
                    <div className={styles.content} >
                        <div className={`${styles.pageTitle }`} style={{borderBottom : '1px solid black'}}><span className={styles.pageTitleFont}>사용자 권한 설정</span></div>
                        
                        <div className={`${styles.pageContent } border-bottom`}>
                            <div> 관리자 (↓ 버튼으로 사용자로 권한 변경) </div>
                            <ul className={styles.list}>
                            {
                                roleAdmin?.map((mapper) => (
                                    <li className={`${styles.listItem}`} key={mapper.userId} data-id={mapper.userId}>
                                        <div className={styles.blockUserId}>{mapper.userId}</div>
                                        <button className={styles.xclk} type="button" onClick={() => updateAdminRole(mapper.userId)}>
                                            <FontAwesomeIcon icon={faArrowDown} style={{color:'blue',width:'10px'}}/>
                                        </button>
                                    </li>
                                ))
                            }
                            </ul> 
                        </div>
                        <div className={`${styles.pageContent }`}>
                            <div> 사용자 (↑ 버튼으로 관리자로 권한 변경) </div>
                            <ul className={styles.list}>
                            {
                                roleUser?.map((mapper) => (
                                    <li className={`${styles.listItem}`} key={mapper.userId} data-id={mapper.userId}>
                                        <div className={styles.blockUserId}>{mapper.userId}</div>
                                        <button className={styles.xclk} type="button" onClick={() => updateUserRole(mapper.userId)}>
                                            <FontAwesomeIcon icon={faArrowUp} style={{color:'red',width:'10px'}}/>
                                        </button>
                                    </li>
                                ))
                            }
                            </ul> 
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};
