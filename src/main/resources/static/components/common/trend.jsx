import axios from "axios"
import { useEffect, useState } from "react"
import PostView from "./post"

import styles from "/styles/common/trend.module.css";

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
        
        <div className={styles.wrap}>
            <div className={styles.popularPost}>
                <span className={styles.popularPostTitle}>인기글</span>
            </div>
            <div className={styles.popularPostContent}>
                <ul className={styles.popularPostList}>
                    <li>
                        1
                    </li>
                    <li>2</li>
                    <li>3</li>
                </ul>
            </div>
        </div>
        </>
        
    )
}

export default TrendPost