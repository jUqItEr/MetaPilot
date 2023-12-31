import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import $ from 'jquery'
import styles from '../../../styles/admin/basic/info.module.css'
import {useEffect,useState} from "react"
import AdminHeader from "../../../layout/admin/header"
import AdminSidebar from "../../../layout/admin/sidebar"
/**
 * Rendering the blog info page
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 07.
 * @returns
 */

function AdminInfoPage() {
    const [isMobile, setIsMobile] = useState(false)
    const [info, setInfo] = useState([])
    const [title, setTitle] = useState("");  // Add state for title
    const [profile, setProfile] = useState("");  // Add state for profileImage
    const [googleAnalytics, setGoogleAnalytics] = useState("");  // Add state for googleAnalytics
    const [profileImage, setProfileImage] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [imgSrc,setImgSrc] = useState("");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image',file);

        if (file && (file.type === "image/jpg" || file.type === "image/png")) {


            alert("등록버튼을 눌러 이미지 저장을 계속해주세요.");

        } else {
            alert("잘못된 파일 형식입니다. jpg, png 만 게시 가능합니다.");
            event.target.value = "";
        }
    };

    const imgSubmit = () => {
        console.log("업로드된 이미지 URL:", imageURL);
        // setImgSrc(imageURL);
    };

    // update db
    const updateInfo = () => {
        axios({
            params: {
                id: 1,
                title: title,
                profile: profile,
                profileImage : imageURL,
                googleAnalytics: googleAnalytics
            },
            method: 'post',
            url: '/api/admin/updateBlogInfo'
        })
        .then((res) => {
            setInfo(res.config.data);
            console.log(res);
            alert("블로그 정보를 성공적으로 저장하였습니다.");
        })
        .catch((err) => {
            console.error('Request error:', err);
        })
    };
    // 반응형
    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/admin/getBlogInfo'
        })
        .then((res) => {
            setInfo(res.data)
            setTitle(res.data.title)
            setProfile(res.data.profile)
            // setProfileImage(res.data.)
            setGoogleAnalytics(res.data.googleAnalytics)
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        const handleResize = () => {
            const mobile = window.innerWidth <= 768;
            setIsMobile(mobile);

            const contentElement = document.querySelector(`.${styles.content}`);
            const setFieldElements = document.querySelectorAll(`.${styles.setField}`);
            const labelElements = document.querySelectorAll(`.${styles.label}`);
            const pImgFElements = document.querySelectorAll(`.${styles.profileImgField}`);
            const googleTitleElement = document.querySelector(`.${styles.googleTitle}`);

            if (mobile) {
                contentElement.style.padding='5px';
                setFieldElements.forEach((element) => {
                    element.style.width = '350px';

                });
                contentElement.style.width = '100%';
                labelElements.forEach((label) => {
                    label.style.fontSize = '15px';
                });
                if (googleTitleElement) {
                    googleTitleElement.textContent = "구글 애널리틱스 정보";
                }
            }
            if (!mobile) {
                setFieldElements.forEach((element) => {
                    element.style.width = '900px';
                    element.style.display = 'flex';
                    element.style.alignItems = 'center';
                    element.style.justifyContent = 'flex-start';
                });
                pImgFElements.forEach((element) => {
                    element.style.display = 'flex';
                    element.style.alignItems = 'center';
                });


            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

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
                {/* <div className={`${styles.flexrap} d-flex flex-nowrap`}> */}
                    {/*sidebar*/}
                    <AdminSidebar/>
                    {/* content */}
                    <div className={styles.content} >
                        {/* 페이지 제목*/}
                        <div className={styles.pageTitle}><span className={styles.pageTitleFont}>블로그 정보</span></div>
                        {/*페이지 내용*/}
                        <div className={styles.pageContent}>
                            {/*블로그 명*/}
                            <div className = {`${styles.setField} border-bottom`}>
                                <label className={`${styles.label} form-label fw-bold`} htmlFor={"exampleFormControlInput1"} style={{width:'calc(12% + 30px)'}} >블로그 명</label>
                                <input type="text" className={`${styles.formfield} form-control`}
                                       id={"title"} defaultValue={info?.title} style={{width:'calc(25% + 100px)'}}
                                       name={"title"} onChange={(e) => setTitle(e.target.value)}/>
                                <label className="text-body-tertiary ps-3" htmlFor={"exampleFormControlInput1"}>한글, 영문, 숫자 혼용가능(한글 기준 25자 이내)</label>
                            </div>
                            {/* 소개 글 */}
                            <div className = {`${styles.setField} border-bottom`}>
                                <label className={`${styles.label} form-label fw-bold`} htmlFor={"float1ingTextarea1"} style={{width:'calc(12% + 30px)'}}>소개글</label>
                                <textarea className="form-control" defaultValue={info?.profile}
                                          id={"profile"} style={{width:'calc( 25% + 100px)',height: '120px'}}
                                          name={"profile"} onChange={(e) => setProfile(e.target.value)}/>
                                <label className="text-body-tertiary ps-3" htmlFor={"exampleFormControlInput1"}>한글 기준 100자 이내만 표시됩니다.</label>
                            </div>
                            {/* 프로필 이미지*/}
                            <div className = {`${styles.setField} border-bottom `}>
                                <label className={`${styles.label} form-label fw-bold`} htmlFor={"exampleFormControlInput3"} style={{width:'calc(12% + 30px)'}}>프로필<br/>이미지</label>
                                <div style={{width:'calc(45% + 100px)'}}>
                                    <div className="profileImgField" style={{width:'100%'}}>
                                        {/* 예전 이미지*/}
                                        {/* db에 이미지 한번도 저장된적 없다면 profile.png src={"/image/profile.png"}
                                            db에 저장된 이미지가 있다면 adminProfile.png src={info?.profileImage}
                                            등록버튼을 클릭했고, 선택된 파일이 있다면 src={imageURL}*/}
                                        <img src = {info?.profileImage || "/image/metapilot.svg"} className="img-thumbnail" alt="..." style={{width:'160px' , height : '160px'}}/>
                                        <label className="text-body-tertiary ps-3" style={{width:'100%'}} htmlFor={"exampleFormControlInput2"} name={"profileImage"}> 프로필 이미지는 가로 160px 섬네일로 생성됩니다.</label>
                                    </div>
                                    <div className="input-group col " style={{width:'100%'}}>
                                        {/* 변경할 이미지 파일 선택 */}
                                        <input type="file" className="form-control " id="fileInput"
                                                aria-label="Upload" name={"imgFile"}  onChange={handleFileChange} />
                                        <button  type="button" className={`btn btn-primary ps-2 pe-2`} onClick={imgSubmit}>등록</button>
                                    </div>
                                </div>
                            </div>
                            {/* 구글 애널리틱스 정보*/}
                            <div className = {`${styles.setField} border-bottom`}>
                                <label className={`${styles.label} ${styles.googleTitle} form-label fw-bold`} htmlFor={"float1ingTextarea1"} style={{width:'calc(9% + 70px)'}}>구글<br/>애널리틱스<br/>정보</label>
                                <textarea className="form-control" id={"googleAnalytics"}
                                          style={{width:'calc(25% + 100px)',height: '120px'}} name={"googleAnalytics"} defaultValue={info?.googleAnalytics}
                                          onChange={(e) => setGoogleAnalytics(e.target.value)} />

                            </div>
                            {/* 저장 버튼*/}
                            <div className = {styles.setField} >
                                <button type="button" className="btn btn-primary mt-2 ps-5 pe-5 pt-2 pb-2"
                                        style={{margin:'auto'}} onClick={ updateInfo }>저장</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AdminInfoPage;