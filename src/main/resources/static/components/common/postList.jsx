import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"
import styles from "/styles/common/postList.module.css";

const PostList = () => {
    
    const [isListVisible, setIsListVisible] = useState(true);
    const [isCheckboxVisible, setIsCheckboxVisible] = useState(false);

    // 목록 표시/숨기기 함수
    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible);
    };

    const toggleCheckboxVisibility = () => {
        setIsCheckboxVisible(!isCheckboxVisible);
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
                            {isCheckboxVisible && (
                                <input type="checkbox" defaultValue={"0"}/>
                            )}
                            <span className={styles.postListTitles}>게시글제목1</span>
                            <span className={styles.postListCommentCount}>(4)</span>
                        </div>
                        <div>
                            <span>2023-12-13</span>
                        </div>
                    </div>
                    <div className={styles.postListTitle}>
                        <div className={styles.postList}>
                            {isCheckboxVisible && (
                                <input type="checkbox" defaultValue={"0"}/>
                            )}
                            <span className={styles.postListTitles}>게시글제목1</span>
                            <span className={styles.postListCommentCount}>(4)</span>
                        </div>
                        <div>
                            <span>2023-12-13</span>
                        </div>
                    </div>
                    <div className={styles.postListTitle}>
                        <div className={styles.postList}>
                            {isCheckboxVisible && (
                                <input type="checkbox" defaultValue={"0"}/>
                            )}
                            <span className={styles.postListTitles}>게시글제목1</span>
                            <span className={styles.postListCommentCount}>(4)</span>
                        </div>
                        <div>
                            <span>2023-12-13</span>
                        </div>
                    </div>
                    <div className={styles.postListTitle}>
                        <div className={styles.postList}>
                            {isCheckboxVisible && (
                                <input type="checkbox" defaultValue={"0"}/>
                            )}
                            <span className={styles.postListTitles}>게시글제목1</span>
                            <span className={styles.postListCommentCount}>(4)</span>
                        </div>
                        <div>
                            <span>2023-12-13</span>
                        </div>
                    </div>
                    <div className={styles.postListTitle}>
                        <div className={styles.postList}>
                            {isCheckboxVisible && (
                                <input type="checkbox" defaultValue={"0"}/>
                            )}
                            <span className={styles.postListTitles}>게시글제목1</span>
                            <span className={styles.postListCommentCount}>(4)</span>
                        </div>
                        <div>
                            <span>2023-12-13</span>
                        </div>
                    </div>
                    <div className={styles.postListSelectGroup}>
                        <div>
                            <button type="button" className="btn btn-secondary"
                                onClick={toggleCheckboxVisibility}>글관리</button>
                        </div>
                        <div class="form-group">
                            <select class="form-control mb-3">
                                <option value="5">5줄 보기</option>
                                <option value="10">10줄 보기</option>
                                <option value="15">15줄 보기</option>
                                <option value="20">20줄 보기</option>
                                <option value="30">30줄 보기</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className={styles.pageController}>
                        <Link href="/">
                            <a className={styles.disabled}>이전</a>
                        </Link>
                        <ul className={styles.pageNumbers}>
                            <Link href="/">
                                <a className={styles.pageLink}>1</a>
                            </Link>
                            <Link href="/">
                                <a className={styles.pageLink}>2</a>
                            </Link>
                            <Link href="/">
                                <a className={styles.pageLink}>3</a>
                            </Link>
                            <Link href="/">
                                <a className={styles.pageLink}>4</a>
                            </Link>
                            <Link href="/">
                                <a className={styles.pageLink}>5</a>
                            </Link>
                        </ul>
                        <Link href="/">
                            <a className={styles.disabled}>다음</a>
                        </Link>
                    </div>
                </div>
                )}
            </div>
        </div>


        </>
    )
}

export default PostList