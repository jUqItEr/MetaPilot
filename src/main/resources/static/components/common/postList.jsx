import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "/styles/common/postList.module.css"

const PostList = () => {
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

    const [postTotalCount, setPostTotalCount] = useState(0)
    const [currentPageGroup, setCurrentPageGroup] = useState(1)
    const [firstPageInGroup, setFirstPageInGroup] = useState(1)
    const [lastPageInGroup, setLastPageInGroup] = useState(5)
    const [maxPage, setMaxPage] = useState(0)

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
        axios({
          method: "get",
          params: {
            limit: paging.limit,
            page: paging.page,
            count: paging.count,
          },
          url: "/api/post/page/view",
        }).then((res) => {
          const postCount = res.data[0].postCount
          setPostTotalCount(postCount)
          setPostList(res.data)
          
          const tempMaxPage = Math.ceil(postCount / paging.count) //전체 게시글 갯수

          // 전체 페이지 갯수
          setMaxPage(tempMaxPage) // 8페이지
          
          const nextPageGroup = Math.ceil(paging.page / paging.count)
          setCurrentPageGroup(nextPageGroup)
          const newFirstPageInGroup = (nextPageGroup - 1) * paging.count + 1
          const newLastPageInGroup = Math.min(nextPageGroup * paging.count, tempMaxPage)
          setFirstPageInGroup(newFirstPageInGroup)
          setLastPageInGroup(newLastPageInGroup)

          console.error('paging content : ', paging)
          console.error('f: ', newFirstPageInGroup)
          console.error('l: ', newLastPageInGroup)
          console.error('next group: ', nextPageGroup)
          console.error('max page: ', maxPage)
        })
      }, [paging.page, paging.count])

    // 목록 표시/숨기기 함수
    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible)
    }

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

    console.log(maxPage)
    console.log("현재 페이지 : " + paging.page)

    return(
        <>
        
        
        <div className={styles.postListWrap}>
            <hr/>
            <div className={styles.postListContainer}>
                <div className={styles.postListHeader}>
                    <div className={styles.postListGroup}>
                        <span className={styles.postListAll}>전체보기</span>
                        <span className={styles.postListCount}>{postTotalCount}</span>
                    </div>
                    <div>
                        <span className={styles.postListToggle} onClick={toggleListVisibility}>
                            {isListVisible ? "목록닫기" : "목록열기"}
                        </span>
                    </div>
                </div>
                {isListVisible && (
                <div className={styles.postListBlock}>
                    <div className={styles.postListSubHeader}>
                        <div>
                            <span className={styles.postListSubject}>글 제목</span>
                        </div>
                        <div>
                            <span className={styles.postListSubject}>작성일</span>
                        </div>
                    </div>
                    {postList.slice(start, end).map((postList, index) => (
                        <div className={styles.postListTitle} key={index}>
                            <Link href={`/post/${postList.postId}`}>
                                <a>
                                    <div className={styles.postList}>
                                        {isCheckboxVisible && (
                                            <input type="checkbox" defaultValue={"0"}/>
                                        )}
                                    <span className={styles.postListTitles}>{postList.subject}</span>
                                    <span className={styles.postListCommentCount}>({postList.commentCount})</span>
                            </div>
                                </a>
                            </Link>
                        <div>
                            <span>{postList.createdDate}</span>
                        </div>
                        </div>
                    ))}
                    
                    <div className={styles.postListSelectGroup}>
                        <div>
                            <button type="button" className="btn btn-secondary"
                                onClick={toggleCheckboxVisibility}>글관리</button>
                        </div>
                        <div class="form-group">
                            <select 
                                class="form-control mb-3"
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
                            <li>
                                <button
                                type="button"
                                className={styles.pageLink}
                                onClick={goToPrevGroup}
                                disabled={paging.page === 1}
                                >
                                이전
                                </button>
                            </li>
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
                            <li>
                                <button
                                type="button"
                                className={styles.pageLink}
                                onClick={goToNextGroup}
                                disabled={paging.page === maxPage}
                                >
                                다음
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                )}
            </div>
        </div>


        </>
    )
}

export default PostList