import { useRouter } from 'next/router';

import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $, { map } from 'jquery'
import styles from '../../../styles/admin/menu/comment.module.css'
import {useEffect, useState} from "react"
import AdminHeader from "../../../layout/admin/header"
import AdminSidebar from "../../../layout/admin/sidebar"
/**
 * Rendering the blog info page
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 07.
 * @returns
 * 
 * @author Ha Seong Kim
 * @since 2023. 12. 13.
 * @returns
 */
export default function AdminCommentPage() {
    const router = useRouter();
    const { search } = router.query;

    const [data, setData] = useState([]);
    const [commentUserTblId, setCommentUserTblId] = useState("");
    const [selectedComments, setSelectedComments] = useState([]);
    const [selectedComments2, setSelectedComments2] = useState([]);
    const [searchText, setSearchText] = useState("");

    
    const deleteSelectedComments = () => {
        axios.all(selectedComments.map((commentId) => axios.post("/api/admin/deleteComment", { id: commentId })))
            .then((responses) => {
                console.log("Deleted comments : ", responses);
                window.location.reload();
            })
            .catch((error) => {
                console.error("Error deleting comments:", error);
            });
    };

    const createBlockUser = () => {
        axios.all(
            selectedComments2.map((uniqueKey) => {
                const [id, userTblId] = uniqueKey.split('?');
                return axios({
                    method: 'post',
                    params: {
                        userId: userTblId
                    },
                    url: '/api/admin/createBlockUser'
                });
            })
        )
        .then((responses) => {
            console.log("Block users responses:", responses);
            window.location.reload();
        })
        .catch((error) => {
            console.error("Error blocking users:", error);
        });
    };

    useEffect(() => {
        if (search) {
            axios({
                method: "get",
                params: { "nickname": search },
                url: "/api/admin/commentSearchList",
            }).then((res) => {
                setData(res.data);
                console.log(res.data);
            });
        }
    }, [search]);

    const handleCommentClick = (mapper) => {
        if (selectedComments.includes(mapper.id)) {
            setSelectedComments((prevSelected) =>
                prevSelected.filter((id) => id !== mapper.id));
        } else {
            setSelectedComments((prevSelected) => [...prevSelected, mapper.id]);
        }
    };

    const handleCommentClick2 = (mapper) => {
        setCommentUserTblId(mapper.userTblId);

        const uniqueKey = `${mapper.id}?${mapper.userTblId}`;
    
        if (selectedComments2.includes(uniqueKey)) {
            setSelectedComments2((prevSelected) =>
                prevSelected.filter((key) => key !== uniqueKey)
            );
        } else {
            setSelectedComments2((prevSelected) => [...prevSelected, uniqueKey]);
        }
    };

    const searchComment = () => {
        if(searchText === "") {
            alert('사용자의 닉네임을 입력하시오!');
        } else {
            router.push(`/admin/menu/commentSearch?search=${searchText}`);
        }
    }

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
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <input className='form-control' type='text'id='searchText' value={searchText}
                                style={{width: '200px', marginLeft: '30px'}}
                                onChange={(e) => setSearchText(e.target.value)}/>
                            <button className='btn btn-primary' type='button' style={{marginLeft: '10px'}}
                                onClick={searchComment}>검색</button>
                        </div>
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
                                {data?.map((mapper) => {
                                    return (
                                        <tr key={mapper.id}>
                                            <td><input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                                            checked={selectedComments.includes(mapper.id)}
                                            onChange={() => {
                                                handleCommentClick(mapper);
                                                handleCommentClick2(mapper);
                                            }} /></td>
                                            <td>
                                                <div className={'fs-5 fw-bold'}>{mapper.nickname} (id : {mapper.id})</div>
                                                <div className={'fs-6'} style={{ width: '160px', marginRight: '30px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>@{mapper.userTblId}</div>
                                            </td>
                                            <td>
                                                <div className={'fs-6 fw-bold'}>{mapper.postSubject}</div>
                                                <div className={'fs-6'}>{mapper.content}</div>
                                                <div className={'fs-6'}>{mapper.createdAt}</div>
                                            </td>
                                        </tr>
                                    )
                                })}
                                </tbody>
                            </table>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <button type="submit" className="btn btn-primary fs-5 fw-bold  m-3 px-5 py-1"
                                    onClick={deleteSelectedComments}>삭제</button>
                                <button type="submit" className="btn btn-primary fs-5 fw-bold m-3 px-5 py-1"
                                    onClick={() => {
                                        createBlockUser(commentUserTblId);
                                        deleteSelectedComments();
                                    }}>차단후 삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
