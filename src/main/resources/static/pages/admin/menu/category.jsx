import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/menu/category.module.css'
import {useEffect, useState} from "react"
import AdminHeader from "../../../layout/admin/header"
import AdminSidebar from "../../../layout/admin/sidebar"
import { color } from "framer-motion"
import { faDisplay } from "@fortawesome/free-solid-svg-icons"

/**
 * Rendering the category page.
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 04.
 *
 * @author Ha Seong Kim
 * @since 2023. 12. 14.
 * @returns
 */

export default function AdminCatePage() {
    const [data, setData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryId, setCategoryId] = useState(1);
    const [categorySubject, setCategorySubject] = useState("");
    const [categoryCountVisible, setCategoryCountVisible] = useState("");
    const [categoryVisible, setCategoryVisible] = useState("");
    const [categoryType, setCategoryType] = useState("");
    const [categoryListVisible, setCategoryListVisible] = useState("");
    const [categoryFold, setCategoryFold] = useState("");
    const [categoryDepth, setCategoryDepth] = useState("");
    const [deleteOption, setDeleteOption] = useState('deleteAll');
    const [requestTime, setRequestTime] = useState(new Date());

    const handleCategoryClick = (mapper) => {
        setSelectedCategory(mapper);
        setCategoryId(mapper.id);
        setCategorySubject(mapper.subject);
        setCategoryCountVisible(mapper.countVisible);
        setCategoryVisible(mapper.visible);
        setCategoryType(mapper.type);
        setCategoryListVisible(mapper.listVisible);
        setCategoryFold(mapper.fold);
        setCategoryDepth(mapper.depth);
    };

    const createCategory = (categoryId) => {
        axios
          .post('/api/admin/createCategory', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            //window.location.reload();
            setRequestTime(new Date());
          })
          .catch((error) => {
            console.error('에러!!! 카테고리 생성 : ', error);
          });
      };

    const createCategoryLine = (categoryId) => {
        axios
          .post('/api/admin/createCategoryLine', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            //window.location.reload();
            setRequestTime(new Date());
          })
          .catch((error) => {
            console.error('에러!!! 구분선 생성 : ', error);
          });
      };

      const deleteCategory = (categoryId) => {
        axios
          .post('/api/admin/deleteCategory', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            document.querySelector(".deletePopUp").style.display = "none";
            document.querySelector(".deletePopUpBackGround").style.display = "none"
            //window.location.reload();
            setRequestTime(new Date());
          })
          .catch((error) => {
            console.error('에러!!! 카테고리 or 구분선 삭제 : ', error);
          });
      };

      const deleteCategoryRef = (categoryId) => {
        axios
          .post('/api/admin/deleteCategoryRef', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            document.querySelector(".deletePopUp").style.display = "none";
            document.querySelector(".deletePopUpBackGround").style.display = "none"
            //window.location.reload();
            setRequestTime(new Date());
          })
          .catch((error) => {
            console.error('에러!!! 부모 카테고리 & 자식 카테고리 전부 삭제 : ', error);
          });
      };

      const updateCategory = (categoryId, categorySubject, categoryType, categoryVisible, categoryCountVisible) => {
        axios
          .post('/api/admin/updateCategory', {
            id: categoryId,
            subject: categorySubject,
            type : categoryType,
            visible : categoryVisible,
            countVisible : categoryCountVisible,
          })
          .then((response) => {
            console.log(response.data);
            //window.location.reload();
            setRequestTime(new Date());
          })
          .catch((error) => {
            console.error('에러!!! 카테고리 수정 : ', error);
          });
      };

      const updateCategoryUp = (categoryId) => {
        axios
          .post('/api/admin/updateCategoryUp', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            //window.location.reload();
            setRequestTime(new Date());
          })
          .catch((error) => {
            console.error('에러!!! 카테고리 위로 : ', error);
          });
      };

      const updateCategoryDown = (categoryId) => {
        axios
          .post('/api/admin/updateCategoryDown', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            //window.location.reload();
            setRequestTime(new Date());
          })
          .catch((error) => {
            console.error('에러!!! 카테고리 아래로 : ', error);
          });
      };

      const updateCategoryTop = (categoryId) => {
        axios
          .post('/api/admin/updateCategoryTop', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            //window.location.reload();
            setRequestTime(new Date());
          })
          .catch((error) => {
            console.error('에러!!! 카테고리 맨위로 : ', error);
          });
      };

      const updateCategoryBottom = (categoryId) => {
        axios
          .post('/api/admin/updateCategoryBottom', { id: categoryId })
          .then((response) => {
            console.log(response.data);
            //window.location.reload();
            setRequestTime(new Date());
          })
          .catch((error) => {
            console.error('에러!!! 카테고리 맨아래로 : ', error);
          });
      };

      useEffect(() => {
          axios({
              method: "get",
              url: "/api/admin/category/list",
          }).then((res) => {
              setData(res.data);
              console.log(res.data);
          });
      }, [requestTime]);

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
                    <div className={styles.content} style={{position: 'relative'}}>
                        <div className={`${styles.pageTitle } border-bottom`}><span className={styles.pageTitleFont}>카테고리 관리</span></div>
                        <div className= {`${styles.pageContent } border-bottom`}>
                           <div className={styles.listField}>
                              <div className={styles.btnField}>
                                   <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `} 
                                   onClick={() => createCategory(categoryId)} >+ 카테고리 추가</button>
                                   <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                   onClick={() => createCategoryLine(categoryId)} >+ 구분선 추가</button>
                                   <div style={{position: 'relative'}}>
                                    <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                    onClick={() => {
                                        if(selectedCategory?.refCount === 0) {
                                          deleteCategory(categoryId);
                                        } else {
                                          document.querySelector(".deletePopUp").style.display = "block";
                                          document.querySelector(".deletePopUpBackGround").style.display = "block"
                                        }
                                      }
                                    }
                                    disabled = {categoryId === 1 ? true : false} >- 삭제</button><br></br>
                                    <div className="deletePopUp" style={{border: '1px solid black', zIndex: '1000', position: 'absolute',
                                      width: '400px', backgroundColor: 'white', padding: '10px', display: 'none'}}>
                                      <label className={styles.setLabel}>카테고리 삭제</label>
                                      <p style={{paddingTop: '10px'}}>하위 카테고리를 가지고 있는 카테고리입니다.</p>
                                      <input className={styles.set7} type={"radio"} id={"delete1"} name={"delete"} value={"deleteAll"}
                                      checked={deleteOption === 'deleteAll'}
                                      onChange={() => setDeleteOption('deleteAll')} />
                                      {selectedCategory && (
                                        <label htmlFor={"delete1"} style={{marginLeft: '5px'}}>현재 선택한 카테고리의 {selectedCategory.postCount}개의 글을 모두 삭제합니다.</label>
                                      )}<br></br>
                                      <input className={styles.set7} type={"radio"} id={"delete2"}  name={"delete"} value={"deleteRef"}
                                      checked={deleteOption === 'deleteRef'}
                                      onChange={() => setDeleteOption('deleteRef')} />
                                      {selectedCategory && (
                                        <label htmlFor={"delete2"} style={{marginLeft: '5px'}}>하위 카테고리를 포함한 {selectedCategory.totalCount}개의 글을 모두 삭제합니다.</label>
                                      )}<br></br>
                                      <p style={{paddingTop: '16px', paddingLeft: '10px', fontSize: '10px'}}>* 삭제 시 카테고리에 속한 모든 글이 삭제되며, 현재 예약 상태인 글도 모두 삭제됩니다.</p>
                                      <button type="submit" className={`${styles.subBtn }  btn btn-primary mb-3`}
                                      onClick={() => {
                                        if(deleteOption === 'deleteAll') {
                                          deleteCategory(categoryId);
                                        } else {
                                          deleteCategoryRef(categoryId);
                                        }
                                        }}>삭제</button>
                                    </div>
                                    <div className={'deletePopUpBackGround'} style={{backgroundColor: 'transparent' ,display: 'none'
                                      , width: '2000px', height: '1600px', zIndex: '500', opacity: '0.5'
                                      , position: 'absolute', left: '-400px', top: '-500px'}}
                                      onClick={() => {
                                        document.querySelector(".deletePopUp").style.display = "none"
                                        document.querySelector(".deletePopUpBackGround").style.display = "none"
                                      }
                                    }></div>
                                  </div>
                              </div>
                               <div  style={{maxHeight:'400px', overflowY: 'auto', width:'350px'}}>
                                   <div className="list-group">
                                        {data?.map((mapper) => {
                                            return (
                                                <button key={mapper.id} type="button" style={{fontWeight: mapper.id === 1 ? "bold" : "normal"}}
                                                className={`list-group-item list-group-item-action ${selectedCategory === mapper ? styles.selected : ''}`}
                                                onClick={() => handleCategoryClick(mapper)} >
                                                    {
                                                        mapper.depth === 0
                                                        ? mapper.subject + 
                                                        (mapper.type === 0 || mapper.countVisible === 0 ? '' : ' (' + mapper.totalCount + ')')
                                                        : ' ㄴ' + mapper.subject +
                                                        (mapper.type === 0 || mapper.countVisible === 0 ? '' : ' (' + mapper.postCount + ')')
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
                                   <input className={styles.set1} name={"categorySubject"} type={"text"} placeholder={categoryId === 1 ? "" : "카테고리명"}
                                   value = {categoryId === 1 ? '' : categorySubject} onChange={(e) => setCategorySubject(e.target.value)}
                                   disabled = {categoryId === 1 ? true : false}
                                   />
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>글 개수 표시</label>
                                   <input className={styles.set2} id={"cntMark"} name={"cntMark"} type={"checkbox"} placeholder={"게시판"}
                                   checked = {categoryCountVisible === 1 && categoryId != 1}
                                   onChange = {() => setCategoryCountVisible(categoryCountVisible === 1 ? 0 : 1)}
                                   disabled = {categoryId === 1 || categoryType === 0 ? true : false} />
                                   <label htmlFor={"cntMark"}>카테고리 옆에 글 개수 표시</label>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>공개설정</label>
                                   <input className={styles.set3} type={"radio"} id={"public"} name={"lock"} value={"public"}
                                   checked = {categoryVisible === 1 && categoryId != 1}
                                   onChange = {() => setCategoryVisible(categoryVisible === 1 ? 0 : 1)}
                                   disabled = {categoryId === 1 || categoryType === 0 ? true : false} />
                                   <label htmlFor={"public"}>공개</label>
                                   <input className={styles.set3} type={"radio"} id={"private"} name={"lock"} value={"private"}
                                   checked = {categoryVisible === 0 && categoryId != 1}
                                   onChange = {() => setCategoryVisible(categoryVisible === 0 ? 1 : 0)}
                                   disabled = {categoryId === 1 || categoryType === 0 ? true : false} />
                                   <label htmlFor={"private"}>비공개</label>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>글보기</label>
                                   <input className={styles.set4} type={"radio"} id={"viewBlog"} name={"postView"}  value={"viewBlog"}
                                   checked = {categoryType === 1 && categoryId !== 1}
                                   onChange = {() => setCategoryType(categoryType === 1 ? 2 : 1)}
                                   disabled = {categoryId === 1 || categoryType === 0 ? true : false} />
                                   <label htmlFor={"viewBlog"} ><Image className={styles.viewImg}  src='/image/viewBlog.png' alt='블로그' width={30} height={30} />블로그형</label>
                                   <input className={styles.set4} type={"radio"} id={"viewAlbum"}  name={"postView"} value={"viewAlbum"}
                                   checked = {categoryType === 2 && categoryId !== 1}
                                   onChange = {() => setCategoryType(categoryType === 2 ? 1 : 2)}
                                   disabled = {categoryId === 1 || categoryType === 0 ? true : false} />
                                   <label htmlFor={"viewAlbum"}><Image className={styles.viewImg}  src='/image/viewAlbum.png' alt='이미지' width={30} height={30} />앨범형</label>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>목록보기</label>
                                   <input className={styles.set5} type={"radio"} id={"listViewClose"} name={"listView"} value={"close"}
                                   checked = {categoryListVisible === 0 && categoryId != 1}
                                   onChange = {() => setCategoryListVisible(categoryListVisible === 0 ? 1 : 0)}
                                   disabled = {categoryId === 1 || categoryType === 0 ? true : false} />
                                   <label htmlFor={"listViewClose"}>목록 닫기</label>
                                   <input className={styles.set5} type={"radio"} id={"listViewOpen"}  name={"listView"} value={"open"}
                                   checked = {categoryListVisible === 1 && categoryId != 1}
                                   onChange = {() => setCategoryListVisible(categoryListVisible === 1 ? 0 : 1)}
                                   disabled = {categoryId === 1 || categoryType === 0 ? true : false} />
                                   <label htmlFor={"listViewOpen"}>목록 열기</label>
                               </div>
                               <div className={styles.setField}>
                                   <div className={styles.btnField}>
                                       <label className={styles.setLabel}>카테고리 정렬</label>
                                       <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                       onClick={() => {if (categoryId !== 1) { updateCategoryUp(categoryId); }}}
                                       disabled = {categoryId === 1 ? true : false} >위</button>
                                       <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                       onClick={() => {if (categoryId !== 1) { updateCategoryDown(categoryId); }}}
                                       disabled = {categoryId === 1 ? true : false} >아래</button>
                                       <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                       onClick={() => {if (categoryId !== 1) { updateCategoryTop(categoryId); }}}
                                       disabled = {categoryId === 1 ? true : false} >맨위</button>
                                       <button type="submit"  className={`${styles.btn } btn btn-primary mb-3 `}
                                       onClick={() => {if (categoryId !== 1) { updateCategoryBottom(categoryId); }}}
                                       disabled = {categoryId === 1 ? true : false} >맨아래</button>
                                   </div>
                               </div>
                               <div className={styles.setField}>
                                   <label className={styles.setLabel}>카테고리 접기</label>
                                   <input className={styles.set6} type={"radio"} id={"cateViewClose"} name={"cateView"} 
                                   value={"cateViewClose"} checked = {categoryFold === 1 && categoryId != 1}
                                   onChange = {() => setCategoryFold(categoryFold === 1 ? 0 : 1)}
                                   disabled = {categoryId === 1 || categoryType === 0 || categoryDepth === 1 ? true : false} />
                                   <label htmlFor={"cateViewClose"}>펼치기</label>
                                   <input className={styles.set6} type={"radio"} id={"cateViewOpen"}  name={"cateView"}
                                   value={"cateViewOpen"} checked = {categoryFold === 0 && categoryId != 1}
                                   onChange = {() => setCategoryFold(categoryFold === 0 ? 1 : 0)}
                                   disabled = {categoryId === 1 || categoryType === 0 || categoryDepth === 1 ? true : false} />
                                   <label htmlFor={"cateViewOpen"}>접기</label>
                               </div>
                               <button type="submit" className={`${styles.subBtn }  btn btn-primary mb-3`}
                               onClick={() => updateCategory(
                                categoryId,
                                categorySubject,
                                categoryType,
                                categoryVisible,
                                categoryCountVisible)} disabled = {categoryId === 1 ? true : false} >레이아웃 적용</button>
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