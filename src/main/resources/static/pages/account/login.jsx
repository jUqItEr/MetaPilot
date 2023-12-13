import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import styles from "/styles/login.module.css";

/**
 * Rendering the login page.
 *
 * @author Kiseok Kang (@jUqItEr)
 * @since 2023. 12. 01.
 * @returns Return the login page.
 */
export default function LoginPage() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const { id, password } = event.target.elements;

    axios({
      headers: {
        Authorization: "cos",
      },
      data: {
        id: id.value,
        password: password.value,
      },
      method: "post",
      url: "/login",
    })
      .then((res) => {
        console.log(res.headers);
        const token = res.headers.authorization;
        localStorage.setItem("token", token); //로컬 스토리지에 저장
        window.location.href = "/";
        //localStorage.removeItem("token"); //로그아웃시 로컬 스토리지에서 지우기.
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Head>
        <title>로그인</title>
        <meta property="og:title" content="로그인" key="title" />
      </Head>
      <section className="h-100">
        <div className="container h-100">
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="text-center my-5">
                <Image
                  src="/image/metapilot.svg"
                  alt="Logo"
                  width={100}
                  height={100}
                />
              </div>
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <h1 className="fs-4 card-title fw-bold mb-4">로그인</h1>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="id">
                        아이디
                      </label>
                      <input
                        className="form-control"
                        id="id"
                        type="text"
                        name="id"
                        autoFocus
                        required
                      />
                      <div className="invalid-feedback">
                        아이디가 잘못되었습니다
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="password">
                          비밀번호
                        </label>
                        <Link href="findPassword">
                          <a className={`${styles.anchor} float-end`}>
                            비밀번호 찾기
                          </a>
                        </Link>
                      </div>
                      <input
                        className="form-control"
                        id="password"
                        type="password"
                        name="password"
                        required
                      />
                      <div className="invalid-feedback">
                        비밀번호를 입력해주세요
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          id="remain"
                          type="checkbox"
                          name="remain"
                        />
                        <label className="form-check-label" htmlFor="remain">
                          로그인 유지
                        </label>
                      </div>
                      <button className="btn btn-primary ms-auto" type="submit">
                        로그인
                      </button>
                    </div>

                    <hr className="my-4"></hr>

                    <div className="text-center my-4">
                      간편하게 로그인하세요!
                    </div>

                    <div className="row row-cols-4 justify-content-md-center">
                      <div className="col">
                        <Link href="/oauth2/authorization/google">
                          <a>
                            <Image
                              style={{
                                borderRadius: "50%",
                                overflow: "hidden",
                              }}
                              src="/image/logo-google.png"
                              objectFit="cover"
                              width={50}
                              height={50}
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="col">
                        <Link href="/oauth2/authorization/naver">
                          <a>
                            <Image
                              style={{
                                borderRadius: "50%",
                                overflow: "hidden",
                              }}
                              src="/image/logo-naver.png"
                              objectFit="cover"
                              width={50}
                              height={50}
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="col">
                        <Link href="/oauth2/authorization/kakao">
                          <a>
                            <Image
                              style={{
                                borderRadius: "50%",
                                overflow: "hidden",
                              }}
                              src="/image/logo-kakao.png"
                              objectFit="cover"
                              width={50}
                              height={50}
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-0">
                  <div className="text-center">
                    아이디가 없나요?&nbsp;
                    <Link href="register">
                      <a className={styles.anchor}>회원가입</a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
