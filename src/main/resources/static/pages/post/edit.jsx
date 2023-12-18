import { useRouter } from 'next/router';

import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $, { post } from 'jquery'
import {useEffect, useState} from "react"
import { color } from "framer-motion"
import { faDisplay } from "@fortawesome/free-solid-svg-icons"
import IndexHeader from "./header"
import PostList from "../../components/common/list"
import styles from '/styles/sidebar.module.css'
/* edd */

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
    const [sidebarVisible, setSidebarVisible] = useState(true)
    const [totalPostCount, setTotalPostCount] = useState(0);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

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

        /*alert(
            "카테고리 id : " + mapper.id + "\n"
            + "카테고리 이름 : " + mapper.subject + "\n"
            + "카테고리 게시글 수 공개 : " + mapper.countVisible + "\n"
            + "카테고리 공개/비공개 : " + mapper.visible + "\n"
            + "카테고리 블로그형/이미지형 : " + mapper.type + "\n"
            + "카테고리 게시글 보여지는지 : " + mapper.listVisible + "\n"
            + "카테고리 접었는지 : " + mapper.fold + "\n"
            + "카테고리 자식인지 부모인지 : " + mapper.depth + "\n"
        );*/

        if(mapper.id === 1) {
            router.push(`/category`);
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
            url: "/api/admin/category/list",
        }).then((res) => {
            setData(res.data);

            const sum = res.data.reduce((accumulator, currentMapper) => {
              return accumulator + currentMapper.postCount;
            }, 0);

            setTotalPostCount(sum);

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
            <div className={`${styles.side} ${sidebarVisible ? '' : styles.hidden}`}>
                <div>
                    {/* content */}
                    <div>
                        <div className="list-group">
                            {data?.map((mapper) => {
                                return (
                                    <button
                                        key={mapper.id}
                                        type="button"
                                        style={{fontWeight: mapper.id === 1 ? "bold" : "normal"
                                        , backgroundColor: mapper.id === categoryId ? "var(--bs-gray-100)" : "var(--bs-gray-100)"}}
                                        className={`list-group-item list-group-item-action`}
                                        onClick={() => categoryClick(mapper)} >
                                        {
                                            mapper.depth === 0
                                            ? mapper.subject +
                                            (mapper.type === 0 || mapper.countVisible === 0 ? ''
                                                : (mapper.id === 1 ? ' (' + totalPostCount + ')' : ' (' + mapper.totalCount + ')'))
                                            : ' ㄴ' + mapper.subject +
                                            (mapper.type === 0 || mapper.countVisible === 0 ? '' : ' (' + mapper.postCount + ')')
                                        }
                                    </button>
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