import axios from "axios";
import { useEffect } from "react";

const Auth = () => {

    useEffect(() => {
        axios({
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            method: 'post',
            url: '/api/user/principal'
        })
        .then((res) => {
            localStorage.setItem('user', JSON.stringify(res.data))
            console.log(res)
        })
    }, [])

    return null
}

export default Auth;