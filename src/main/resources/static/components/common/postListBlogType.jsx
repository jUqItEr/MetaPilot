import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image";
import styles from "/styles/common/postList.module.css"

const PostListBlogType = ({ categoryId }) => {
    const [user, setUser] = useState([])
    const [postList, setPostList] = useState([])
    const [paging, setPaging] = useState({
        limit: 5, // 한 페이지에 보이는 게시글수
        page: 1, // 현재 페이지 번호
        count: 5, // 페이지당 게시글 수
    })
    const [isListVisible, setIsListVisible] = useState(true)
    const [isCheckboxVisible, setIsCheckboxVisible] = useState(false)
    const start = (paging.page -1) * paging.count
    const end = start + paging.count

    const [currentPageGroup, setCurrentPageGroup] = useState(1)
    const [firstPageInGroup, setFirstPageInGroup] = useState(1)
    const [lastPageInGroup, setLastPageInGroup] = useState(5)
    const [maxPage, setMaxPage] = useState(0)
    
    const [categorySubject, setCategorySubject] = useState("")
    const [categoryType, setCategoryType] = useState(1)

    const handlePaging = (e) => {
        const pageSize = parseInt(e.target.value)
        setPaging((prev) => ({
            ...prev,
            limit: pageSize,
            count: pageSize,
            page: 1,
        }))
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
        
        axios({
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            method: "get",
            params: {
                categoryId: categoryId, // 카테고리 id 받아올수있게 수정
                userId: user?.id,
            },
            url: categoryId === 1 ? "/api/post/countAll" : "/api/post/count",
        }).then((res) => {
            const postCount = res.data // 조건에 만족하는 전체 게시글수

            const tempMaxPage = Math.ceil(postCount / paging.count); // 한 페이지 보여질 게시글수 계산
            setMaxPage(tempMaxPage);
        });

        axios({
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            method: "get",
            params: {
                limit: paging.limit,
                page: paging.page,
                count: paging.count,
                userId: user?.id,
                categoryId: categoryId, // 카테고리 id 받아올수있게 수정
            },
            url: categoryId === 1 ? "/api/post/pageAll" : "/api/post/page",
        }).then((res) => {
            console.log("blogType 속 page : ", res.data)
          setPostList(res.data)
          const tempMaxPage = maxPage
          
          const nextPageGroup = Math.ceil(paging.page / paging.count)
          setCurrentPageGroup(nextPageGroup)
          const newFirstPageInGroup = (nextPageGroup - 1) * paging.count + 1
          const newLastPageInGroup = Math.min(nextPageGroup * paging.count, tempMaxPage)
          setFirstPageInGroup(newFirstPageInGroup)
          setLastPageInGroup(newLastPageInGroup)
        });

        axios({
            method: "get",
            params: {
                id: categoryId,
            },
            url: "/api/category/info",
        }).then((res) => {
            //console.log("postList3의 res.data : ", res.data.subject)
            setCategorySubject(res.data.subject)
            setCategoryType(res.data.type)
        });
      }, [paging.page, paging.count, user?.id, maxPage, categoryId])

    // 목록 표시/숨기기 함수
    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible)
    }

    // 글관리 눌릴시 삭제 표시/숨기기 함수
    const toggleCheckboxVisibility = () => {
        setIsCheckboxVisible(!isCheckboxVisible)
    }

    // 이전 페이지 그룹으로 이동하는 함수
    const goToPrevGroup = () => {
        alert("이전 버튼 눌러짐")
        if (currentPageGroup > 1) {
        const prevPageGroup = currentPageGroup - 1;
        const newFirstPageInGroup = (prevPageGroup - 1) * paging.count + 1;
        const newLastPageInGroup = Math.min(
            prevPageGroup * paging.count,
            maxPage
        );
    
        setCurrentPageGroup(prevPageGroup);
        setFirstPageInGroup(newFirstPageInGroup);
        setLastPageInGroup(newLastPageInGroup);
        setPaging((prevPaging) => ({
            ...prevPaging,
            page: newFirstPageInGroup, // 페이지 그룹의 첫 번째 페이지로 이동
        }));
        }
    };
  

    // 다음 페이지 그룹으로 이동하는 함수
    const goToNextGroup = () => {
        alert("다음 버튼 눌러짐")
        if (currentPageGroup < Math.ceil(maxPage / paging.count)) {
        const nextPageGroup = currentPageGroup + 1;
        const newFirstPageInGroup = (nextPageGroup - 1) * paging.count + 1;
        const newLastPageInGroup = Math.min(
            nextPageGroup * paging.count,
            maxPage
        );
    
        setCurrentPageGroup(nextPageGroup);
        setFirstPageInGroup(newFirstPageInGroup);
        setLastPageInGroup(newLastPageInGroup);
        setPaging((prevPaging) => ({
            ...prevPaging,
            page: newFirstPageInGroup, // 페이지 그룹의 첫 번째 페이지로 이동
        }));
        }
    };
  
    
    // 페이지 이동 함수
    const goToPage = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= maxPage) {
            setPaging({
                ...paging,
                page: pageNumber,
            })
        }
    }

    return(
        <>
        
        
        <div className={styles.postListWrap} style={categoryType === 1 ? {display: 'block'} : {display: 'none'}}>
            <hr/>
            <div className={styles.postListContainer}>
                {isListVisible && (
                <div className={styles.postListBlock}>
                    {postList.slice(start, end).map((postList, index) => (
                        <div className={styles.postListTitle} key={index}>
                            <Link href={`/post/${postList.postId}`}>
                                <a>
                                    <div className={styles.postList} style={{display: 'flex'}}>
                                        {isCheckboxVisible && (
                                            <input type="checkbox" defaultValue={"0"}/>
                                        )}
                                        <Image
                                            className={styles.popularImage}
                                            //src={"/image/emptyImage.jpg"}
                                            src={postList.thumbnail || "/image/emptyImage.jpg"}
                                            alt={"image"}
                                            width={150}
                                            height={150}
                                        />
                                        <span className={styles.postListTitles} style={{marginLeft: '26px'}}>
                                            <div style={{fontSize: '26px'}}>
                                                {postList.subject}
                                            </div>
                                            <div style={{fontSize: '14px', marginTop: '10px'}}>
                                                {postList.content}
                                            </div>
                                            <div style={{fontSize: '16px', marginTop: '50px'}}>
                                                <span style={{marginRight: '10px'}}>{postList.createdDate}</span>
                                                <span style={{marginRight: '10px'}}>댓글 : {postList.commentCount} </span>
                                                <span>좋아요 : {postList.likeCount} </span>
                                            </div>
                                        </span>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    ))}
                    
                    <div className={styles.postListSelectGroup}>
                        <div className="form-group">
                            <select 
                                className="form-control mb-3"
                                value={paging.limit}
                                onChange={handlePaging}
                            >
                                <option value="5">5줄 보기</option>
                                <option value="10">10줄 보기</option>
                                <option value="15">15줄 보기</option>
                                <option value="20">20줄 보기</option>
                                <option value="30">30줄 보기</option>
                            </select>
                        </div>
                    </div>
                    
                    <div className={styles.pageController}>
                        <ul className={styles.pageNumbers}>
                            {/* 이전 버튼 비활성화 */}
                            {currentPageGroup > 1 && (
                                <li>
                                    <button
                                        type="button"
                                        className={styles.pageLink}
                                        onClick={goToPrevGroup}
                                    >
                                    이전
                                    </button>
                                </li>
                            )}
                            {Array.from({ length: lastPageInGroup - firstPageInGroup + 1 }, (_, i) => {
                                const pageNumber = firstPageInGroup + i;
                                const isCurrentPage = pageNumber === paging.page;
                                const buttonStyle = isCurrentPage ? styles.currentPage : styles.pageLink;

                                return (
                                <li key={i}>
                                    <button
                                    type="button"
                                    className={buttonStyle}
                                    onClick={() => goToPage(pageNumber)}
                                    >
                                    {pageNumber}
                                    </button>
                                </li>
                                );
                            })}
                            {/* 다음 버튼 비활성화 */}
                            {currentPageGroup < Math.ceil(maxPage / paging.count) && (
                                <li>
                                    <button
                                        type="button"
                                        className={styles.pageLink}
                                        onClick={goToNextGroup}
                                    >
                                    다음
                                    </button>
                                </li>
                            )}
                        </ul>
                        
                    </div>
                </div>
                )}
            </div>
        </div>


        </>
    )
}

export default PostListBlogType