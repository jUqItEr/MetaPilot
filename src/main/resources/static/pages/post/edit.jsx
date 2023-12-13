import Head from "next/head"
import RichTextEditor from "../../components/common/editor"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const PostEdit = ({ categoryId, postId }) => {
    const [data, setData] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (isLoading) {
            router.replace('/')
        }

        axios({
            method: 'get',
            params: {
                postId: 90
            },
            url: '/api/post/view'
        })
        .then((res) => {
            setData(res.data)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <>
            <Head>
                <title>게시글 수정</title>
            </Head>
            <header>
                <button className='btn btn-primary' type='button'>발행</button>
            </header>
            <div className='container'>
                <input className='form-control' type='text' placeholder='제목을 입력해주세요.' defaultValue={data?.post?.subject}/>
                <RichTextEditor initialData={data?.post?.content} />
            </div>
        </>
    )
}

export default PostEdit