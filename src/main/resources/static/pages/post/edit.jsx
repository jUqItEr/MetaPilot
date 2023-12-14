import Head from "next/head"
import RichTextEditor from "../../components/common/editor"
import { useEffect, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"

const PostEdit = ({ categoryId, postId }) => {
    const [data, setData] = useState([])
    const router = useRouter()

    useEffect(() => {
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
                <table className='table'>
                    <tr scope>
                        <td width={90}>게시글 제목</td>
                        <td><input className='form-control' type='text' placeholder='제목을 입력해주세요.' defaultValue={data?.post?.subject}/></td>
                    </tr>
                </table>
                <RichTextEditor initialData={data?.post?.content} />
            </div>
        </>
    )
}

export default PostEdit