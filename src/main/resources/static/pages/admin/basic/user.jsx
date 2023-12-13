import Head from "next/head"
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/basic/user.module.css'
import AdminHeader from "../../../layout/admin/header";
import AdminSidebar from "../../../layout/admin/sidebar";
import {useEffect,useState} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";


/**
 * Rendering the login page.
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 04.
 * @returns
 */
export default function AdminBlockUserPage() {
    const [isMobile, setIsMobile] = useState(false);
    const [block, setBlock] = useState([]);

    const createBlock = () => {
        const userId = $('#blockId').val()
        
        if (userId !== '') {
            axios({
                params: {
                    userId: userId
                },
                method: 'post',
                url: '/api/admin/createBlockUser'
            })
            .then((res) => {
                if (res.data) {
                    setBlock([...block, { userId: userId }])
                } else {
                    alert("차단한 사용자를 찾을 수 없습니다.")
                    $('#blockId').val('')
                }
            })
            .catch((err) => {
                console.error('Request error:', err);
            })   
        } else {
            alert("차단할 사용자 아이디를 입력하세요.")
        }
    }

    const deleteBlock = userId => {
        axios({
            params: {
                userId: userId
            },
            method: 'post',
            url: '/api/admin/deleteBlockUser'
        })
        .then((res) => { 
            if (res.data) {
                $(`li[data-id=${userId}]`).remove()
            }   
        })
        .catch((err) => {
            console.error('Request error:', err);
        })
    };


    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/admin/readBlockUser'
        })
        .then((res) => {
            setBlock(res.data)
        })
        .catch((err) => {
            console.log(err)
        })


        
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);

            const list = document.querySelector(`.${styles.list}`); 
            const blockInfo = document.querySelector(`.${styles.blockInfo}`);

            if (mobile) {
                list.style.width ='200px';
                blockInfo.style.fontSize = '10px';
            }
 
            if (!mobile) {  

            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
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
            <div id={styles.wrap}>
                {/*header*/}
                <AdminHeader/>
                <div className="d-flex flex-nowrap">
                    {/*sidebar*/}
                    <AdminSidebar/>
                    {/* content */}
                    <div className={styles.content} >
                        <div className={`${styles.pageTitle } border-bottom`}><span className={styles.pageTitleFont}>차단설정</span></div>
                        <div className={`${styles.pageContent } border-bottom`}>
                            <div className={styles.pageSubTitle}>사용자 차단</div>
                            <div className={styles.searchField}>
                                <form className={styles.formTarget}>
                                    <div className="col-7">
                                        <input type="text" className="form-control" id="blockId" placeholder="차단할 사용자 아이디"/>
                                    </div>
                                    <div className="col-5">
                                        <button className={`btn btn-primary mb-3`} type="button" onClick={() => createBlock()}>차단하기</button>
                                    </div>
                                </form>
                            </div>

                            <ul className={styles.list}>
                                {
                                    block?.map((mapper) => (
                                        <li className={`${styles.listItem}`} key={mapper.userId} data-id={mapper.userId}>
                                            <div className={styles.blockUserId}>{mapper.userId}</div>
                                            <button className={styles.xclk} type="button" onClick={()=> deleteBlock(`${mapper.userId}`)}>
                                                <FontAwesomeIcon icon={faX} style={{color:'black',width:'7px'}}/>
                                            </button>
                                        </li>       
                                    ))
                                }
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
