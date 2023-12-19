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
            axios({
                headers: {
                    'Authorization': token
                },
                method: 'post',
                url: '/api/token/principal'
            })
            .then((res) => {
                try {
                    console.error('hello')
                    if (isValidJSON(res.data)) {
                        console.error('hello')
                        localStorage.setItem('user', JSON.stringify(res.data))
                    }
                } catch (e) {
                    console.error('hello1')
                    localStorage.removeItem('token')
                    localStorage.removeItem('user')
                }
            })
            .catch(_ => {
                localStorage.removeItem('token')
                localStorage.removeItem('user')
            })
        } else {
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        }
    }, [])

    return null
}

export default Auth