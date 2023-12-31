import axios from "axios";
import Head from "next/head";
import { useEffect, useState } from "react";
import IndexHeader from "../../layout/home/header";
import IndexSidebar from "../../layout/home/sidebar";
import TrendPost from "../../components/common/trend";
import NoticePost from "../../components/common/notice";
import PostList from "../../components/common/postList";
import PostListImageType from "../../components/common/postListImageType"
import PostListBlogType from "../../components/common/postListBlogType"
import Auth from "../account/auth";

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
      <IndexSidebar />
      <TrendPost />
      <NoticePost />
      <PostList categoryId={1} />
      <PostListImageType categoryId={1} />
      <PostListBlogType categoryId={1} />
    </>
  );
};

export default IndexPage;
