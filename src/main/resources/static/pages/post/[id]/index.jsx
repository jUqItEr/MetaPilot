import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import $ from 'jquery'

import styles from "/styles/post/post.module.css";
import { faChevronDown, faChevronLeft, faChevronRight, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import PostHeader from "../../../components/post/header";
import CommentsList from "../../../components/post/comment";
import LikesList from "../../../components/post/likes";
// import CKEditorComponent from "../../../components/post/ckEditor";



const PostPage = () => {

    const [comments, setComments] = useState([
        {
          id: 1,
          author: '소라카미',
          text: '컨텐츠가 가득한 좋은 페이지 좋은 정보 감사합니다. 드롭다운 구현하면서 참고해야겠어요. ^^',
          time: '2023.12.10. 08:51',
          likes: 5,
          replies: [
            {
              id: 2,
              author: '답글',
              text: '네, 컨텐츠가 가득한 곳에 있고, 좋은 정보를 얻을 수 있습니다.',
              time: '2023.12.10. 09:19',
              likes: 0,
            },
          ],
        },
        {
          id: 3,
          author: '헤케맨',
          text: '자주 오던 음식점이 가족소유로 바뀌어 방문이 기대됩니다',
          time: '2023.12.10. 09:09',
          likes: 0,
          replies: [
            {
              id: 4,
              author: '답글',
              text: '네, 그렇습니다.',
              time: '2023.12.10. 09:20',
              likes: 0,
            },
          ],
        },
      ]); //초기 댓글 데이터

    const [showComments, setShowComments] = useState(false);
    const [postLiked, setPostLiked] = useState(false); // 게시글에 대한 좋아요 상태
    const [postLikes, setPostLikes] = useState(28); // 게시글 좋아요 수
    const [faChevron, setFaChevron] = useState(false); // 공감수 리스트 상태
    const [showReplyForm, setShowReplyForm] = useState(false); // 답글 폼
    const [likesVisible, setLikesVisible] = useState(false);
    const [formVisibility, setFormVisibility] = useState({});


    // const [ post, setPost ] = useState([])
    // const router = useRouter()
    // const { postId } = router.query

    // 공감수 토글
    const toggleFaChevron = () => {
        if (showComments) {
            setShowComments(false);
        }
        setFaChevron(!faChevron);
    };

    // 포스트 좋아요 토글
    const togglePostLike = () => {
        setPostLiked(!postLiked);
    };

    // 댓글 표시 상태 토글 함수
    const toggleComments = () => {
        if (faChevron) {
            setFaChevron(false);
        }
        setShowComments(!showComments);
    };

    // 댓글의 답글, 답글의 답글 폼 위치 잡는 함수
    const toggleFormVisibility = (id, type) => {
        setFormVisibility(prevState => ({
            ...prevState,
            [type]: {
                ...prevState[type],
                [id]: !prevState[type]?.[id]
            }
        }));
    };

    // 공유하기 버튼
    const handleShareClick = () => {
        navigator.clipboard.writeText(window.location.href).then(() => {
            alert('URL이 클립보드에 복사되었습니다.'); // 성공 메시지
        }).catch(err => {
            console.error('URL 복사에 실패했습니다.', err); // 오류 메시지
        });
    };

    // 댓글, 답글 좋아요
    const toggleCommentLike = (commentId, isReply = false, parentCommentId = null) => {
        setComments(comments.map(comment => {
          if (isReply && comment.id === parentCommentId) {
            return {
              ...comment,
              replies: comment.replies.map(reply => {
                if (reply.id === commentId) {
                  return { ...reply, liked: !reply.liked };
                }
                return reply;
              })
            };
          } else if (!isReply && comment.id === commentId) {
            return { ...comment, liked: !comment.liked };
          }
          return comment;
        }));
      };

    return (
        <>
            <Head>
                <title>게시글</title>
                <meta property="og:title" content="게시글" key="title" />
            </Head>
            <div className="wrap">
                <div className="container">
                    <PostHeader/>

                    <main className={styles.mainContainer}>

                    </main>

                    <footer className={styles.footerContainer}>
                        {/* hashtag */}
                        <div className={styles.hashtagBox}>
                            <div>
                                <Link href="">
                                    <a><span className={styles.hashtag}>#후쿠오카</span></a>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.footerBtnContainer}>
                            {/* 버튼 left 리스트 */}
                            <div className={styles.footerBtnList}>
                                <div className={styles.footerLikeComment}>
                                    {/* 좋아요 버튼 */}
                                    <div className={styles.footerLikesBox}>
                                        <button className={styles.likeButton} onClick={togglePostLike}>
                                            <span className={styles.likeIcon}>{postLiked ? '❤️' : '🤍'}</span>
                                            <span className={styles.likeCount}>{postLikes} 공감해요</span>
                                        </button>
                                        
                                        <button className={`${styles.faChevronButton} btn btn-Light`} onClick={toggleFaChevron}>
                                            <span className={styles.faChevronIcon}>{faChevron ? 
                                                <FontAwesomeIcon icon={ faChevronUp } size="2x"/> : 
                                                <FontAwesomeIcon icon={ faChevronDown } size="2x"/>}
                                            </span>
                                        </button>

                                    </div>
                                    {/* 댓글 버튼 */}
                                    <button className={`${styles.commentButton} btn btn-Light`} onClick={toggleComments}>
                                        {showComments ? '댓글 숨기기' : '댓글 보기'}
                                    </button>
                                </div>
                            </div>
                            {/* 버튼 오른쪽 리스트 */}
                            <div className={styles.footerLinkList}>
                                {/* <FontAwesomeIcon icon={faGithub} size="1x"/> */}
                                <button className={`${styles.shareButton} btn btn-Light`} onClick={handleShareClick}>공유하기</button>
                            </div>
                        </div>

                        {/* 공감자 목록 */}
                        <LikesList isVisible={faChevron}/>

                        {/* 댓글 목록 */}
                        {showComments && (
                            <CommentsList
                                comments={comments}
                                formVisibility={formVisibility}
                                toggleFormVisibility={toggleFormVisibility}
                                toggleCommentLike={toggleCommentLike}
                            />
                        )}

                        {/* 광고 */}
                        <div className={styles.footerAdList}>
                            <div className={styles.footerAdContent}>
                                <span>파워링크 광고입니다.</span>
                                <Link href="/">
                                    <a>
                                        <span>광고안내</span>
                                    </a>
                                </Link>
                            </div>
                            <hr className={styles.footerAdDivisor}/>
                            <ul className={styles.storeList}>
                                <li className={styles.storeItem}>
                                    <Link href="/">
                                        <a className={styles.storeLink}>명승농원</a>
                                    </Link>
                                    <button className={styles.payButton}>Pay</button>
                                    <div className={styles.storeDescription}>
                                        올인원 선물세트 3대를 어머니께 전달할 수 있는 확실한 판매처를 통해 제공
                                    </div>
                                </li>
                                <li className={styles.storeItem}>
                                    <Link href="/">
                                        <a className={styles.storeLink}>진원씨_LOTTE ON</a>
                                    </Link>
                                    <button className={styles.payButton}>Pay</button>
                                    <div className={styles.storeDescription}>
                                        진원씨의 코딩실력을 판매합니다.
                                    </div>
                                </li>
                                <li className={styles.storeItem}>
                                    <Link href="/">
                                        <a className={styles.storeLink}>동의대 ON</a>
                                    </Link>
                                    <button className={styles.payButton}>Pay</button>
                                    <div className={styles.storeDescription}>
                                        그를 데리고 가고 싶다면 링크를 클릭!!
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </footer>


                </div>
            </div>
        </>
    )

}

export default PostPage