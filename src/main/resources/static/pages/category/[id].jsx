import axios from "axios"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import IndexHeader from "../../layout/home/header"

export const getServerSideProps = async ({ query: { id } }) => {
    return {
        props: {
            id: id
        }
    }
}

const CategoryPage = (props) => {
    const [ category, setCategory ] = useState([])
    const [ info, setInfo ] = useState([])
    const id = props.id

    useEffect(() => {
        const getCategory = async () => {
            axios({
                data: {
                    id: id
                },
                method: 'post',
                url: '/api/category/info'
            })
            .then((res) => {
                setCategory(res.data)
            })
        }
        
        const getInfo = async () => {
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
    }, [props.id])

    return (
        <>
            <Head>
                <title>{`${category.subject} - ${info.title}`}</title>
            </Head>
            <IndexHeader/>
        </>
    )
}

export default CategoryPage


// import axios from 'axios'
// import Head from 'next/head'
// import IndexHeader from '../../layout/home/header'
// import { useRouter } from 'next/router'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router'


// const CategoryPosts = () => {
//     const router = useRouter()
//     const [ category, setCategory ] = useState([])
//     const [ info, setInfo ] = useState([])
//     const { id } = router.query

//     useEffect(() => {
//         const getCategory = async () => {
//             const number = Number(id)

//             axios({
//                 data: {
//                     id: number
//                 },
//                 method: 'post',
//                 url: '/api/category/info'
//             })
//             .then((res) => {
//                 if (res.data === '') {
                    
//                 }
//                 setCategory(res.data !== undefined ? res.data : null)
//             })
//         }

//         const getInfo = async () => {
//             axios({
//                 method: 'get',
//                 url: '/api/info'
//             })
//             .then((res) => {
//                 setInfo(res.data !== undefined ? res.data.data : null)
//             })
//         }

//         getCategory()
//         getInfo()
//     }, [])

//     return (
//         <>
//             <Head>
//                 <title>{`${category['subject']} - ${info['title']}`}</title>
//             </Head>
//             <IndexHeader />
//         </>
//     )
// }

// export const getServerSideProps = async ({ context }) => {
//     return {
//         props: {

//         }
//     }
// }

// export default CategoryPosts