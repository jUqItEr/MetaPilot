import axios from "axios";
import { useEffect } from "react";

const Auth = () => {
    const isValidJSON = ctx => {
        let result

        try {
            JSON.stringify(ctx)
            result = true
        } catch (e) {
            result = false
        }
        return result
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if (token !== null) {
            console.error('hello')
            axios({
                headers: {
                    'Authorization': token
                },
                method: 'post',
                url: '/api/token/principal'
            })
            .then((res) => {
                if (isValidJSON(res.data)) {
                    localStorage.setItem('user', JSON.stringify(res.data))
                }
            })
            .catch(_ => {
                localStorage.removeItem('user')
            })
        } else {
            localStorage.removeItem('user')
        }
    }, [])

    return null
}

export default Auth