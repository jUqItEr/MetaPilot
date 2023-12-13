import axios from "axios"
import { useEffect, useState } from "react"
import PostView from "./post"
import Image from "next/image";
import Link from "next/link";

import styles from "/styles/common/trend.module.css";

const TrendPost = () => {
    const [trend, setTrend] = useState([]);

    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/post/popular'
        })
        .then((res) => {
            console.log(res.data);
            setTrend(res.data);
        });
    }, []);

    return (
        <>
        
        
        <div className={styles.wrap}>
            <div className={styles.popularPost}>
                <span className={styles.popularPostTitle}>인기글</span>
            </div>
            <div className={styles.popularPostContainer}>
                <ul className={styles.popularPostList}>
                    {trend?.map((post) => (
                        <PostView post={post} key={post.id} />
                    ))}
                </ul>
            </div>
        </div>
        </>
        
    )
}

export default TrendPost