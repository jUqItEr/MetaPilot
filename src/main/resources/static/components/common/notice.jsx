import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import styles from "/styles/common/notice.module.css";

const NoticePost = () => {
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/post/notice",
    }).then((res) => {
      console.log(res.data);
      setNotice(res.data);
    });
  }, []);

  return (
    <>
      <div className={styles.noticeWrap}>
        <hr />
        {notice.map((notice) => (
          <div key={notice.postId} className={styles.noticeContainer}>
            <div className={styles.noticeContent}>
              <span className={styles.notice}>공지</span>
              <Link href={`/post/${notice.postId}`}>
                <a className={styles.link}>
                  <span className={styles.postTitle}>{notice.subject}</span>
                </a>
              </Link>
              <span className={styles.commentCount}>({notice.commented})</span>
            </div>
            <div>
              <span className={styles.commentDate}>{notice.createdDate}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default NoticePost;
