import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "/styles/common/postList.module.css"
import $ from 'jquery'

const PostList = ({ categoryId }) => {
    const [user, setUser] = useState([])
    const [postList, setPostList] = useState([])
    const [paging, setPaging] = useState({
        limit: 5, // 한 페이지에 보이는 게시글수
        page: 1, // 현재 페이지 번호
        count: 5, // 페이지당 게시글 수
    })
    const [selectedPost, setSelectedPost] = useState([]); // 삭제할 선택된 post
    const [isListVisible, setIsListVisible] = useState(true)
    const [isCheckboxVisible, setIsCheckboxVisible] = useState(false)
    const [requestTime, setRequestTime] = useState(new Date())
    const start = (paging.page - 1) * paging.count
    const end = start + paging.count

    const [postTotalCount, setPostTotalCount] = useState(0)
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
            setPostTotalCount(postCount)

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
            setPostList(res.data)
            //console.log("postList 속 page : ", postList)
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
            setCategorySubject(res.data.subject)
            setCategoryType(res.data.type)
        });
    }, [paging.page, paging.count, requestTime, user?.id, maxPage, categoryId,])

    // 게시글 선택 체크박스 함수
    const handleCheckbox = (e, postId) => {
        const isChecked = e.target.checked

        setSelectedPost((prev) => (
            isChecked ? [...prev, postId] : prev.filter((selectedPostId) => selectedPostId !== postId)
            // true면 선택한 postId, false면 초기화된 배열 반환
        ));
    }

    // 게시글 삭제 함수
    const handleDelete = () => {
        if (selectedPost.length > 0) {
            const postIds = selectedPost.map(String)

            if (confirm('선택한 포스트를 삭제하시겠습니까?')) {
                axios({
                    headers: {
                        'Authorization': localStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                    method: "post",
                    data: {
                        postIds: postIds,
                    },
                    url: "/api/post/delete",
                }).then((res) => {
                    alert('삭제되었습니다');
                    setSelectedPost([]);
                    setRequestTime(new Date())
                    $('input[type=checkbox]').prop('checked', false) // 게시글 삭제 후 체크박스 초기화
                }).catch((error) => {
                    console.error('Post Delete Error: ', error);
                    alert('삭제에 실패했습니다');
                });
            }
        }
    }

    // 목록 표시/숨기기 함수
    const toggleListVisibility = () => {
        setIsListVisible(!isListVisible)
    }

    // 글관리 눌릴시 삭제 표시/숨기기 함수
    const toggleCheckboxVisibility = () => {
        setIsCheckboxVisible(!isCheckboxVisible)
        $('input[type=checkbox]').prop('checked', false)
    }

    // 권한없을시 글관리 버튼 표시 여부 함수
    const showManageButton = () => {
        return user?.role?.roleEntity?.id !== 1
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
            $('input[type=checkbox]').prop('checked', false)
        }
    }

    return (
        <>


            <div className={styles.postListWrap}>
                <hr />
                <div className={styles.postListContainer}>
                    <div className={styles.postListHeader}>
                        <div className={styles.postListGroup}>
                            <span className={styles.postListAll}>{categorySubject}</span>
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
                                    <div className={styles.postCheckbox}>
                                        {isCheckboxVisible && (
                                            <input
                                                type="checkbox"
                                                defaultValue={'postList.postId'}
                                                onChange={(e) => handleCheckbox(e, postList.postId)}
                                            />
                                        )}
                                        &nbsp;&nbsp;&nbsp;
                                        <Link href={`/post/${postList.postId}`}>
                                            <a>
                                                <div className={styles.postList}>
                                                    <span className={styles.postListTitles}>{postList.subject}</span>
                                                    <span className={styles.postListCommentCount}>({postList.commentCount}) {postList.type === 1 ? " [ 비공개 ]" : ""}</span>
                                                </div>
                                            </a>
                                        </Link>
                                    </div>
                                    <div>
                                        <span>{postList.createdDate}</span>
                                    </div>
                                </div>
                            ))}

                            <div className={styles.postListSelectGroup}>
                                <div>
                                    {showManageButton() && (
                                        <button type="button" className="btn btn-secondary"
                                            onClick={toggleCheckboxVisibility}>글관리
                                        </button>
                                    )}
                                    &nbsp;&nbsp;&nbsp;
                                    {isCheckboxVisible && (
                                        <button
                                            type="button"
                                            className="btn btn-danger"
                                            onClick={handleDelete}
                                            disabled={selectedPost.length === 0}
                                        >삭제
                                        </button>
                                    )}
                                </div>
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

                            {/* 검색창 */}
                            {/* 
                    <div>
                        <select name="" id="">
                            <option value="">전체보기</option>
                            <option value="">게시글 제목</option>
                            <option value="">게시글 내용</option>
                        </select>
                        <input type="text" />
                        <button className={`${styles.searchButton} btn btn-primary`}>검색</button>
                    </div> 
                    */}


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

export default PostList