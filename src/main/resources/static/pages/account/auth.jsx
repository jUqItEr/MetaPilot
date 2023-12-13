import axios from "axios";
import { useEffect } from "react";

const Auth = () => {
    const isValidJSON = ctx => {
        let result = false

        try {
            JSON.parse(ctx)
        } catch (e) {
            
        }
        return result
    }

    useEffect(() => {
        axios({
            headers: {
                'Authorization': localStorage.getItem('token')
            },
            method: 'post',
            url: '/api/user/principal'
        })
        .then((res) => {
            if (isValidJSON(res.data)) {
                localStorage.setItem('user', JSON.stringify(res.data))
            }
        })
        .catch((err) => {
            
        })
    }, [])

    return null
}

export default Auth;