import Link from "next/link";
import styles from "/styles/post/post.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const PostHeader = () => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const router = useRouter();
  const { postId } = router.query;

  useEffect(() => {
    axios({
      method: "get",
      params: {
        postId: 20,
      },
      url: "/api/post/postView",
    }).then((res) => {
      setData(res.data);
      console.log(res.data);
    });
  }, []);

  return (
    data && (
      <header className="headerContainer">
        <div className={styles.headerPostList}>
          <div className="headerCate">
            <Link href="">
              <a>게임</a>
            </Link>
          </div>
          <div className="headerList">목록열기</div>
        </div>
        <div className={styles.headerComponent}>
          <div className={styles.headerCompoCate}></div>
          <div className={styles.headerCompoTitle}>{data.post?.subject}</div>
          <div className={styles.headerSubList}>
            <div className={styles.headerProfile}>
              <div className="headerProfilePhoto">유저 프로필사진</div>
              <div className={styles.headerProfileName}></div>
              <div className="headerProfileTime">{data.post?.createdAt}</div>
            </div>
            <div className={styles.headerSubDropdown}>
              <div>목록</div>
            </div>
          </div>
        </div>
      </header>
    )
  );
};

export default PostHeader;