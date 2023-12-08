import axios from "axios"
import Head from "next/head"
import { useEffect, useState } from "react"
import IndexHeader from "../../layout/home/header"
import PostList from "../../components/common/list"

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

    console.log('아이디!' + id)

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
            <PostList/>
        </>
    )
}

export default CategoryPage