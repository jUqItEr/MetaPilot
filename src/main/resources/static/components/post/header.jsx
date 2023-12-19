import Link from 'next/link'
import Image from 'next/image'
import styles from '/styles/post/post.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from 'react'
import $ from 'jquery'
import { useRouter } from 'next/router'
import axios from 'axios'


const PostHeader = ({ post }) => {
    const [user, setUser] = useState([])
    const router = useRouter()

    const deletePost = ({ categoryId, postId }) => {
        if (confirm('게시글을 삭제하시겠습니까?')) {
            axios({
                method: 'post',
                params: {
                    postIds: [postId].map(String)
                },
                url: '/api/post/delete'
            })
            .then(res => {
                if (res.data) {
                    alert('게시글이 삭제되었습니다.')
                    router.push(`/category/${categoryId}`)
                    return
                }
            })
        }
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

    const updatePost = ({ categoryId, postId }) => {
        localStorage.setItem('categoryId', categoryId)
        localStorage.setItem('postId', postId)
        router.push('/post/edit')
        return
    }

    const toggleMenu = () => {
        $('.article-menu').toggle()
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [])

    return (
        post && (
            <header className='headerContainer'>
                <div className={styles.headerComponent}>
                    <div className={styles.headerCompoCate}>{post?.categorySubject}</div>
                    <div className={styles.headerCompoTitle}>{post?.subject}</div>
                    <div className={styles.headerSubList}>
                        <div className={styles.headerProfile}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Image
                                                className={styles.headerProfile}
                                                src={post?.profileImage || '/image/profile.png'}
                                                alt={'image'}
                                                width={40}
                                                height={40}
                                            />
                                        </td>
                                        <td>
                                            <div className={styles.headerProfileName}><span className={styles.profileNickname}>{post?.nickName}</span></div>
                                        </td>
                                        <td>
                                            <div className='headerProfileTime'><span className={styles.profileNickname}>{post?.createdView}</span></div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.headerSubDropdown}>
                            <button type='button' className='btn' onClick={() => toggleMenu(post)}>
                                <span className={styles.menuIcon}>
                                    <FontAwesomeIcon icon={faEllipsisVertical} size='1x' />
                                </span>
                            </button>
                        </div>
                        <div className={`${styles.menuItem} article-menu`}>
                            <div></div>
                            <div className={styles.commentMenu}>
                                {(post?.userId === user?.id) && (<button className='btn' type='button' onClick={() => updatePost(post)}>수정</button>)}
                                {(post?.userId === user?.id || user?.role?.roleEntity?.id != 1) && (<button className='btn' onClick={() => deletePost(post)}>삭제</button>)}
                                <button className='btn' onClick={handleShareClick}>URL 복사</button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        )
    )
}

export default PostHeader