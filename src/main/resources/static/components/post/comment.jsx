import React from 'react';
import styles from '/styles/post/post.module.css';

const CommentsList = ({ comments, formVisibility, toggleFormVisibility, toggleCommentLike }) => {
    return (
        <div className={styles.commentsWrap}>
            {comments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                    <strong>{comment.author}</strong>
                    <p>{comment.text}</p>
                    <div className={styles.commentDetails}>
                        <span>{comment.time}</span>
                        <div>
                            <button className="btn btn-Light" onClick={() => toggleFormVisibility(comment.id, "comments")}>
                                답글
                            </button>
                            <button className="btn btn-Light" onClick={() => toggleCommentLike(comment.id)}>
                                <span className={styles.likeIcon}>{comment.liked ? '❤️' : '🤍'}</span>
                                {comment.likes}
                            </button>
                        </div>
                    </div>
                    {formVisibility === comment.id && (
                        <div className={styles.commentForm}>
                            {/* 폼 내용 또는 자식 컴포넌트 */}
                            <div className={styles.commentHandlerForm}>
                                <strong>닉네임</strong> 답글
                                <div className={`${styles.commentInputGroup} input-group mb-3`}>
                                    <textarea type="text" className={`${styles.commentTextarea} form-control`} />
                                </div>
                            </div>
                            <div className={styles.editorForm}>  
                                <div>
                                    <input class="form-control form-control-sm" id="formFileSm" type="file"/>
                                </div>
                                <div class="input-group-append">
                                    <button class="btn btn-outline-secondary" type="button">Button</button>
                                </div>
                            </div>
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
                                    <button className="btn btn-Light" onClick={() =>  toggleFormVisibility(reply.id, "replies")}>
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
                                        <input class="form-control form-control-sm" id="formFileSm" type="file"/>
                                    </div>
                                    <div class="input-group-append">
                                        <button class="btn btn-outline-secondary" type="button">Button</button>
                                    </div>
                                </div>
                            </div>
                            )}
                        </div>
                        
                    ))}
                    
                </div>
            ))}
            <div className={styles.postCommentForm}>
                {/* 폼 내용 또는 자식 컴포넌트 */}
                <div className={styles.commentHandlerForm}>
                    <strong>닉네임</strong> 답글
                    <div className={`${styles.commentInputGroup} input-group mb-3`}>
                        <textarea type="text" className={`${styles.commentTextarea} form-control`} />
                    </div>
                </div>
                <div className={styles.editorForm}>  
                    <div>
                        <input class="form-control form-control-sm" id="formFileSm" type="file"/>
                    </div>
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button">Button</button>
                    </div>
                </div>
            </div>
        </div>
        
    );
    
};

export default CommentsList;
