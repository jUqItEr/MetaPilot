// 파일: LikesList.jsx
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from '/styles/post/post.module.css';

const LikesList = ({ isVisible }) => {
    return (
        <div style={{display: isVisible ? "block" : "none"}}>
            <div className={styles.likesWrap}>
                이 글에 <span className={styles.likesBloger}>공감한 친구</span>
                <ul className={styles.likesContent}>
                    <li className={styles.likesList}>
                        <Link href="/">
                            <a>
                                <Image className={styles.likesUserImage} src="/image/logo-kakao.png" alt="" width={20} height={20}/>
                            </a>
                        </Link>
                        <span className={styles.likesUsername}>유저닉네임</span>
                    </li>
                    <li className={styles.likesList}>
                        <Link href="/">
                            <a>
                                <Image className={styles.likesUserImage} src="/image/logo-kakao.png" alt="" width={20} height={20}/>
                            </a>
                        </Link>
                        <span className={styles.likesUsername}>유저닉네임</span>
                    </li>
                </ul>
                {/* 페이징 버튼 */}
                <div className={styles.likesPageButtons}>
                    <button className={`${styles.likesButton} btn btn-Light`}><FontAwesomeIcon icon={faChevronLeft}/></button>
                    <button className={`${styles.likesButton} btn btn-Light`}><FontAwesomeIcon icon={faChevronRight}/></button>
                </div>
            </div>
        </div>
    );
};

export default LikesList;
