// 파일: LikesList.jsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import styles from "/styles/post/post.module.css";

const LikesList = ({ likes, isVisible }) => {
  useEffect(() => {
    // if (isVisible) {
    //   axios({
    //     method: "get",
    //     params: {
    //       postId: 20, // postId를 prop으로부터 받아오도록 수정했습니다.
    //     },
    //     url: "/api/post/likesList",
    //   }).then((res) => {
    //     setLikes(res.data);
    //   });
    // }
  }, [isVisible]); // postId가 변경될 때도 업데이트하도록 의존성 배열을 수정했습니다.

  return (
    <div style={{ display: isVisible ? "block" : "none" }}>
      <div className={styles.likesWrap}>
        이 글에 <span className={styles.likesBloger}>좋아요</span>를 누른 친구
        <ul className={styles.likesContent}>
          {likes.map(
            (
              like,
              index // 데이터를 map을 사용해 렌더링
            ) => (
              <li className={styles.likesList} key={like.userId || index}>
                <Link href={`/user/${like.userId}`}>
                  <a>
                    <Image
                      className={styles.likesUserImage}
                      src={like.userImage || "/image/profile.png"} // 사용자 이미지 혹은 기본 이미지
                      alt={like.nickName}
                      width={20}
                      height={20}
                    />
                  </a>
                </Link>
                <span className={styles.likesUsername}>{like.nickName}</span>
              </li>
            )
          )}
        </ul>
        {/* 페이징 버튼 */}
        <div className={styles.likesPageButtons}>
          <button className={`${styles.likesButton} btn btn-Light`}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button className={`${styles.likesButton} btn btn-Light`}>
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LikesList;