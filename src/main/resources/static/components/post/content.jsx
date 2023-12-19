import styles from '/styles/post/post.module.css'

const PostContent = ({post}) => {
    return (
        <>
            <div className={styles.postContent} dangerouslySetInnerHTML={{ __html: post?.content }} />
        </>
    )
}

export default PostContent