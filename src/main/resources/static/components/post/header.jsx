import Link from "next/link";
import Image from "next/image";
import styles from "/styles/post/post.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const PostHeader = ({ pid }) => {
  const [data, setData] = useState([]);
  const [category, setCategory] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios({
      method: "get",
      params: {
        postId: pid,
      },
      url: "/api/post/view",
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
          <div className={styles.headerCompoCate}>{data.post?.categorySubject}</div>
          <div className={styles.headerCompoTitle}>{data.post?.subject}</div>
          <div className={styles.headerSubList}>
            <div className={styles.headerProfile}>

              <Image
                className={styles.headerProfile}
                src={data.post?.profileImage || "/image/profile.png"}
                alt={"image"}
                width={40}
                height={40}
              />
              <div className={styles.headerProfileName}><span className={styles.profileNickname}>{data.post?.nickName}</span></div>
              <div className="headerProfileTime"><span className={styles.profileNickname}>{data.post?.createdView}</span></div>
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