import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import PostHeader from '../../../components/post/header'
import CommentsList from '../../../components/post/comment'
import LikesList from '../../../components/post/likes'
import { useState } from 'react'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import styles from '/styles/post/post.module.css'
import PostContent from '../../../components/post/content'


export const getServerSideProps = async context => {
    const { postId } = context.params

    return {
        props: {
            postId: postId
        }
    }
}

const PostPage = ({ postId }) => {
    const [comments, setComments] = useState([]) //초기 댓글 데이터
    const [likes, setLikes] = useState([])
    const [user, setUser] = useState([])
    const [showComments, setShowComments] = useState(false)
    const [postLiked, setPostLiked] = useState(false) // 게시글에 대한 좋아요 상태
    const [faChevron, setFaChevron] = useState(false) // 공감수 리스트 상태
    const [commentLiked, setCommentLiked] = useState(false) // 댓글에 대한 좋아요 상태

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
                url: '/api/post/updateLike',
            }).then((res) => {
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

    // 댓글의 답글, 답글의 답글 폼 위치 잡는 함수
    // const toggleFormVisibility = (id, type) => {
    //     setFormVisibility(prevState => ({
    //         ...prevState,
    //         [type]: prevState[type] === id ? null : id
    //     }))
    // }

    // 공유하기 버튼
    const handleShareClick = () => {
        navigator.clipboard
            .writeText(window.location.href)
            .then(() => {
                alert('URL이 클립보드에 복사되었습니다.') // 성공 메시지
            })
            .catch((err) => {
                console.error('URL 복사에 실패했습니다.', err) // 오류 메시지
            })
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
        
        // 게시글 좋아요 리스트
        axios({
            method: 'get',
            params: {
                postId: postId, // postId를 prop으로부터 받아오도록 수정했습니다.
            },
            url: '/api/post/likesList',
        }).then((res) => {
            setLikes(res.data)
        })

        // 댓글 리스트
        axios({
            method: 'get',
            params: {
                postId: postId, // postId를 prop으로부터 받아오도록 수정했습니다.
            },
            url: '/api/comment/comments',
        }).then((res) => {
            setComments(res.data)
        })

        // 로그인 되어 있으면 게시글 좋아요 여부 체크
        axios({
            method: 'post',
            params: {
                postId: postId,
                userId: user?.id,
            },
            url: '/api/post/hasLike',
        }).then((res) => {
            setPostLiked(res.data)
        })

        // 로그인 되어 있으면 댓글 좋아요 여부 체크
        axios({
            method: 'post',
            params: {
                userId: user?.id,
                commentId: comments.id,
            },
            url: '/api/comment/hasLike',
        }).then((res) => {
            setCommentLiked(res.data)
        })
    }, [postId, postLiked, commentLiked, user?.id])

    return (
        <>
            <Head>
                <title>게시글</title>
                <meta property='og:title' content='게시글' key='title' />
            </Head>
            <div className='wrap'>
                <div className='container'>
                    <PostHeader pid={postId} />
                    <main className={styles.mainContainer}>
                        <PostContent />
                    </main>
                    <footer className={styles.footerContainer}>
                        {/* hashtag */}
                        <div className={styles.hashtagBox}>
                            <div>
                                <Link href=''>
                                    <a>
                                        <span className={styles.hashtag}>#후쿠오카</span>
                                    </a>
                                </Link>
                            </div>
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
                                        onClick={toggleComments}
                                    >
                                        {showComments ? '댓글 숨기기' : '댓글 보기'}
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
                                postId={postId}
                                comments={comments}
                                setComments={setComments}
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
        </>
    )
}

export default PostPage