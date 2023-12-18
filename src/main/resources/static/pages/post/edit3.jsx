import axios from "axios"
import dynamic from "next/dynamic"
import styles from '/styles/post/edit.module.css'
import { useEffect, useState } from "react"
import { useRouter } from "next/router"

const RichTextEditor = dynamic(
    () => import("../../components/common/editor"),
    { ssr: false }
)

const PostEdit = ({ categoryId, postId }) => {
    const [data, setData] = useState([])
    const [user, setUser] = useState([])
    const router = useRouter()

    useEffect(() => {
        const tempUser = localStorage.getItem('user')

        setUser(tempUser)
        // 만약 카테고리 아이디가 없으면 자동으로 1임
        categoryId = categoryId || 1

        if (tempUser === undefined) {
            router.push('/')
            return
        }
        if (postId !== undefined) {
            // 게시글 수정 모드로 동작
            axios({
                method: 'get',
                params: {
                    postId: postId
                },
                url: '/api/post/view'
            })
            .then(res => {
                setData(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            axios({
                method: 'post',
                params: {
                    categoryId: categoryId,
                    userId: tempUser?.id
                },
                url: '/api/post/create'
            })
            .then((res) => {})
        }
    }, [])

    return (
        <>
            <div className='container'>
                <header className={styles.editHeader}>
                    <div></div>
                    <div className={styles.headerButton}>
                        <button className='btn btn-secondary' type='button'>임시저장</button>
                        <button className='btn btn-primary' type='button'>발행</button>
                    </div>
                </header>
                <table>
                    <tbody>
                        <tr className={styles.editTitle}>
                            <td className={styles.editSecret}>
                                <div width={90}>제목</div>
                                <div><input className='form-control' type='text' placeholder='제목을 입력해주세요.' /></div>

                                <input type="checkbox" id="formcheck" className={styles.editorCheckbox}/>
                                <label htmlFor="formcheck" className={styles.editorLabel}>비밀댓글</label>
                                <input className={`${styles.editFile} form-control form-control-sm`} id='formFileSm' type='file'/>    
                            </td>
                        </tr>
                    </tbody>
                </table>
                <RichTextEditor initialData={data?.post?.content} />

            </div>
        </>
    )
}

export default PostEdit