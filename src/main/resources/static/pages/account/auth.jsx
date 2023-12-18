import axios from "axios";
import { useEffect } from "react";

const Auth = () => {
    const isValidJSON = ctx => {
        let result

        console.log('context? ', ctx)

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
            
        })
    }, [])

    return null
}

export default Auth