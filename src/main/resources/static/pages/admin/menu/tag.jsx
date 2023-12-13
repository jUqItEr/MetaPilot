import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/menu/tag.module.css'
import {useEffect,useState} from "react"
import AdminHeader from "../../../layout/admin/header"
import AdminSidebar from "../../../layout/admin/sidebar"

/**
 * Rendering the blog info page
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 07.
 * @returns
 */

export default function AdminHashTagPage() {
    const [tag, setTag] = useState([]);
    const [originalTag, setOriginalTag] = useState()

    const changeTag = component => {
        axios({
            method: 'post',
            params: {
                content: component
            },
            url: '/api/admin/'
        })
    }

    const moveTag = component => {
        const tag = component.content
        $('#tag-name').val(tag)
        $('#tag-name').attr('readOnly', false)
        setOriginalTag(tag)
    }

    const modifyTag = () => {
        const tag = $('#tag-name').val()
        const isInitial = originalTag === tag

        if (!isInitial) {
            axios({
                method: 'get',
                params: {
                    content: $('#tag-name').val()
                },
                url: '/api/admin/hasTag'
            })
            .then((res) => {
                if (!res.data) {
                    changeTag(tag)
                } else {
                    alert('이미 사용 중인 해시태그입니다.')
                }
            })
        } else {
            alert('해시태그를 수정하려면 변경해주세요.')
        }
    }

    const removeTag = () => {

    }
    
    useEffect(() => {        
        axios({
            method: 'get',
            params: {
                type: 0
            },
            url: '/api/admin/readTag'
        })
        .then((res) => {
            setTag(res.data)
            console.log("here : ",res)
        })
        .catch((err) => {
            console.log(err)
        })
    }, []);

    return(
        <>
            <Head> 
                <title>관리자 페이지</title>
                <meta property='og:title' content='관리자 페이지' key='title'/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div id={styles.wrap}>
                {/*header*/}
                <AdminHeader/>
                <div className="d-flex flex-nowrap">
                    {/*sidebar*/}
                    <AdminSidebar/>
                    {/* content */}
                    <div className={styles.content} >
                        <div className={`${styles.pageTitle } border-bottom `}><span className={styles.pageTitleFont}>해시태그 일괄 변경</span></div>
                        <div className= {`${styles.pageContent } border-bottom `}>
                            <div className={styles.listField}>
                                <div  style={{maxHeight:'400px', overflowY: 'auto', width:'350px'}}>
                                    <div className="list-group">
                                        {
                                            tag?.map((mapper) => (
                                                <button className="list-group-item list-group-item-action" type="button"
                                                    key={mapper.content} onClick={() => moveTag(mapper)}>{mapper.content}</button>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={styles.setting} >
                                <label className="pb-3">태그 정렬</label>
                                <div className="input-group mb-5">
                                    <button className="btn btn-primary ps-5 pe-5 " type="button" id="btnOrderUse" style={{border:'1px solid white'}} >사용순</button>
                                    <button className="btn btn-primary ps-5 pe-5" type="button" id="btnOrderABC"style={{border:'1px solid white'}} >가나다순</button>

                                </div>
                                <label className="pb-3 mt-5">태그 수정, 삭제</label>
                                <div className="input-group">
                                    <input className="form-control" id="tag-name" type="text" placeholder="수정할 해시태그명을 입력하세요." aria-describedby="button-addon2" readOnly/>
                                    <button className="btn btn-primary ps-3 pe-3" type="button" id="btnUpdate" style={{border:'1px solid white'}} onClick={modifyTag}>수정</button>
                                    <button className="btn btn-primary ps-3 pe-3" type="button" id="btnDelete" style={{border:'1px solid white'}} onClick={removeTag}>삭제</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
};
