import { useEffect } from 'react';
import { useRouter } from 'next/router';

function LoginOauth2() {
    const router = useRouter();

    useEffect(() => {
        // 라우터가 준비되었는지 확인합니다.
        if (router.isReady) {
            // URL 쿼리에서 token 값을 추출합니다.
            const token = router.query.token;
            
            if (token) {
                // 토큰이 존재하면 로컬 스토리지에 저장하고 리디렉션합니다.
                localStorage.setItem("token", "Bearer " + token);

                router.push("/");  // 사용자를 다른 페이지로 리디렉션합니다.
            } else {
                console.log("No token found in URL");
                // 토큰이 없다면 다른 처리를 할 수 있습니다.
            }
        }
    }, [router]);

    return null;  // UI를 렌더링할 필요가 없습니다.
}

export default LoginOauth2;
