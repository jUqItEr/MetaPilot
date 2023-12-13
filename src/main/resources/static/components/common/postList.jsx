import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import styles from "/styles/common/postList.module.css";

const PostList = () => {
    
    const [isListVisible, setIsListVisible] = useState(true);

    // 목록 표시/숨기기 함수
    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible);
    };

    return(
        <>
        
        
        <div className={styles.postListWrap}>
            <hr/>
            <div className={styles.postListContainer}>
                <div className={styles.postListHeader}>
                    <div className={styles.postListGroup}>
                        <span className={styles.postListAll}>전체보기</span>
                        <span className={styles.postListCount}>247개의 글</span>
                    </div>
                    <div>
                        <span className={styles.postListToggle} onClick={toggleListVisibility}>
                            {isListVisible ? "목록닫기" : "목록열기"}
                        </span>
                    </div>
                </div>
                {isListVisible && (
                <div className={styles.postListBlock}>
                    <div className={styles.postListSubHeader}>
                        <div>
                            <span className={styles.postListSubject}>글 제목</span>
                        </div>
                        <div>
                            <span className={styles.postListSubject}>작성일</span>
                        </div>
                    </div>
                    <div className={styles.postListTitle}>
                        <div className={styles.postList}>
                            <span className={styles.postListTitles}>게시글제목1</span>
                            <span className={styles.postListCommentCount}>(4)</span>
                        </div>
                        <div>
                            <span>2023-12-13</span>
                        </div>
                    </div>
                    <div className={styles.postListTitle}>
                        <div className={styles.postList}>
                            <span className={styles.postListTitles}>게시글제목1</span>
                            <span className={styles.postListCommentCount}>(4)</span>
                        </div>
                        <div>
                            <span>2023-12-13</span>
                        </div>
                    </div>
                    <div className={styles.postListTitle}>
                        <div className={styles.postList}>
                            <span className={styles.postListTitles}>게시글제목1</span>
                            <span className={styles.postListCommentCount}>(4)</span>
                        </div>
                        <div>
                            <span>2023-12-13</span>
                        </div>
                    </div>
                    <div className={styles.postListTitle}>
                        <div className={styles.postList}>
                            <span className={styles.postListTitles}>게시글제목1</span>
                            <span className={styles.postListCommentCount}>(4)</span>
                        </div>
                        <div>
                            <span>2023-12-13</span>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>


        </>
    )
}

export default PostList