import axios from "axios"
import { useEffect, useState } from "react"


const PostView = (props) => {
    const [ post, setPost ] = useState([])
    const id = props.id

    useEffect(() => {
        axios({
            data: {
                id: id
            },
            method: 'get',
            url: '/api/post/view'
        })
        .then((res) => {
            setPost(res.data)
        })
    }, [])

    
}

export default PostView