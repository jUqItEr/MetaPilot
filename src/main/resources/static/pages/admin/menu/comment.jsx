import Head from "next/head"
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
 * @since 2023. 12. 14.
 * @returns
 */
export default function AdminCommentPage() {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [requestTime, setRequestTime] = useState(new Date())

    const blockUser = async (userId) => {
        await axios({
            method: 'post',
            params: {
                userId: userId
            },
            url: '/api/admin/createBlockUser'
        })
        .then((responses) => {
            console.log("Block users responses:", responses);
        })
        .catch((error) => {
            console.error("Error blocking users:", error);
        });
    };

    const checkAll = () => {
        const checkboxAll = $('#flexCheckDefaultAll')

        $('.custom-checkbox').prop('checked', checkboxAll.is(':checked'))
    }

    const checkEach = () => {
        const checkboxAll = $('#flexCheckDefaultAll')
        const checkboxes = $('.custom-checkbox')

        checkboxAll.prop('checked', checkboxes.length === $('.custom-checkbox:checked').length)
    }
    
    const deleteComment = async commentId => {
        axios({
            method: 'post',
            data: {
                id: commentId
            },
            url: '/api/admin/deleteComment'
        })
        .then((res) => {
            
        })
    }

    const deleteComments = async () => {
        const selected = $('.custom-checkbox:checked')
        const id = selected.map((_, element) => {
            return $(element).data('value')
        })

        id.each((_, mapper) => {
            deleteComment(mapper)
        })
        alert('댓글이 삭제되었습니다.')
        setRequestTime(new Date())
    }

    const deleteCommentsAndBlock = async () => {
        const selected = $('.custom-checkbox:checked')
        const userId = new Set()

        selected.each((_, element) => {
            const mapper = $(element)
            userId.add(mapper.data('id'))

            deleteComment(mapper.data('value'))
        })
        userId.forEach((userId) => {
            blockUser(userId)
        })
        alert('댓글이 삭제되었습니다.')
        setRequestTime(new Date())
    }

    const searchUser = () => {
        setSearchText($('#searchText').val())
    }

    useEffect(() => {
        // 검색 조건 or 검색 조건 없이 검색 수행
        axios({
            method: "get",
            params: {
                nickname: searchText
            },
            url: '/api/admin/commentList',
        }).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
        $('#flexCheckDefaultAll').prop('checked', false)
    }, [requestTime, searchText]);

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
                        <label className="text-body-tertiary p-3">내 블로그에 등록된 댓글을 모아서 보면서 사용자 이름(닉네임) 기준으로 차단 설정을 할 수 있습니다</label>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <input className='form-control' type='text' id='searchText' style={{width: '200px', marginLeft: '30px'}}/>
                            <button className='btn btn-primary' type='button' style={{marginLeft: '10px'}}
                                onClick={searchUser}>검색</button>
                        </div>
                        <div className= {`${styles.pageContent } border-bottom `}>
                            <div className={"border-bottom"} style={{maxHeight:'600px', overflowY: 'auto' }}>
                            <table className="table table-hover " style={{width :'950px',height:'100px'}}>
                                <thead className={'table-secondary'}>
                                <tr>
                                    <th style={{width:'50px'}}><input className="form-check-input" type="checkbox" value="" id="flexCheckDefaultAll" onClick={checkAll}/></th>
                                    <th style={{width:'150px'}}>작성자</th>
                                    <th style={{width:'800px'}}>내용</th>
                                </tr>
                                </thead>
                                <tbody>
                                {data && data?.map((mapper) => (
                                    <tr key={mapper.id} data-id={mapper.id}>
                                        <td><input className="form-check-input custom-checkbox" type="checkbox" data-id={mapper.userId} data-value={mapper.id} onChange={checkEach}/></td>
                                        <td>
                                            <div className={'fs-5 fw-bold'}>{mapper.nickname} (id : {mapper.id})</div>
                                            <div className={'fs-6'} style={{ width: '160px', marginRight: '30px', wordWrap: 'break-word', overflowWrap: 'break-word' }}>@{mapper.userId}</div>
                                        </td>
                                        <td>
                                            <div className={'fs-6 fw-bold'}>{mapper.postSubject}</div>
                                            <div className={'fs-6'}>{mapper.content}</div>
                                            <div className={'fs-6'}>{mapper.createdAt}</div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            </div>
                            <div style={{display:'flex', justifyContent:'center'}}>
                                <button type="submit" className="btn btn-primary fs-5 fw-bold  m-3 px-5 py-1"
                                    onClick={deleteComments}>삭제</button>
                                <button type="submit" className="btn btn-primary fs-5 fw-bold m-3 px-5 py-1"
                                    onClick={deleteCommentsAndBlock}>차단후 삭제</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
