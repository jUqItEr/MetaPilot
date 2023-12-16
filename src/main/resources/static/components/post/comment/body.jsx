import React, { useEffect, useState } from 'react'
import styles from '/styles/post/post.module.css'
import CommentLike from './response'
import axios from 'axios'
import $ from 'jquery'
import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsis, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'


const CommentsList = ({ pid }) => {
    const [comments, setComments] = useState([])
    const [user, setUser] = useState([])
    const [menuVisible, setMenuVisible] = useState([])
    const [formVisible, setFormVisible] = useState({})
    const [requestTime, setRequestTime] = useState(new Date())
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editingContent, setEditingContent] = useState("");

    // File Handler 부분이라 남겨둠
    const createCommentSubmit = async (e) => {
        // e.preventDefault()

        // const content = e.target.content.value

        // if (content !== '') {
        //     const formData = new FormData(e.target)

        //     const data = {
        //         'userId': e.target.userId.value,
        //         'postId': e.target.postId.value,
        //         'content': content
        //     }
        //     console.log(e.target)
        //     console.log(data)
        //     console.log(e.target.files)
        //     formData.append('request', new Blob([JSON.stringify(data)], {
        //         type: 'application/json'
        //     }))

        //     axios({
        //         data: formData,
        //         headers: {
        //             'Content-Type': 'Multipart/form-data'
        //         },
        //         method: 'post',
        //         url: '/api/comment/create'
        //     })
        //     .then((res) => {
        //         console.log(res)
        //     })
        // } else {
        //     alert('답글을 작성하려면 내용을 입력해주세요.')
        // }


    }

    /**
     * 댓글 / 답글 작성 통합 메서드
     *
     * @author Kiseok Kang
     * @since 2024. 12. 14.
     * @version 2.1.0
     */
    const handleComment = async ({ id, rootId, visible }) => {
        let content
        let params = {
            postId: pid,
            userId: user?.id
        }
        let depth = 0
        let errorMessage = '댓글'

        if (id === undefined) {
            // 댓글 작성 모드
            content = $('#comment')
        } else {
            // 답글 작성 모드 (대댓글도 지원함)
            content = $(`textarea[data-id=c${id}]`)
            depth = 1

            /**
             * refId: 대댓글 작성 시 사용할 부분
             * rootId: 원 부모 아이디 참조
             */
            params.refId = id
            params.rootId = rootId

            toggleFormVisible(id)
        }
        if (content.val() !== '') {
            params.content = $(content).val()
            params.depth = depth
            // 댓글 및 답글의 공개 여부
            params.visible = visible

            await axios({
                method: 'post',
                params: params,
                url: '/api/comment/create'
            })
            .then(_ => {
                // 폼 재갱신하고 댓글 작성한 내용 비우기
                setRequestTime(new Date())
                $(content).val('')
            })
        } else {
            alert(`${errorMessage}을 작성하려면 내용을 입력해주세요.`)
        }
    }

    const deleteComment = async ({ id }) => {
        if (confirm("댓글을 삭제하시겠습니까?")) {
            try {
                await axios({
                    method: "post",
                    params: {
                        id: id
                    },
                    url: "/api/comment/delete"  
                })
                .then(_ => { 
                    alert('댓글이 삭제되었습니다.')
                    setRequestTime(new Date())
                })
            } catch (error) {
                console.error("댓글 삭제 실패");
            }
        }
    }

    const updateComment = async ({ id }) => {
        if (!editingContent.trim()) {
            alert("수정할 댓글 내용을 입력해주세요.")
            return
        }
        try {
            await axios({
                method: "post",
                params: {
                    id: id,
                    content: content
                },
                url: "/api/comment/update"
            })
            .then(_ => {
                alert("댓글이 수정되었습니다.")
                setRequestTime(new Date())
            })
        } catch (error) {
            console.error("댓글 수정 실패")
        }
    }

    // 댓글, 답글 좋아요
    const toggleLike = ({ id }) => {
        axios({
            method: 'post',
            params: {
                commentId: id,
                userId: user?.id
            },
            url: '/api/comment/response/update'
        })
        .then(_ => {
            setRequestTime(new Date())
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const toggleFormVisible = ({ id }) => {
        setFormVisible(prevState => (prevState === id ? null : id))
    }

    // 메뉴 토글 핸들러
    const toggleMenu = (id) => {
        setMenuVisible(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    }

    // 댓글 수정 폼 토글
    const toggleEditForm = (comment) => {
        setEditingCommentId(comment.id);
        setEditingContent(comment.content);
    };

    useEffect(() => {
        // 사용자 정보 불러오기
        setUser(JSON.parse(localStorage.getItem('user')))

        // 댓글 리스트 불러오기
        axios({
            method: 'get',
            params: {
                postId: pid, // postId를 prop으로부터 받아오도록 수정했습니다.
                visible: 1
            },
            url: '/api/comment/list',
        }).then((res) => {
            setComments(res.data)
        })
    }, [user?.id, requestTime])

    return (
        <div className={styles.commentsWrap}>
            {comments?.map((comment, index) => (
                <div id={`c${comment.id}`} key={index} className={comment.depth ? styles.commentForm : styles.replyForm}>
                    <div className={styles.commentHeader}>
                        <strong>{comment.nickname}</strong>
                        {user?.id === comment.userId && (
                            <div className={styles.menu}>
                                <button type="button" className="btn" onClick={() => toggleMenu(comment.id)}>
                                    <span className={styles.menuIcon}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} size='1x' />
                                    </span>
                                </button>
                            </div>
                        )}
                    </div>
                    {menuVisible[comment.id] && (
                        <div className={styles.menuItem}>
                            <div></div>
                            <div className={styles.commentMenu}>
                                <button className="btn" onClick={() => toggleEditForm(comment)}>수정</button>
                                <button className="btn" onClick={() => deleteComment(comment)}>삭제</button>
                            </div>
                        </div>

                    )}
                    <p>
                        {
                            (comment.refId !== 0 && comment.refId !== comment.rootId) && (
                                <Link href={`#c${comment.refId}`} scroll={false}>
                                    <a>
                                        <strong>{`@${comment.refNickname}`}&nbsp;</strong>
                                    </a>
                                </Link>
                            )
                        }
                        {comment.content}
                    </p>
                    <div className={styles.commentDetails}>
                        <span>{comment.createdAt}</span>
                        <div>
                            <button className='btn' onClick={() => toggleFormVisible(comment)}>
                                답글
                            </button>
                            <button className='btn' onClick={() => toggleLike(comment)}>
                                <CommentLike comment={comment} />
                                {comment.likeCount}
                            </button>
                        </div>


                    </div>
                    {formVisible === comment.id && (
                        <div className={styles.testForm}>
                            {/* 폼 내용 또는 자식 컴포넌트 */}
                            <div className={styles.commentHandlerForm}>
                                <strong>{user?.nickname}</strong>님의 답글
                                <div className={`${styles.commentInputGroup} input-group mb-3`}>
                                    <textarea type='text' className={`${styles.commentTextarea} form-control`} data-id={`c${comment.id}`} name='content'/>
                                </div>
                            </div>
                            <div className={styles.editorForm}>
                                <div className={styles.editor}>
                                    <input className='form-control form-control-sm' id='formFileSm' type='file'/>
                                    <div className={styles.inputForm}>
                                        <input type="checkbox" id="formcheck" className={styles.editorCheckbox}/>
                                        <label htmlFor="formcheck" className={styles.editorLabel}>비밀댓글</label>
                                    </div>
                                </div>
                                <div className='input-group-append'>
                                    <button className='btn btn-outline-secondary' type='button' onClick={() => handleComment({...comment, visible: 1 })}>답글 달기</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            {user ? (
                <div className={styles.postCommentForm}>
                {/* 폼 내용 또는 자식 컴포넌트 */}
                <div className={styles.commentHandlerForm}>
                    <strong>{user?.nickname}</strong>님의 댓글
                    <div className={`${styles.commentInputGroup} input-group mb-3`}>
                        <textarea type='text' id='comment' className={`${styles.commentTextarea} form-control`} />
                    </div>
                </div>
                <div className={styles.editorForm}>  
                    <div className={styles.editor}>
                        <input className='form-control form-control-sm' id='formFileSm' type='file'/>
                        <div className={styles.inputForm}>
                            <input type="checkbox" id="formcheck" className={styles.editorCheckbox}/>
                            <label htmlFor="formcheck" className={styles.editorLabel}>비밀댓글</label>
                        </div>
                    </div>
                    <div className='input-group-append'>
                        <button className='btn btn-outline-secondary' type='button' onClick={() => handleComment({visible: 1})}>댓글 달기</button>
                    </div>
                </div>
            </div>
            ) : (
                <div className={styles.postCommentForm}>
                    로그인 후 이용해주세요.
                </div>
            )}
        </div>
    )
}

export default CommentsList