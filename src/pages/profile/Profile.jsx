import React, { useContext, useState } from 'react'
import { UserContext } from '../../components/user/context/UserContext'
import PageTitle from '../../components/user/custom/PageTitle';
import ProfileArea from '../../components/user/profile/ProfileArea';

export default function Profile() {
    const {user} = useContext(UserContext);
    console.log(user);
  return (
    <div>
      <PageTitle title={user.userName}/>
      <ProfileArea user={user}/>
    </div>
  )
}
