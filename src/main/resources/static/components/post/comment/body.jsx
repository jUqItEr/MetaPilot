import React, { useEffect, useState } from 'react'
import styles from '/styles/post/post.module.css'
import CommentLike from './response'
import axios from 'axios'
import $ from 'jquery'
import Link from 'next/link'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical, faLock, faRectangleXmark } from '@fortawesome/free-solid-svg-icons'


const CommentsList = ({ pid, requestTime, setRequestTime }) => {
    const [comments, setComments] = useState([])
    const [user, setUser] = useState([])
    const [formVisible, setFormVisible] = useState({})

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

    const deleteComment = async ({ id }) => {
        if (confirm('댓글을 삭제하시겠습니까?')) {
            await axios({
                method: 'post',
                params: {
                    id: id
                },
                url: '/api/comment/delete'
            })
            .then(_ => { 
                alert('댓글이 삭제되었습니다.')
                setRequestTime(new Date())
            })
            .catch(_ => console.error('댓글 삭제 실패'))
        }
        $('.comment-menu').css('display', 'none')
    }

    /**
     * 댓글 / 답글 작성 통합 메서드
     *
     * @author Kiseok Kang
     * @since 2024. 12. 14.
     * @version 2.1.0
     */
    const handleComment = async ({ id, rootId }) => {
        let content
        let params = {
            postId: pid,
            userId: user?.id
        }
        let depth = 0
        let errorMessage = '댓글'
        let secret

        if (id === undefined) {
            // 댓글 작성 모드
            content = $('#comment')
            secret = $('#commentMainVisible')
        } else {
            // 답글 작성 모드 (대댓글도 지원함)
            content = $(`textarea[data-id=c${id}]`)
            secret = $(`input[data-id=c${id}]`)
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
            params.visible = $(secret).is(':checked') ? 0 : 1
            console.log('secret? ', $(secret).is(':checked'))

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
        $('.reply-menu').hide()
        $('.content-form').show()
        $('.update-form').hide()
        $('.comment-menu').hide()
    }

    const hasAdmin = () => {
        return user !== null && user?.role?.roleEntity?.id !== 1
    }

    const hasAuthority = ({ userId, refUserId }) => {
        return (user?.id === userId || user?.id === refUserId)
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

        $('.content-form').show()
        $('.update-form').hide()
        $('.comment-menu').hide()
    }

    const toggleUpdateForm = ({ id }) => {
        $('.reply-form').hide()
        $(`.content-form:not([data-value='${id}'])`).show()
        $(`.update-form:not([data-value='${id}'])`).hide()

        $(`#c${id}`).children(':first-child').toggle()
        $(`#c${id}`).children(':last-child').toggle()

        $('.comment-menu').hide()

        setFormVisible(null)
    }

    // 메뉴 토글 핸들러
    const toggleMenu = (id) => {
        $(`.comment-menu:not([data-id='${id}'])`).hide()
        $(`.comment-menu[data-id='${id}']`).toggle()
    }

    const updateComment = ({ id }) => {
        axios({
            method: 'post',
            params: {
                id: id,
                content: $(`#update${id}`).val(),
                visible: $(`input[name=commentUpdateVisible${id}]`).is(':checked') ? 0 : 1
            },
            url: '/api/comment/update'
        })
        .then(_ => {
            alert('댓글이 수정되었습니다.')
            $('.content-form').show()
            $('.update-form').hide()
            $('.comment-menu').hide()
            setRequestTime(new Date())
        })
    }

    $(document).on('mouseup', (e) => {
        const container = $('.comment-menu')

        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.hide()
        }
    })

    useEffect(() => {
        // 사용자 정보 불러오기
        setUser(JSON.parse(localStorage.getItem('user')))

        // 댓글 리스트 불러오기
        axios({
            method: 'get',
            params: {
                postId: pid, // postId를 prop으로부터 받아오도록 수정했습니다.
                visible: 0
            },
            url: '/api/comment/list',
        }).then((res) => {
            setComments(res.data)
        })
    }, [user?.id, requestTime])

    return (
        <div className={styles.commentsWrap}>
            {comments?.map((comment, index) => (
                <div id={`c${comment.id}`} key={index} className={`${comment.depth ? styles.commentForm : styles.replyForm}`}>
                    <div className='content-form' data-value={comment.id}>
                        <div className={styles.commentHeader}>
                            {(comment.visible === 1 || (hasAuthority(comment)) || hasAdmin()) && (
                                <div style={{
                                    alignItems: 'center',
                                    display: 'flex'
                                }}>
                                    <Image
                                        className={styles.headerProfile}
                                        src={comment.profileImage || '/image/profile.png'}
                                        alt={'image'}
                                        width={20}
                                        height={20}
                                    />&nbsp;
                                    <strong>
                                        {comment.nickname}&nbsp;
                                        {(comment.visible === 0 && hasAuthority(comment)) && (<FontAwesomeIcon icon={faLock} width={12}/>)}
                                    </strong>
                                </div>
                            )}
                            {(((user?.id === comment.userId) || hasAdmin()) && comment.visible !== 2) && (
                                <div className={styles.menu}>
                                    <button type='button' className='btn' onClick={() => toggleMenu(comment.id)}>
                                        <span className={styles.menuIcon}>
                                            <FontAwesomeIcon icon={faEllipsisVertical} size='1x' />
                                        </span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className={`${styles.menuItem} comment-menu`} data-id={comment.id}>
                            <div></div>
                            <div className={styles.commentMenu}>
                                {user?.id === comment.userId && (<button className='btn' onClick={() => toggleUpdateForm(comment)}>수정</button>)}
                                <button className='btn' onClick={() => deleteComment(comment)}>삭제</button>
                            </div>
                        </div>
                        {/* 대댓글 */}
                        {(comment.visible === 1 || (hasAuthority(comment) || hasAdmin())) ? (
                            <p data-id={comment.id}>
                                {(comment.refId !== 0 && comment.refId !== comment.rootId) && (
                                    (comment.refNickname !== null) ? (
                                        <Link href={`#c${comment.refId}`} scroll={false}>
                                        <a>
                                            <strong>{`@${comment.refNickname !== null ? comment.refNickname : ''}`}</strong>
                                        </a>
                                    </Link>
                                    ) : (
                                        <FontAwesomeIcon icon={faRectangleXmark} width={18}/>
                                    )
                                )}
                                {(comment.refId !== 0 && comment.refId !== comment.rootId) && (<span>&nbsp;</span>)}
                                {comment.content}
                            </p>
                        ) : (
                            <p>{comment.visible ? comment.content : '비밀 댓글입니다.'}</p>
                        )}
                        <div className={styles.commentDetails}>
                            <span>{comment.createdAt}</span>
                            <div>
                                {((comment.visible === 1 && user !== null) || (comment.visible === 0 && (hasAuthority(comment) || hasAdmin()))) && (
                                    <button className='btn' onClick={() => toggleFormVisible(comment)}>답글</button>
                                )}
                                {comment.visible === 1 && (
                                    <button className='btn' onClick={() => user !== null && toggleLike(comment)}>
                                        <CommentLike comment={comment} />
                                        {comment.likeCount}
                                    </button>
                                )}
                            </div>
                        </div>
                        {formVisible === comment.id && (
                            <div className={`${styles.testForm} reply-form`}>
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
                                            {comment.visible !== 0 ? (
                                                <input type='checkbox' name={`commentVisible${comment.id}`} data-id={`c${comment.id}`} className={styles.editorCheckbox} />
                                            ) : (
                                                <input type='checkbox' name={`commentVisible${comment.id}`} data-id={`c${comment.id}`} className={styles.editorCheckbox} checked readOnly={true}/>
                                            )}
                                            <label htmlFor={`commentVisible${comment.id}`} className={styles.editorLabel}>비밀댓글</label>
                                        </div>
                                    </div>
                                    <div className='input-group-append'>
                                        <button className='btn btn-outline-secondary' type='button' onClick={() => handleComment({ ...comment })}>답글 달기</button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* 댓글 수정 폼 */}
                    {user?.id === comment.userId && (<div className={`${styles.postCommentForm} update-form`} data-value={comment.id} style={{display: 'none'}}>
                        {/* 폼 내용 또는 자식 컴포넌트 */}
                        <div className={styles.commentHandlerForm}>
                            <div className={styles.commentHeader}>
                                <div style={{
                                    alignItems: 'center',
                                    display: 'flex'
                                }}>
                                    <Image
                                        className={styles.headerProfile}
                                        src={comment.profileImage || '/image/profile.png'}
                                        alt={'image'}
                                        width={20}
                                        height={20}
                                    />&nbsp;
                                    <strong>
                                        {comment.nickname}&nbsp;
                                        {(comment.visible === 0 && hasAuthority(comment)) && (<FontAwesomeIcon icon={faLock} width={12}/>)}
                                    </strong>
                                    </div>
                                <div className={styles.menu}>
                                    <button type='button' className='btn' onClick={() => toggleMenu(comment.id)}>
                                        <span className={styles.menuIcon}>
                                            <FontAwesomeIcon icon={faEllipsisVertical} size='1x' />
                                        </span>
                                    </button>
                                </div>
                            </div>
                            <div className={`${styles.menuItem} comment-menu`} data-id={comment.id}>
                                <div></div>
                                <div className={styles.commentMenu}>
                                    <button className='btn' onClick={() => toggleUpdateForm(comment)}>취소</button>
                                </div>
                            </div>
                            <div className={`${styles.commentInputGroup} input-group mb-3`}>
                                <textarea type='text' id={`update${comment.id}`} className={`${styles.commentTextarea} form-control`} defaultValue={comment.content}/>
                            </div>
                        </div>
                        <div className={styles.editorForm}>  
                            <div className={styles.editor}>
                                <input className='form-control form-control-sm' id='formFileSm' type='file'/>
                                <div className={styles.inputForm}>
                                    <input type='checkbox' name={`commentUpdateVisible${comment.id}`} data-id={`c${comment.id}`} className={styles.editorCheckbox} defaultChecked={comment.visible === 0}/>
                                    <label htmlFor={`commentUpdateVisible${comment.id}`} className={styles.editorLabel}>비밀댓글</label>
                                </div>
                            </div>
                            <div className='input-group-append'>
                                <button className='btn btn-outline-secondary' type='button' onClick={() => updateComment(comment)}>댓글 수정</button>
                            </div>
                        </div>
                    </div>)}
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
                                <input type='checkbox' id='commentMainVisible' name='commentMainVisible' className={styles.editorCheckbox}/>
                                <label htmlFor='commentMainVisible' className={styles.editorLabel}>비밀댓글</label>
                            </div>
                        </div>
                        <div className='input-group-append'>
                            <button className='btn btn-outline-secondary' type='button' onClick={handleComment}>댓글 달기</button>
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