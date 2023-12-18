const Profile = ({ info }) => {
    if (info && info.profile) {
      // 소개글 말줄임표
      const shortenedProfile = info.profile.length > 30 ? info.profile.slice(0, 100)  : info.profile;

      return (
        <>
          <div style={{height: '160px',padding: '5px', backgroundColor:'var(--bs-body-bg)'}}>
            <div style={{width:'15%', display:'flex', alignItems:'center',padding:'10px 0 0 10px' }}>
              <img src={info?.profileImage || "/image/profileExImg.png"} alt="..." style={{ width: '100%', borderRadius: '50%'}} />
            </div>
            <div style={{width:'100%',height: '85%', padding: '10px', fontSize:'13px' }}>{shortenedProfile}</div>
          </div>
        </>
      );
    }
  };

  export default Profile;
