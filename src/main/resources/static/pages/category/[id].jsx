import axios from "axios"
import Head from "next/head"
import { useEffect, useState } from "react"
import IndexHeader from "../../layout/home/header"
import PostList from "../../components/common/list"

export const getServerSideProps = async context => {
    const { id } = context.params

    return {
        props: {
            id: id
        }
    }
}

const CategoryPage = ({ id }) => {
    const [ category, setCategory ] = useState([])
    const [ info, setInfo ] = useState([])

    useEffect(() => {
        const getCategory = () => {
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
    }, [id])

    return (
        <>
            <Head>
                <title>{`${category.subject} - ${info.title}`}</title>
            </Head>
            <IndexHeader/>
            {category.id && (<PostList id={`${category.id}`}/>)}
        </>
    )
}

export default CategoryPage