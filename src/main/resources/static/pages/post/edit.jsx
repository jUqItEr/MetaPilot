import Head from "next/head"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"

const RichTextEditor = dynamic(
    () => import("../../components/common/editor"),
    { ssr: false }
)

const PostEdit = ({ categoryId, postId }) => {
    const [data, setData] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (postId !== undefined) {
            // 게시글 수정 모드로 동작
            axios({
                method: 'get',
                params: {
                    postId: postId
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
        } else {
            axios({
                method: 'post',
                url: '/api/post/create'
            })
            .then((res) => {})
        }
    }, [])

    return (
        <>
            <Head>
                <title>게시글 {postId ? '수정' : '작성'}</title>
            </Head>
            <header>
                <button className='btn btn-primary' type='button'>발행</button>
            </header>
            <div className='container'>
                <table>
                    <tbody>
                        <tr>
                            <td width={90}>게시글 제목</td>
                            <td><input className='form-control' type='text' placeholder='제목을 입력해주세요.' /></td>
                        </tr>
                    </tbody>
                </table>
                <RichTextEditor initialData={data?.post?.content} />
            </div>
        </>
    )
}

export default PostEdit