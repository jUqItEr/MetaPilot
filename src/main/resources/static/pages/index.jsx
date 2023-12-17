import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import IndexHeader from "../layout/home/header";
import IndexSidebar from "../layout/home/sidebar";
import TrendPost from "../components/common/trend";
import NoticePost from "../components/common/notice";
import PostList from "../components/common/postList";
import Auth from "./account/auth";
import styles from '/styles/index.module.css'

const IndexPage = () => {
  const [info, setInfo] = useState([]);

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
      <IndexHeader info={info} />
      {/* 여기에 flex */}
      <div className={styles.mainWrap}>
        
        <div className="container">
          <TrendPost />
          <NoticePost />
          <PostList />
        </div>
        <IndexSidebar />
      </div>
      
    </>
  );
};

export default IndexPage;
