const PostContent = ({post}) => {
    return (
        <>
            <div dangerouslySetInnerHTML={{ __html: post?.content }} />
        </>
    )
}

export default PostContent