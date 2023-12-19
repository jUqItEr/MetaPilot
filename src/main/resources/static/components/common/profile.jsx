import { faGear, faPencil } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const Profile = ({ info }) => {
    if (info && info.profile) {
        const [user, setUser] = useState([])
    // 소개글 말줄임표
    const shortenedProfile = info?.profile.length > 30 ? info?.profile.slice(0, 100) : info?.profile
    const router = useRouter()

    const handleWrite = () => {
        router.push('/post/edit')
        return
    }

    const handleSetting = () => {
        router.push('/admin/basic/user')
        return
    }

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('user')))
    }, [info])

    return (
        <>
            <div style={{
                height: '300px',
                padding: '5px',
                backgroundColor: 'var(--bs-body-bg)'
            }}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    paddingRight: '15px',
                    alignItems: 'center',
                    padding: '10px 0 0 10px'
                }}>
                    <img src={info?.profileImage || '/image/profileExImg.png'}
                        alt='...'
                        style={{ width: '120px', borderRadius: '50%' }} />
                </div>
                <div style={{
                    width: '100%',
                    height: '135px',
                    padding: '10px',
                    fontSize: '13px'
                }}>{shortenedProfile}</div>
                {(user !== null && user?.role?.roleEntity?.id !== 1) && (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <button className='btn' type='button' onClick={handleWrite}>
                            <FontAwesomeIcon icon={faPencil} width={12}/>
                            &nbsp;글쓰기
                        </button>
                        <button className='btn' type='button' onClick={handleSetting}>
                            <FontAwesomeIcon icon={faGear} width={12}/>
                            &nbsp;관리
                        </button>
                    </div>
                )}
            </div>
        </>
    )} else {
        return null
    }
}

export default Profile
