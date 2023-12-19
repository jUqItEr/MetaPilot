import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import PostHeader from '../../../components/post/header'
import CommentsList from '../../../components/post/comment/body'
import LikesList from '../../../components/post/likes'
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import styles from '/styles/post/post.module.css'
import PostContent from '../../../components/post/content'
import { useRouter } from 'next/router'


import IndexHeader from "../../../layout/home/header";
import IndexSidebar from "../../../layout/home/sidebar";
import PostList from "../../../components/common/postList";
import Auth from "../../account/auth";
import styles2 from "/styles/index.module.css"


export const getServerSideProps = async context => {
    const { postId } = context.params

    return {
        props: {
            postId: postId
        }
    }
}

const PostPage = ({ postId }) => {
    const [info, setInfo] = useState([]);
    const [commentCount, setCommentCount] = useState(0)
    const [data, setData] = useState([])
    const [likes, setLikes] = useState([])
    const [user, setUser] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [postLiked, setPostLiked] = useState(false) // 게시글에 대한 좋아요 상태
    const [faChevron, setFaChevron] = useState(false) // 공감수 리스트 상태
    const [requestTime, setRequestTime] = useState(new Date())
    const router = useRouter()

    const getInfo = async () => {
        axios({
          method: "get",
          url: "/api/info",
        }).then((res) => {
          setInfo(res.data !== undefined ? res.data.data : null);
        });
      };

    // 공감수 토글
    const toggleFaChevron = () => {
        if (showComments) {
            setShowComments(false)
        }
        setFaChevron(!faChevron)
    }

    // 포스트 좋아요 토글
    const togglePostLike = () => {
        if (user !== null) {
            axios({
                method: 'post',
                params: {
                    postId: postId,
                    userId: user.id,
                },
                url: '/api/post/response/update',
            }).then(_ => {
                setPostLiked(!postLiked)
            })
        } else {
            alert('로그인 후 이용해주세요.')
        }
    }

    // 댓글 표시 상태 토글 함수
    const toggleComments = () => {
        if (faChevron) {
            setFaChevron(false)
        }
        setShowComments(!showComments)
    }

    // 공유하기 버튼
    const handleShareClick = () => {
        navigator.clipboard
            .writeText(window.location.origin + window.location.pathname)
            .then(() => {
                alert('URL이 클립보드에 복사되었습니다.') // 성공 메시지
            })
            .catch((err) => {
                console.error('URL 복사에 실패했습니다.', err) // 오류 메시지
            })
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))

        axios({
            method: "get",
            params: {
                postId: postId,
            },
            url: "/api/post/view",
        }).then((res) => {
            setData(res.data)

            if (!res.data && res.data?.post === null && res.data?.post?.deleted === 1) {
                alert('삭제됐거나 없는 게시글입니다.')
                router.push("/")
                return
            } else if (res.data?.post?.type == 1 && user?.role?.roleEntity?.id == 1) {
                alert('게시글을 열람할 수 있는 권한이 없습니다.')
                router.push("/")
                return
            }
            axios({
                method: 'get',
                params: {
                    postId: postId
                },
                url: '/api/comment/count'
            })
            .then(res => setCommentCount(res.data))
            
            // 게시글 좋아요 리스트
            axios({
                method: 'get',
                params: {
                    postId: postId, // postId를 prop으로부터 받아오도록 수정했습니다.
                },
                url: '/api/post/response/list',
            }).then((res) => {
                setLikes(res.data)
            })
    
            // 로그인 되어 있으면 게시글 좋아요 여부 체크
            axios({
                method: 'post',
                params: {
                    postId: postId,
                    userId: user?.id,
                },
                url: '/api/post/response/exist',
            }).then((res) => {
                setPostLiked(res.data)
            })
        })
        .catch(_ => router.push("/404"))

        getInfo();
    }, [postId, postLiked, requestTime, user?.id])

  return (
    <>
      <Head>
                <title>게시글</title>
                <meta property='og:title' content='게시글' key='title' />
            </Head>
      <Auth/>
      <div className={styles2.wrap}>
        <div style={{position:'fixed',width:'100vw', backgroundColor: 'var(--bs-body-bg)', zIndex:'1000' }}>
          <IndexHeader info={info} requestTime={requestTime} setRequestTime={setRequestTime} />
        </div>

        <div style={{zIndex:'1000', backgroundColor: 'var(--bs-body-bg)'}}>
          <IndexSidebar info={info}/>
        </div>

        <div style={{boxSizing: 'border-box'}} className={styles2.content}>
            
            <PostList categoryId={1} />
            <div className='wrap'>
                <div className='container'>
                    <PostHeader post={data?.post} />
                    <main className={`${styles.mainContainer} container`}>
                        <PostContent post={data?.post} />
                    </main>
                    <footer className={styles.footerContainer}>
                        {/* hashtag */}
                        <div className={styles.hashtagBox}>
                            {data?.hashtags?.map((mapper, idx) => (
                                <div key={idx}>
                                    <Link href='#'>
                                        <a>
                                            <span className={styles.hashtag}>#{mapper.content}</span>
                                        </a>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className={styles.footerBtnContainer}>
                            {/* 버튼 left 리스트 */}
                            <div className={styles.footerBtnList}>
                                <div className={styles.footerLikeComment}>
                                    {/* 좋아요 버튼 */}
                                    <div className={styles.footerLikesBox}>
                                        <button
                                            className={styles.likeButton}
                                            onClick={togglePostLike}
                                        >
                                            <span className={styles.likeIcon}>
                                                {postLiked ? '❤️' : '🤍'}
                                            </span>
                                            <span className={styles.likeCount}>
                                                {likes.length} 좋아요
                                            </span>
                                        </button>

                                        <button
                                            className={`${styles.faChevronButton} btn btn-light`}
                                            onClick={toggleFaChevron}
                                        >
                                            <span className={styles.faChevronIcon}>
                                                {faChevron ? (
                                                    <FontAwesomeIcon icon={faChevronUp} size='2x' />
                                                ) : (
                                                    <FontAwesomeIcon icon={faChevronDown} size='2x' />
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                    {/* 댓글 버튼 */}
                                    <button
                                        className={`${styles.commentButton} btn btn-light`}
                                        style={{
                                            margin: '5px'
                                        }}
                                        onClick={toggleComments}
                                    >
                                        댓글 {commentCount}개&nbsp;
                                        {showComments ? (
                                            <FontAwesomeIcon icon={faChevronUp} width={15} />
                                        ) : (
                                            <FontAwesomeIcon icon={faChevronDown} width={15} />
                                        )}
                                    </button>
                                </div>
                            </div>
                            {/* 버튼 오른쪽 리스트 */}
                            <div className={styles.footerLinkList}>
                                {/* <FontAwesomeIcon icon={faGithub} size='1x'/> */}
                                <button
                                    className={`${styles.shareButton} btn btn-Light`}
                                    onClick={handleShareClick}
                                >
                                    공유하기
                                </button>
                            </div>
                        </div>

                        {/* 공감자 목록 */}
                        <LikesList likes={likes} isVisible={faChevron} />

                        {/* 댓글 목록 */}
                        {showComments && (
                            <CommentsList
                                pid={postId}
                                requestTime={requestTime}
                                setRequestTime={setRequestTime}
                            />
                        )}

                        {/* 광고 */}
                        <div className={styles.footerAdList}>
                            <div className={styles.footerAdContent}>
                                <span>파워링크 광고입니다.</span>
                                <Link href='/'>
                                    <a>
                                        <span>광고안내</span>
                                    </a>
                                </Link>
                            </div>
                            <hr className={styles.footerAdDivisor} />
                            <ul className={styles.storeList}>
                                <li className={styles.storeItem}>
                                    <Link href='/'>
                                        <a className={styles.storeLink}>명승농원</a>
                                    </Link>
                                    <button className={styles.payButton}>Pay</button>
                                    <div className={styles.storeDescription}>
                                        올인원 선물세트 3대를 어머니께 전달할 수 있는 확실한
                                        판매처를 통해 제공
                                    </div>
                                </li>
                                <li className={styles.storeItem}>
                                    <Link href='/'>
                                        <a className={styles.storeLink}>진원씨_LOTTE ON</a>
                                    </Link>
                                    <button className={styles.payButton}>Pay</button>
                                    <div className={styles.storeDescription}>
                                        진원씨의 코딩실력을 판매합니다.
                                    </div>
                                </li>
                                <li className={styles.storeItem}>
                                    <Link href='/'>
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
        </div>
      </div>
    </>
  )
}

export default PostPage