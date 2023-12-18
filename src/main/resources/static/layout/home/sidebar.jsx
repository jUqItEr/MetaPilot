import { useRouter } from 'next/router';

import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import {useEffect, useState} from "react"
import { color } from "framer-motion"
import { faDisplay } from "@fortawesome/free-solid-svg-icons"
import IndexHeader from "./header"
import PostList from "../../components/common/list"

/**
 * Rendering the category page.
 *
 * @author Ha Seong Kim
 * @since 2023. 12. 17.
 * @returns
 */

const SideBarPage = () => {
    const router = useRouter();
    const [data, setData] = useState([]);
    const [ category, setCategory ] = useState([])
    const [ info, setInfo ] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [categoryId, setCategoryId] = useState(1)
    const [categorySubject, setCategorySubject] = useState("")
    const [categoryCountVisible, setCategoryCountVisible] = useState("")
    const [categoryVisible, setCategoryVisible] = useState("")
    const [categoryType, setCategoryType] = useState("")
    const [categoryListVisible, setCategoryListVisible] = useState("")
    const [categoryFold, setCategoryFold] = useState("")
    const [categoryDepth, setCategoryDepth] = useState("")
    const [requestTime, setRequestTime] = useState(new Date())

    const [foldedCategories, setFoldedCategories] = useState([]);
    const [isFolded, setIsFolded] = useState(false);

    const foldClick = (event, mapper) => {
        event.stopPropagation();
        setIsFolded(!isFolded);

        $(`div[data-ref='${mapper.id}']`).toggle()

        const isCategoryFolded = foldedCategories.includes(mapper.id);

        /*setFoldedCategories((prevCategories) => {
            if (isCategoryFolded) {
                return prevCategories.filter((categoryId) => categoryId !== mapper.id);
            } else {
                return [...prevCategories, mapper.id];
            }
        });*/
    }

    const categoryClick = (mapper) => {
        setSelectedCategory(mapper);
        setCategoryId(mapper.id);
        setCategorySubject(mapper.subject);
        
        setCategoryCountVisible(mapper.countVisible);
        setCategoryVisible(mapper.visible);
        setCategoryType(mapper.type);
        setCategoryListVisible(mapper.listVisible);
        setCategoryFold(mapper.fold);
        setCategoryDepth(mapper.depth);

        if(mapper.id === 1) {
            router.push(`/`);
        } else {
            router.push(`/category/${mapper.id}`);
        }
    };

      useEffect(() => {
          const getCategory = () => {
            axios({
                method: 'get',
                url: '/api/category/list'
            })
            .then((res) => {
                console.log(res.data)
                setCategory(res.data)
            })
          }

          const getInfo = () => {
            axios({
                method: 'get',
                url: '/api/info'
            })
            .then((res) => {
                setInfo(res.data.data)
            })
          }

          getCategory()
          getInfo()

          axios({
            method: "get",
            url: "/api/category/count",
        }).then((res) => {
            setData(res.data);
            console.log("edd", res.data);
        });
      }, [requestTime]);

    return (
        <>
            <Head>
                <title>카테고리 - {`${info.title}`}</title>
                <meta property='og:title' content='카테고리 리스트' key='title'/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            </Head>
            <div>
                <div /*className="d-flex flex-nowrap"*/style={{ width: '200px'}}>
                    {/* content */}
                    <div  style={{maxHeight:'400px', overflowY: 'auto', width:'260px'}}>
                        <div className="list-group">
                            {data?.map((mapper) => {
                                return (
                                    <div key={mapper.id} type="button" data-ref={mapper.refId} style={{fontWeight: mapper.id === 1 ? "bold" : "normal"
                                    , backgroundColor: mapper.id === categoryId ? "#ECECEC" : "white"}}
                                    /* ↑↑↑↑↑ category의 visible 컬럼이 0(비공개 카테고리)이면 표시하지 않습니다 */
                                    className={`list-group-item list-group-item-action`}
                                    onClick={() => categoryClick(mapper)} >
                                        <div style={{width: '200px'/*부모 width랑 같게 바꾸시오 */, display: 'flex', justifyContent: 'space-between'}}>
                                            <div
                                                className={`up${mapper.id}`}
                                                style={{
                                                    display:
                                                        foldedCategories.includes(mapper.id) ? 'none' : 'block'
                                                }}
                                            >
                                                {
                                                    (mapper.depth === 0
                                                    ? mapper.subject + 
                                                    (mapper.type === 0 || mapper.countVisible === 0 ? ''
                                                        : (mapper.id === 1 ? ' (' + mapper.allCount + ')' : ' (' + mapper.refCount + ')'))
                                                    : '')
                                                }
                                                <div
                                                    className={`down${mapper.refId}`}
                                                    style={{
                                                        display: foldedCategories.includes(mapper.id) ? 'none' : 'block'
                                                    }}
                                                >
                                                    {
                                                        (mapper.depth === 0
                                                        ? ''
                                                        : ' ㄴ' + mapper.subject +
                                                        (mapper.type === 0 || mapper.countVisible === 0 ? '' : ' (' + mapper.count + ')'))
                                                    }
                                                </div>
                                            </div>
                                            <div className='fold' onClick={(event) => foldClick(event, mapper)}>
                                                {
                                                    (mapper.id != 1 && mapper.depth === 0) ? '▼' : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default SideBarPage