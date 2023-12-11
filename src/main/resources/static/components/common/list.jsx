import axios from "axios"
import { useEffect, useRef, useState } from "react"

const PostList = ({ id }) => {
    const recentId = useRef(0)
    const [ post, setPost ] = useState([])

    useEffect(() => {
        (async () => {
            axios({
                header: {
                    'Authorization': localStorage.getItem('authorization'),
                    'Content-Type': 'application/json'
                },
                method: 'post',
                data: {
                    categoryId: id
                },
                url: '/api/category/recentPost'
            })
            .then((res) => {
                recentId = res.data
            })
        })()

        axios({
            header: {
                'Authorization': localStorage.getItem('authorization'),
                'Content-Type': 'application/json'
            },
            method: 'post',
            data: {
                categoryId: id,
                postId: recentId
            },
            url: '/api/category/postList'
        })
        .then((res) => {
            console.log(res.data)
            setPost(res.data)
        })
        .catch((err) => {
            // console.log(err)
        })
    }, [])

    return (
        <>
            {}
        </>
    )
}

export default PostList