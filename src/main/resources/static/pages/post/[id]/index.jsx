import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";

import styles from "/styles/post/post.module.css";

const PostPage = () => {
    return (
        <>
            <Head>
                <title>게시글</title>
                <meta property="og:title" content="게시글" key="title" />
            </Head>
            <div className="wrap">
                <div className="container">
                    <header className="headerContainer">
                        <div className={styles.headerPostList}>
                            <div className="headerCate">
                                <Link href="">
                                    <a>
                                        게임
                                    </a>
                                </Link>
                            </div>
                            <div className="headerList">목록열기</div>
                        </div>
                        <div className={styles.headerComponent}>
                            <div className={styles.headerCompoCate}>뷰티.헤어</div>
                            <div className={styles.headerCompoTitle}>제목이에요</div>
                            <div className={styles.headerSubList}>
                                <div className={styles.headerProfile}>
                                    <div className="headerProfilePhoto">프로필사진</div>
                                    <div className={styles.headerProfileName}>효앤민</div>
                                    <div className="headerProfileTime">2시간전</div>
                                </div>
                                <div className={styles.headerSubDropdown}>
                                    <div>목록</div>
                                </div>
                            </div>
                        </div>
                    </header>
                    <main className={styles.mainContainer}>
                        
                    </main>
                    <footer className={styles.footerContainer}>
                        <div className={styles.hashtagBox}>
                            <div>
                                <Link href="">
                                    <a><span className={styles.hashtag}>#후쿠오카</span></a>
                                </Link>
                            </div>
                        </div>

                        <div className={styles.footerBtnList}>
                            <div className={styles.footerLikeComment}>
                                <div className={styles.likeButton}>
                                    <span className={styles.likeIcon}>❤️</span>
                                    <span className={styles.likeCount}>공감해요 28</span>
                                    <button className={styles.dropdownArrow}>▼</button>
                                </div>
                                <div>2</div>
                            </div>
                            <div className={styles.footerLikeComment}>
                                <div>3</div>
                                <div>4</div>
                                <div>5</div>
                                <div>6</div>
                                <div>7</div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default PostPage