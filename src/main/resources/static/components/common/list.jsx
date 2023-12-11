import axios from "axios"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const PostList = (props) => {
    const [ post, setPost ] = useState([])
    const router = useRouter()
    const { id } = router.query

    console.log(id)

    useEffect(() => {
        axios({
            data: {
                categoryId: id  
            },
            method: 'post',
            url: '/api/category/postList'
        })
        .then((res) => {
            console.log(res.data)
        })
    }, [])

    return (
        <>
            {}
        </>
    )
}

export default PostList