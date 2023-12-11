import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/menu/category.module.css'
import {useEffect, useState} from "react"
import AdminHeader from "../../../layout/admin/header"
import AdminSidebar from "../../../layout/admin/sidebar"

/**
 * Rendering the category page.
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 04.
 *
 * @author Ha Seong Kim
 * @since 2023. 12. 11.
 * @returns
 */
export default function AdminCatePage() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [categorySubject, setCategorySubject] = useState("");
    const [categoryCountVisible, setCategoryCountVisible] = useState("");
    const [categoryVisible, setCategoryVisible] = useState("");
    const [categoryType, setCategoryType] = useState("");
    const [categoryListVisible, setCategoryListVisible] = useState("");
    const [categoryFold, setCategoryFold] = useState("");
    
    useEffect(() => {
        axios({
            method: "get",
            url: "/api/admin/list",
        }).then((res) => {
            setData(res.data);
            console.log(res.data);
        });
    }, [])

    const handleCategoryClick = (mapper) => {
        setSelectedCategory(mapper);
        setCategoryId(mapper.id);
        setCategorySubject(mapper.subject);
        setCategoryCountVisible(mapper.countVisible);
        setCategoryVisible(mapper.visible);
        setCategoryType(mapper.type);
        setCategoryListVisible(mapper.listVisible);
        setCategoryFold(mapper.fold);
    };

    const createCategory = (categoryId) => {
        axios
          .post('/api/admin/createCategory', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error creating category line:', error);
          });
      };

    const createCategoryLine = (categoryId) => {
        axios
          .post('/api/admin/createCategoryLine', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error creating category line:', error);
          });
      };

      const deleteCategory = (categoryId) => {
        axios
          .post('/api/admin/deleteCategory', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error creating category line:', error);
          });
      };

      const updateCategoryUp = (categoryId) => {
        axios
          .post('/api/admin/updateCategoryUp', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error creating category line:', error);
          });
      };

      const updateCategoryDown = (categoryId) => {
        axios
          .post('/api/admin/updateCategoryDown', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error creating category line:', error);
          });
      };

      const updateCategoryTop = (categoryId) => {
        axios
          .post('/api/admin/updateCategoryTop', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error creating category line:', error);
          });
      };

      const updateCategoryBottom = (categoryId) => {
        axios
          .post('/api/admin/updateCategoryBottom', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            window.location.reload();
          })
          .catch((error) => {
            console.error('Error creating category line:', error);
          });
      };

    return (
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
                        <div className={`${styles.pageTitle } border-bottom`}><span className={styles.pageTitleFont}>카테고리 관리</span></div>
                        <div className= {`${styles.pageContent } border-bottom`}>
                           <div className={styles.listField}>
                               <div className={styles.btnField}>
                                   <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `} 
                                   onClick={() => createCategory(categoryId)} >+ 카테고리 추가</button>
                                   <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                   onClick={() => createCategoryLine(categoryId)} >+ 구분선 추가</button>
                                   <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                   onClick={() => deleteCategory(categoryId)} >- 삭제</button>
                               </div>
                               <div  style={{maxHeight:'400px', overflowY: 'auto', width:'350px'}}>
                                   <div className="list-group">
                                        {data?.map((mapper) => {
                                            return (
                                                <button key={mapper.id} type="button"
                                                className={`list-group-item list-group-item-action ${selectedCategory === mapper ? styles.selected : ''}`}
                                                onClick={() => handleCategoryClick(mapper)} >
                                                    {
                                                        mapper.depth === 0
                                                        ? mapper.subject + ' (' + mapper.postCount + ')'
                                                        : ' ㄴ' + mapper.subject + ' (' + mapper.postCount + ')'
                                                    }
                                                </button>
                                            )
                                        })}
                                   </div>
                               </div>
                           </div>
                           <div className={styles.setting}>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>카테고리 명</label>
                                   <input className={styles.set1} name={"categorySubject"} type={"text"} placeholder={"카테고리명"}
                                   value = {categorySubject} onChange={(e) => setCategorySubject(e.target.value)}
                                   readOnly = {categorySubject === '전체 보기'}
                                   />
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>글 개수 표시</label>
                                   <input className={styles.set2} id={"cntMark"} name={"cntMark"} type={"checkbox"} placeholder={"게시판"}
                                   checked = {categoryCountVisible === 0} />
                                   <label htmlFor={"cntMark"}>카테고리 옆에 글 개수 표시</label>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>공개설정</label>
                                   <input className={styles.set3} type={"radio"} id={"public"} name={"lock"} value={"public"}
                                   checked = {categoryVisible === 0}/>
                                   <label htmlFor={"public"}>공개</label>
                                   <input className={styles.set3} type={"radio"} id={"private"} name={"lock"} value={"private"}
                                   checked = {categoryVisible === 1}/>
                                   <label htmlFor={"private"}>비공개</label>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>글보기</label>
                                   <input className={styles.set4} type={"radio"} id={"viewBlog"} name={"postView"}  value={"viewBlog"}
                                   checked = {categoryType === 1}/>
                                   <label htmlFor={"viewBlog"} ><Image className={styles.viewImg}  src='/image/viewBlog.png' alt='블로그' width={30} height={30} />블로그형</label>
                                   <input className={styles.set4} type={"radio"} id={"viewAlbum"}  name={"postView"} value={"viewAlbum"}
                                   checked = {categoryType === 2}/>
                                   <label htmlFor={"viewAlbum"}><Image className={styles.viewImg}  src='/image/viewAlbum.png' alt='이미지' width={30} height={30} />앨범형</label>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>목록보기</label>
                                   <input className={styles.set5} type={"radio"} id={"listViewClose"} name={"listView"} value={"close"}
                                   checked = {categoryListVisible === 1}/>
                                   <label htmlFor={"listViewClose"}>목록 닫기</label>
                                   <input className={styles.set5} type={"radio"} id={"listViewOpen"}  name={"listView"} value={"open"}
                                   checked = {categoryListVisible === 0}/>
                                   <label htmlFor={"listViewOpen"}>목록 열기</label>
                               </div>
                               <div className={styles.setField}>
                                   <div className={styles.btnField}>
                                       <label className={styles.setLabel}>카테고리 정렬</label>
                                       <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                       onClick={() => updateCategoryUp(categoryId)} >위</button>
                                       <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                       onClick={() => updateCategoryDown(categoryId)} >아래</button>
                                       <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                       onClick={() => updateCategoryTop(categoryId)} >맨위</button>
                                       <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                       onClick={() => updateCategoryBottom(categoryId)} >맨아래</button>
                                   </div>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>카테고리 접기</label>
                                   <input className={styles.set6} type={"radio"} id={"cateViewClose"} name={"cateView"} 
                                   value={"cateViewClose"} checked = {categoryFold === 1}/>
                                   <label htmlFor={"cateViewClose"}>펼치기</label>
                                   <input className={styles.set6} type={"radio"} id={"cateViewOpen"}  name={"cateView"}
                                   value={"cateViewOpen"} checked = {categoryFold === 0}/>
                                   <label htmlFor={"cateViewOpen"}>접기</label>
                               </div>
                               <button type="submit" className={`${styles.subBtn }  btn btn-primary mb-3`} >레이아웃 적용</button>
                           </div>
                        </div>



                        <div>                       
                                <div className={styles.setField}>
                                    <label className={styles.setLabel}>id값</label>
                                    <input className={styles.set1} name={"categoryId"} type={"text"} placeholder={""}
                                    value = {categoryId} onChange={(e) => setCategoryId(e.target.value)} />
                                    <input className={styles.set1} name={"categoryId"} type={"text"} placeholder={""}
                                    value = {categoryId} onChange={(e) => setCategoryId(e.target.value)} />
                                </div>
                                <div className={styles.setField}>
                                    <label className={styles.setLabel}>카테고리 제목</label>
                                    <input className={styles.set1} name={"categorySubject"} type={"text"} placeholder={""}
                                    value = {categorySubject} onChange={(e) => setCategorySubject(e.target.value)} />
                                    <input className={styles.set1} name={"categorySubject"} type={"text"} placeholder={""}
                                    value = {categorySubject} onChange={(e) => setCategorySubject(e.target.value)} />
                                </div>
                                <div className={styles.setField}>
                                    <label className={styles.setLabel}>글 개수 표시 유무</label>
                                    <input className={styles.set1} name={"categoryCountVisible"} type={"text"} placeholder={""}
                                    value = {categoryCountVisible} onChange={(e) => setCategoryCountVisible(e.target.value)} />
                                    <input className={styles.set1} name={"categoryCountVisible"} type={"text"} placeholder={""}
                                    value = {categoryCountVisible} onChange={(e) => setCategoryCountVisible(e.target.value)} />
                                </div>
                                <div className={styles.setField}>
                                    <label className={styles.setLabel}>공개 설정</label>
                                    <input className={styles.set1} name={"categoryVisible"} type={"text"} placeholder={""}
                                    value = {categoryVisible} onChange={(e) => setCategoryVisible(e.target.value)} />
                                    <input className={styles.set1} name={"categoryVisible"} type={"text"} placeholder={""}
                                    value = {categoryVisible} onChange={(e) => setCategoryVisible(e.target.value)} />
                                </div>
                                <div className={styles.setField}>
                                    <label className={styles.setLabel}>블로그형 / 앨범형</label>
                                    <input className={styles.set1} name={"categoryType"} type={"text"} placeholder={""}
                                    value = {categoryType} onChange={(e) => setCategoryType(e.target.value)} />
                                    <input className={styles.set1} name={"categoryType"} type={"text"} placeholder={""}
                                    value = {categoryType} onChange={(e) => setCategoryType(e.target.value)} />
                                </div>
                                <div className={styles.setField}>
                                    <label className={styles.setLabel}>목록 보기</label>
                                    <input className={styles.set1} name={"categoryListVisible"} type={"text"} placeholder={""}
                                    value = {categoryListVisible} onChange={(e) => setCategoryListVisible(e.target.value)} />
                                    <input className={styles.set1} name={"categoryListVisible"} type={"text"} placeholder={""}
                                    value = {categoryListVisible} onChange={(e) => setCategoryListVisible(e.target.value)} />
                                </div>
                                <div className={styles.setField}>
                                    <label className={styles.setLabel}>접기</label>
                                    <input className={styles.set1} name={"categoryFold"} type={"text"} placeholder={""}
                                    value = {categoryFold} onChange={(e) => setCategoryFold(e.target.value)} />
                                    <input className={styles.set1} name={"categoryFold"} type={"text"} placeholder={""}
                                    value = {categoryFold} onChange={(e) => setCategoryFold(e.target.value)} />
                                </div>
                            </div>                  




                        <div className={styles.blockInfo}>
                            <ul>
                                <li>글이 많은 카테고리는 설정이 반영되는데 시간이 소요됩니다.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
