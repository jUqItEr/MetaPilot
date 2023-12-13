import axios from "axios"
import { useEffect, useState } from "react"
import Image from "next/image";
import Link from "next/link";
import styles from "/styles/common/trend.module.css";

const PostView = ({ post }) => {
    return (
        <li className={styles.popularPostBox}>
            <div className={styles.popularPostContent}>
                <div className={styles.popularImageBox}>
                    <Link href={`/post/${post.id}`}>
                        <a className={styles.popularImageLink}>
                            <Image
                                className={styles.popularImage}
                                //src={"/image/emptyImage.jpg"}
                                src={post.thumbnail || "/image/emptyImage.jpg"}
                                alt={"image"}
                                width={150}
                                height={150}
                            />
                            <div className={styles.popularImageTitle}>
                                <span className={styles.popularSubject}>{post.subject}</span>
                            </div>
                            <div>
                                <span className={styles.popularCategoryName}>{post.categorySubject}</span>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
        </li>
    )
}

export default PostView