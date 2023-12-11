import Link from "next/link";
import styles from "/styles/post/post.module.css";

const PostHeader = () => {
    return (
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
                <div className={styles.headerCompoCate}>게시글 카테고리</div>
                <div className={styles.headerCompoTitle}>게시글 제목</div>
                <div className={styles.headerSubList}>
                    <div className={styles.headerProfile}>
                        <div className="headerProfilePhoto">유저 프로필사진</div>
                        <div className={styles.headerProfileName}>유저네임</div>
                        <div className="headerProfileTime">올린시각</div>
                    </div>
                    <div className={styles.headerSubDropdown}>
                        <div>목록</div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default PostHeader