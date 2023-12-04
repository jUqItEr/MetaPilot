import Head from "next/head"
import Image from 'next/image'
import axios from 'axios'
import iStyles from '../styles/index.module.css'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons'
import profileImage from '../image/profileEXImg.png';


/**
 * Rendering the login page.
 *
 * @author Suhyeon Kim (@gommzzy)
 * @since 2023. 12. 01.
 * @returns
 */
export default function IndexPage() {
    return (
        <>
            <Head>
                <title>블로그 홈</title>
                <meta property='og:title' content='블로그 홈' key='title' />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div id="wrap">
                {/*header*/}
                <div className="container" style={{ backgroundColor: 'gainsboro', marginBottom: '20px' }}>
                    <div className="border-bottom lh-1 py-3">
                        <div className="align-items-center">
                            <div className="text-center"><a className="blog-header-logo text-body-emphasis text-decoration-none" href="#">SPRING</a></div>
                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="row g-5">
                         {/*content */}
                        <div className="col-md-9">
                            {/*content1(title)*/}
                            <div className={`${iStyles.contentmain} ${iStyles.content1}`}>
                                {/*카테고리*/}
                                <div className={`${iStyles.titleSection} ${iStyles.section1}`}>
                                    <a href="#" className={ iStyles.category }>나들이</a>
                                </div>
                                {/*블로그 타이틀*/}
                                <div className={`${iStyles.titleSection} ${iStyles.section2}`}>
                                    대전 신세계 백화점에서 레고로 놀다오기
                                </div>
                                {/*프로필、 작성자、 작성시각、 url, 이웃추가, 햄버거버튼 (공유, 신고?)*/}
                                <div className={`${iStyles.titleSection} ${iStyles.section3}`}>
                                    <div id={iStyles.thumbnailAuthor}><img  src={profileImage}  alt="프로필 이미지" id ={iStyles.profileImg}></img></div>
                                    <div id={iStyles.nameAuthor}>커버리</div>
                                    <div id={iStyles.time}>2023.11.28 19:12</div>
                                    {/*빈칸차지용*/}
                                    <div style={{width: '50%'}}></div>
                                    <div className={iStyles.postFunction}>
                                        <div><a>URL 복사</a></div>
                                        <div><form><button className={iStyles.addNeighbors}>+ 이웃추가</button></form></div>
                                        <div>
                                            <a className="nav-link" href="#" role="button" data-bs-toggle="dropdown"  style={{padding: '0 10px', cursor: 'pointer'}}>
                                                <i className="fa-solid fa-ellipsis-vertical"></i>
                                            </a>
                                            <ul className="dropdownMenu">
                                                <li><a className="dropdownItem" href="#">공유</a></li>
                                                <li><hr className="dropdownDivider"></hr></li>
                                                <li><a className="dropdownItem" href="#">신고?</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*content2(main txt)*/}
                            <div className={`${iStyles.contentmain} ${iStyles.content2}`}>
                                <img src={profileImage} alt="프로필 이미지" id ="profile_img"></img>
                                    dsafsjfaskjafskjlasfdjklafsdkjlafs
                                    djkl;fasdjklfasdjkl;asfdjkl;asdfjkl;afsdjklafsdjklasdfjkl;fasdkjl;asdfjkldfaslhjkfasdkljasdfjklasdfjklasdfjkl;asdfjkldfaslhjkfasdkljasdfjklasdfjklasdfjklasfdjklsdfakljfsdkjlfasdkjlfasd

                                    asfdjklfasdjklafsdjkl;asdfjk;fadsjkasdfjfasdjkl
                                    afsjklasfdjklfsdjklsdfkljasfdjklafsdjkl
                                    asdfjklfadjklafsdklafsdjkadfskjl
                                    asdfklnafsdkljfasdkljadfs
                            </div>
                             {/*content3*/}
                            <div className={`${iStyles.contentmain} ${iStyles.content3}`}>
                                {/* 카테고리, cnt, drop list btn*/}
                                <div id={iStyles.category}><a href="#" className={iStyles.category}>나들이</a>46 개의글</div>
                                {/* drop list  */}
                                <div id="dropList">
                                    <div className="dropdown-btn" onclick="toggleDropdown()">Select an option</div>
                                    <div className="dropdown-content" id="dropdownContent">
                                        <a href="#">Option 1</a>
                                        <a href="#">Option 2</a>
                                        <a href="#">Option 3</a>
                                    </div>
                                    </div>
                                </div>


                             {/*side bar*/}
                            <div className="col-md-3">
                                <div className="positionSticky" style={{top: '2rem'}}>
                                    <form className="d-flex" role="search">
                                        {/*<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search">*/}
                                            <button className="btn btn-outline-success" type="submit">Search</button>
                                        {/*</input>*/}
                                    </form>
                                    <nav className="navbar bg-body border"style={{margin : '10px 0'}}>
                                        <div className="container-fluid">
                                            <a className="navbar-brand" href="#"> </a>
                                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                                <span className="navbar-toggler-icon"></span>
                                            </button>
                                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                                    <li className="nav-item">
                                                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                                                    </li>
                                                    <li className="nav-item dropdown">
                                                        <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                            Dropdown
                                                        </a>
                                                        <ul className="dropdown-menu">
                                                            <li><a className="dropdown-item" href="#">Action</a></li>
                                                            <li><a className="dropdown-item" href="#">Another action</a></li>
                                                            <li><hr className="dropdown-divider"></hr></li>
                                                            <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                        </ul>
                                                    </li>
                                                    <li className="nav-item">
                                                        <a className="nav-link active" aria-current="page" href="#">Home</a>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                             footer
                            <footer className="py-5 text-center text-body-secondary bg-body-tertiary">
                                <p>Blog template built for <a href="https://getbootstrap.com/">Bootstrap</a> by <a href="https://twitter.com/mdo">@mdo</a>.</p>
                                <p className="mb-0">
                                    <a href="#">Back to top</a>
                                </p>
                            </footer>
                        </div>
                    </div>
                </div>
            </div>
            <script src="/js/bootstrap/bootstrap.bundle.js"></script>
        </>
    )
}
