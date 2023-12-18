import axios from "axios"
import dynamic from "next/dynamic"
import styles from '/styles/post/edit.module.css'
import { useEffect, useState } from "react"
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faClock } from "@fortawesome/free-solid-svg-icons"
import $ from 'jquery'
import Modal from "react-bootstrap/Modal"

const RichTextEditor = dynamic(
    () => import("../../components/common/editor"),
    { ssr: false }
)

const PostEdit = () => {
    const [data, setData] = useState([])
    const [id, setId] = useState(1)
    const [postId, setPostId] = useState(0)
    const [user, setUser] = useState([])
    const [categories, setCategories] = useState([])
    const [isReservation, setIsReservation] = useState(false)
    const [selectedDateTime, setSelectedDateTime] = useState("")
    const [tags, setTags] = useState([])
    const [tagInput, setTagInput] = useState('')
    const [requestTime, setRequestTime] = useState(new Date())
    const [tempTotalCount, setTempTotalCount] = useState(true)
    const [tempList, setTempList] = useState([])
    const [showModal, setShowModal] = useState(false);
    const router = useRouter()

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const toggleCategory = () => {
        $('.publish-menu').toggle()
    };

    const handleCategoryChange = (event) => {
        setId(event.target.value)
    }

    const handleReservationChange = (event) => {
        setIsReservation(event.target.id === "reservation");
    };

    const handleDateTimeChange = (event) => {
        setSelectedDateTime(event.target.value);
    };

    // 태그 입력을 처리하는 함수
    const handleTagInput = (e) => {
        setTagInput(e.target.value);
    };

    // 태그를 추가하는 함수
    const addTags = (e) => {
        const value = e.target.value;
        if (value.endsWith(' ') || value.endsWith('\n')) {
            // 입력된 텍스트에서 스페이스바와 엔터를 기준으로 태그를 분리합니다.
            let newTags = value.split(/[\s\n]+/).filter(tag => tag.trim() !== '' && !tags.includes(tag.trim()));
            setTags([...tags, ...newTags]);
            setTagInput(''); // 입력 필드 초기화
        } else {
            setTagInput(value); // 입력값 업데이트
        }
    };

    // 태그를 제거하는 함수
    const removeTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const getCategories = () => {
        axios({
            method: "get",
            url: "/api/category/count"
        }) .then((res) => {
            setCategories(res.data)
        })
    }

    const handleSubmit = () => {
        const formData = new FormData()
        const cid = $('.category').val()
        const privatePublish = $('#private').is(':checked')
        const isNotice = $('#noticeCheck').is(':checked')
        const title = $('#title').val()
        
        if (title !== '') {
            if (privatePublish && isNotice) {
                alert('공지를 비공개로 등록할 수 없습니다.')
                return
            }
            const post = {
                'categoryId': cid,
                'postId': postId,
                'subject': title,
                'content': null,
                'type': privatePublish ? 1 : 0,
                'notice': isNotice ? 1: 0
            }
    
            formData.append('post', new Blob([JSON.stringify(post)], {
                type: 'application/json'
            }))
            formData.append('tags', new Blob([JSON.stringify(tags)], {
                type: 'application/json'
            }))
    
            axios({
                data: formData,
                headers: {
                    'Content-Type': 'Multipart/form-data'
                },
                method: "post",
                url: "/api/post/update"
            }) .then(res => {
                if (res.data) {
                    localStorage.removeItem('categoryId')
                    localStorage.removeItem('postId')
                    router.push('/')
                    return
                }
            })
        } else {
            alert('제목을 입력해주세요.')
        }
    }

    useEffect(() => {
        const cid = localStorage.getItem('categoryId')
        const pid = localStorage.getItem('postId')

        setUser(JSON.parse(localStorage.getItem('user')))

        setId(cid || 1)
        setPostId(pid)
        getCategories()

        if (pid !== undefined) {
            // 게시글 수정 모드로 동작
            axios({
                method: 'get',
                params: {
                    postId: pid
                },
                url: '/api/post/view'
            })
            .then((res) => {
                setData(res.data)
                setTags(res.data?.hashtags?.map(tag => tag.content))
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            axios({
                method: 'post',
                url: '/api/post/create'
            })
            .then((res) => {
                axios({
                    method: 'get',
                    url: '/api/post/'
                })
            })
        }
        axios({
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            method: 'get',
            params: {
                userId: user?.id,
            },
            url: '/api/post/temporary/count'
        }).then((res) => {
            const tempCount = res.data
            setTempTotalCount(tempCount)
        })
        .catch(_ => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.push('/')
            return
        })

        axios({
            headers: {
                'Authorization': localStorage.getItem('token'),
            },
            method: 'get',
            params: {
                userId: user?.id,
            },
            url: '/api/post/temporary/list'
        }).then((res) => {
            setTempList(res.data)
        })
        .catch(_ => {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            router.push('/')
            return
        })
    }, [tempTotalCount, requestTime])

    return (
        <>
            <div className='container'>
                <header className={styles.editHeader}>
                    <div></div>
                    <div className={styles.headerButton}>
                        <div className={styles.temporaryGroup}>
                            <button className={`${styles.temporaryButton} btn btn-Link`} type='button'>
                                <span>임시저장</span>
                            </button>
                            <span className={styles.temporaryText}>|</span>
                            <button
                                className={`${styles.temporaryButton} btn btn-Link`}
                                type='button'
                                onClick={openModal}
                            >{tempTotalCount}</button>
                        </div>
                        <button
                            className='btn btn-primary'
                            type='button'
                            onClick={toggleCategory}>
                            발행
                        </button>
                    </div>
                </header>
                <table>
                    <tbody>
                        <tr className={styles.editTitle}>
                            <td className={styles.editSecret}>
                                <div style={{
                                    minWidth: '50px'
                                }}>제목</div>
                                <div style={{
                                    minWidth: '400px'
                                }}><input className='form-control' type='text' id='title' placeholder='제목을 입력해주세요.' defaultValue={data?.post?.subject} /></div>
                                <input className={`${styles.editFile} form-control form-control-sm`} id='formFileSm' type='file'/>    
                            </td>
                        </tr>
                    </tbody>
                </table>
                <RichTextEditor initialData={data?.post?.content} />
                {/* 위치 절대 좌표로 */}
                <div className={`${styles.position} card card-body publish-menu`} style={{
                    display: 'none'
                }}>
                        <div className="form-row align-items-center">
                            <div className="col">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td width={100}><strong>카테고리</strong></td>
                                            <td width={'79%'}>
                                                <select value={id}
                                                    onChange={handleCategoryChange}
                                                    className='form-control category'>
                                                    {categories.map((category, index) => (
                                                        <option key={index} value={category.id}>
                                                            {(category.refId > 1 ? '└ ' : '') + category.subject}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>공개 설정</strong></td>
                                            <td>
                                                <div className={styles.tablePublic}>
                                                <div className={`${styles.tableForm} d-flex`}>
                                                    <div className={styles.timeGroup}>
                                                        <input type="radio"
                                                            name="publicGroup"
                                                            id="public"
                                                            defaultChecked={data?.post?.type != 1 || data?.post === undefined}/>
                                                        <label htmlFor="public">&nbsp;공개</label>
                                                    </div>
                                                    <div className={styles.timeGroup}>
                                                        <input type="radio"
                                                            name="publicGroup"
                                                            id="public"
                                                            defaultChecked={data?.post?.type == 1}/>
                                                        <label htmlFor="private">&nbsp;비공개</label>
                                                    </div>
                                                </div>
                                                </div>
                                            </td>
                                            </tr>
                                    </tbody>
                                </table>
                            </div>
                            <hr/>
                            <div className="form-group">
                                <label htmlFor="hashtags">태그 입력</label>
                                <textarea
                                    className={`${styles.hashtag} form-control`}
                                    id="hashtags"
                                    rows="1"
                                    value={tagInput}
                                    onChange={addTags}
                                    placeholder="태그를 입력해주세요 (최대 30개)"/>
                                <div style={{
                                    marginTop: '10px',
                                    marginBottom: '10px',
                                }}>태그 편집</div>
                                <div className={styles.tagsContainer}>
                                    {tags.map((tag, index) => (
                                        <span key={index} className={styles.tag} style={{
                                            padding: '5px'
                                        }}>
                                            #{tag}
                                            <span className={styles.tagCloseBtn} onClick={() => removeTag(index)}>&times;</span>
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <hr/>
                            <div className={`${styles.formGroup} "form-group"`}>
                                <strong className={styles.publicationTime}>발행 시간</strong>
                                <div className="d-flex">
                                    <div className={styles.timeGroup}>
                                        <input type="radio" 
                                            name="reservationGroup" 
                                            id="now" 
                                            checked={!isReservation} 
                                            onChange={handleReservationChange}/>
                                        <label htmlFor="now">&nbsp;현재</label>
                                    </div>
                                    {!data?.post && (
                                        <div className={styles.timeGroup}>
                                        <input type="radio" 
                                            name="reservationGroup" 
                                            id="reservation" 
                                            checked={isReservation} 
                                            onChange={handleReservationChange}/>
                                        <label htmlFor="reservation">&nbsp;예약</label>
                                    </div>
                                    )}
                                </div>
                                
                            </div>
                            {isReservation && (
                                    <>
                                        <div className={styles.reservation}>
                                            <span className={styles.reservationText}><FontAwesomeIcon icon={faClock} className={styles.reservationIcon}/>예약할 시간을 설정해주세요</span>
                                            <input
                                                type="datetime-local"
                                                className="form-control"
                                                onChange={handleDateTimeChange}
                                            />
                                        </div>
                                    </>
                                )}
                            <hr/>
                            <div className={`${styles.createButton} col-auto`}>
                                <div className={`${styles.formCheckCustom} form-check`}>
                                    <input
                                        className= {`${styles.formCheckbox}" form-check-input"`}
                                        type="checkbox"
                                        id="noticeCheck"
                                        defaultChecked={data?.post?.notice}
                                    />
                                    <label className="form-check-label" htmlFor="noticeCheck">
                                        공지사항으로 등록
                                    </label>
                                </div>
                                <button className='btn btn-info' type='button' onClick={handleSubmit}>
                                    등록
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
            <Modal show={showModal} onHide={closeModal} className={styles.modalform}>
                <Modal.Header closeButton>
                    <Modal.Title className={styles.modalTitle}>임시저장 글</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={`${styles.modalForm} container`}>
                        <div className={styles.modalTitle}>
                            총 <span className={styles.modalCount}>{tempTotalCount}</span>개
                        </div>
                        <hr />
                        <div className={styles.modalContent}>
                            {tempList.map((tempList, index) => (
                                <div key={index} className={styles.postItem} onClick={() => {
                                    localStorage.setItem('categoryId', tempList?.categoryId)
                                    localStorage.setItem('postId', tempList?.postId)
                                    router.push('/post/edit')
                                    closeModal()
                                    return
                                }}>
                                    <h4>{tempList.subject === null ? "임시저장" + (index + 1) : tempList.subject}</h4>
                                    <p>{tempList?.content}</p>
                                    <hr />
                                </div>
                            ))}
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default PostEdit
