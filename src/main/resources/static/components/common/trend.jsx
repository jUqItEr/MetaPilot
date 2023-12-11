import axios from "axios"
import { useEffect, useState } from "react"
import PostView from "./post"


const TrendPost = () => {
    const [ trend, setTrend ] = useState([])

    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/post/trend'
        })
        .then((res) => {
            setTrend(res.data)
        })
    }, [])

    return (
        <>
        {trend?.map((post) => (
            <PostView id={`${post.id}`} />
        ))}
        </>
    )
}

export default TrendPost