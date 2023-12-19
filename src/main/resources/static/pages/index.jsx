import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import IndexHeader from "../layout/home/header";
import IndexSidebar from "../layout/home/sidebar";
import TrendPost from "../components/common/trend";
import NoticePost from "../components/common/notice";
import PostList from "../components/common/postList";
import PostListImageType from "../components/common/postListImageType"
import PostListBlogType from "../components/common/postListBlogType"
import Auth from "./account/auth";
import styles from "/styles/index.module.css"
import Profile from "../components/common/profile";

const IndexPage = () => {
  const [info, setInfo] = useState([]);
  const [requestTime, setRequestTime] = useState(new Date())

  /**
   * Get CMS Information from API server.
   *
   * @author Kiseok Kang (@jUqItEr)
   * @since 2023. 12. 04.
   * @version 1.0.0
   */
  const getInfo = async () => {
    axios({
      method: "get",
      url: "/api/info",
    }).then((res) => {
      setInfo(res.data !== undefined ? res.data.data : null);
    });
  };

  useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <Head>
        <title>{info.title}</title>
      </Head>
      <Auth/>
      <div className={styles.wrap}>
        <div  style={{position:'fixed',width:'100vw',  backgroundColor: 'var(--bs-body-bg)', zIndex:'1000' }}>
          <IndexHeader info={info} requestTime={requestTime} setRequestTime={setRequestTime} />
        </div>

        <div style={{zIndex:'1000'}}>
          <IndexSidebar info={info}/>
        </div>

        <div style={{boxSizing: 'border-box'}} className={styles.content}>
            <div style={{paddingTop:'60px'}}><TrendPost/></div>
            <NoticePost />
            <PostList categoryId={1} />
            <PostListImageType categoryId={1} />
            {/* <PostListBlogType categoryId={1} /> */}
        </div>
      </div>
    </>
  );
};

export default IndexPage;
