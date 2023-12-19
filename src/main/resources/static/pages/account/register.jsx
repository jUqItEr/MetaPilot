import Image from 'next/image'
import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import $ from 'jquery'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

/**
 * Rendering the login page.
 * 
 * @author Kiseok Kang (@jUqItEr)
 * @since 2023. 12. 01.
 * @returns Return the login page.
 */
export default function LoginPage() {
    const router = useRouter()

    const checkId = () => {
        let result = false

        axios({
            method: 'post',
            params: {
                userId: String($('#id').val())
            },
            url: '/api/token/checkUserId'
        })
        .then((res) => {            
            if (res.data) {
                result = true
                alert('이미 존재하는 아이디입니다.') 
            } else {
                alert('사용 가능한 아이디입니다.')
            }
        })
        return result
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const check = () => {
            let result = false
        
            axios({
                method: 'post',
                params: {
                    userId: String($('#id').val())
                },
                url: '/api/token/checkUserId'
            })
            .then((res) => {
                console.log($('#id').val(), 'is', res.data)
                result = res.data
            })
            return result
        }

        const { id, email, nickname, password, passwordCheck } = event.target.elements
        
        if (password.value !== passwordCheck.value) {
            alert('비밀번호가 일치하지 않습니다')
        } else if (check()) {
            alert('이미 존재하는 아이디입니다.')
        } else {
            const newUser = {
                id: id.value,
                nickname: nickname.value,
                email: email.value,
                password: password.value
            }
            axios.post('/api/token/register', newUser)
                .then((res) => {
                    alert('회원가입 성공')
                    router.push('/account/login')
                    return
                })
        }
    }

    return ( 
        <>
            <Head>
                <title>회원가입</title>
                <meta property='og:title' content='회원가입' key='title' />
            </Head>
            <section className='h-100'>
                <div className='container h-100'>
                    <div className='row justify-content-sm-center h-100'>
                        <div className='col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9'>
                            <div className='text-center my-5'>
                                <Image src='/image/metapilot.svg' alt='Logo' width={100} height={100} />
                            </div>
                            <div className='card shadow-lg'>
                                <div className='card-body p-5'>
                                    <h1 className='fs-4 card-title fw-bold mb-4'>회원가입</h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-3'>
                                            <label className='mb-2 text-muted' htmlFor='id'>아이디</label>
                                            <input className='form-control' id='id' type='text' name='id' autoFocus required />
                                            <button className='btn btn-primary' type='button' onClick={checkId}>중복 확인</button>
                                        </div>
                                        
                                        <div className='mb-3'>
                                            <div className='mb-2 w-100'>
                                                <label className='text-muted' htmlFor='email'>이메일</label>
                                            </div>
                                            <input className='form-control' id='email' type='email' name='email' required />
                                            <div className='invalid-feedback'>
                                                이메일을 입력해주세요
                                            </div>
                                        </div>
                                        
                                        <div className='mb-3'>
                                            <div className='mb-2 w-100'>
                                                <label className='text-muted' htmlFor='nickname'>별명 </label>
                                            </div>
                                            <input className='form-control' id='nickname' type='text' name='nickname' required />
                                            <div className='invalid-feedback'>
                                                이메일을 입력해주세요
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <div className='mb-2 w-100'>
                                                <label className='text-muted' htmlFor='password'>비밀번호</label>
                                            </div>
                                            <input className='form-control' id='password' type='password' name='password' required />
                                            <div className='invalid-feedback'>
                                                비밀번호를 입력해주세요
                                            </div>
                                        </div>

                                        <div className='mb-3'>
                                            <div className='mb-2 w-100'>
                                                <label className='text-muted' htmlFor='passwordCheck'>비밀번호 확인</label>
                                            </div>
                                            <input className='form-control' id='passwordCheck' type='password' name='passwordCheck' required />
                                            <div className='invalid-feedback'>
                                                비밀번호를 한 번 더 입력해주세요
                                            </div>
                                        </div>

                                        <div className='d-flex align-items-center'>
                                            <Link href='login'>
                                                <a>
                                                <button className='btn btn-danger' type='button'>뒤로 가기</button>
                                                </a>
                                            </Link>
                                            <button className='btn btn-primary ms-auto' type='submit'>회원가입</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}