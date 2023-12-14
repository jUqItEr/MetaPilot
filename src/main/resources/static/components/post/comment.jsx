import React, { useEffect, useState } from 'react';
import styles from '/styles/post/post.module.css';
import CommentLike from './comment_like';
import axios from 'axios';
import $ from 'jquery'

const CommentsList = ({ postId, comments, setComments }) => {
    const [user, setUser] = useState([])
    const [formVisibility, setFormVisibility] = useState({})

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

    const createComment = async () => {
        const content = $('#comment').val()

        if (content !== '') {
            axios({
                method: 'post',
                params: {
                    content: content,
                    postId: postId,
                    userId: user?.id,
                    depth: 0,
                    visible: 1
                },
                url: '/api/comment/createComment'
            })
            .then((res) => {
                console.log(res)
            })
        } else {
            alert('댓글을 작성하려면 내용을 입력해주세요.')
        }
    }

    const createReply = async (commentId) => {
        const content = $(`textarea[data-id=${commentId}]`).val()

        if (content !== '') {
            axios({
                method: 'post',
                params: {
                    commentRefId: commentId,
                    commentRootId: commentId,
                    content: content,
                    postId: postId,
                    userId: user?.id,
                    depth: 1,
                    visible: 1
                },
                url: '/api/comment/createComment'
            })
            .then((res) => {
                console.log(res)
            })
        } else {
            alert('답글을 작성하려면 내용을 입력해주세요.')
        }
    }

    // 댓글, 답글 좋아요
    const toggleCommentLike = (commentId) => {
        axios({
            method: 'post',
            params: {
                commentId: commentId,
                userId: user?.id
            },
            url: '/api/comment/likes/update'
        })
        .then((res) => {
            // 댓글 리스트
            axios({
                method: 'get',
                params: {
                    postId: postId, // postId를 prop으로부터 받아오도록 수정했습니다.
                },
                url: '/api/comment/comments',
            }).then((res) => {
                setComments(res.data)
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }
    
    const toggleFormVisibility = (id) => {
        setFormVisibility((prevState) => (prevState === id ? null : id))
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [user?.id])

    return (
        <div className={styles.commentsWrap}>
            {comments.map((comment, index) => (
                <div key={index} className={comment.depth ? styles.commentForm : styles.replyForm}>
                    <strong>{comment.nickname}</strong>
                    <p>{comment.content}</p>
                    <div className={styles.commentDetails}>
                        <span>{comment.createdAt}</span>
                        <div>
                            <button className="btn" onClick={() => toggleFormVisibility(comment.id)}>
                                답글
                            </button>
                            <button className="btn" onClick={() => toggleCommentLike(comment.id)}>
                                <CommentLike comment={comment} />
                                {comment.likeCount}
                            </button>
                        </div>
                    </div>
                    {formVisibility === comment.id && (
                        <div className={styles.commentForm}>
                            {/* 폼 내용 또는 자식 컴포넌트 */}
                            <form onSubmit={createCommentSubmit}>
                                <input type="hidden" name="postId" value={`${postId}`}/>
                                <input type="hidden" name="userId" value={`${user?.id}`}/>
                                <div className={styles.commentHandlerForm}>
                                    <strong>{user?.nickname}</strong>님의 답글
                                    <div className={`${styles.commentInputGroup} input-group mb-3`}>
                                        <textarea type="text" className={`${styles.commentTextarea} form-control`} name='content'/>
                                    </div>
                                </div>
                                <div className={styles.editorForm}>  
                                    <div>
                                        <input className="form-control form-control-sm" data-id={comment.id} type="file" accept="image/png, image/jpeg, image/webp, image/gif"/>
                                    </div>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button" onClick={() => createReply(comment.id)}>답글 달기</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )}
                    {/* 답글 목록 */}
                    {comment.replies && comment.replies.map((reply) => (
                        <div key={reply.id} className={styles.reply}>
                            <strong>{reply.author}</strong>
                            <p>{reply.text}</p>
                            <div className={styles.commentDetails}>
                                <span>{reply.time}</span>
                                <div className={styles.commentDetailsButtons}>
                                    <button className="btn btn-Light" onClick={() =>  toggleFormVisibility(reply.id)}>
                                        답글의 답글
                                    </button>
                                    <button className="btn btn-Light" onClick={() => toggleCommentLike(reply.id, true, comment.id)}>
                                        <span className={styles.likeIcon}>{reply.liked ? '❤️' : '🤍'}</span>
                                        {reply.likes}
                                    </button>
                                </div>
                            </div>
                            {formVisibility === reply.id && (
                                <div className={styles.replyForm}>
                                    <div className={styles.commentHandlerForm}>
                                    <strong>닉네임</strong> 답글
                                    <div className={`${styles.commentInputGroup} input-group mb-3`}>
                                        <textarea type="text" className={`${styles.commentTextarea} form-control`} />
                                    </div>
                                </div>
                                <div className={styles.editorForm}>  
                                    <div>
                                        <input className="form-control form-control-sm" id="formFileSm" type="file"/>
                                    </div>
                                    <div className="input-group-append">
                                        <button className="btn btn-outline-secondary" type="button">답글 달기</button>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                        
                    ))}
                    
                </div>
            ))}
            {user ? (
                <div className={styles.postCommentForm}>
                {/* 폼 내용 또는 자식 컴포넌트 */}
                <div className={styles.commentHandlerForm}>
                    <strong>{user?.nickname}</strong>님의 댓글
                    <div className={`${styles.commentInputGroup} input-group mb-3`}>
                        <textarea type="text" id="comment" className={`${styles.commentTextarea} form-control`} />
                    </div>
                </div>
                <div className={styles.editorForm}>  
                    <div>
                        <input className="form-control form-control-sm" id="formFileSm" type="file"/>
                    </div>
                    <div className="input-group-append">
                        <button className="btn btn-outline-secondary" type="button" onClick={createComment}>댓글 달기</button>
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

export default CommentsList;