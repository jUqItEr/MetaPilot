import { useEffect, useState } from "react"
import styles from '/styles/post/post.module.css'
import axios from "axios"


const CommentLike = ({ comment }) => {
    const [user, setUser] = useState([])
    const [likes, setLikes] = useState([])

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))

        axios({
            method: 'get',
            params: {
                commentId: comment?.id,
                userId: user?.id
            },
            url: '/api/comment/response/exist'
        })
        .then((res) => {
            setLikes(res.data)
        })
    }, [comment, user?.id])

    return (
        <span className={styles.likeIcon}>{likes ? '❤️' : '🤍'}</span>
    )
}

export default CommentLike