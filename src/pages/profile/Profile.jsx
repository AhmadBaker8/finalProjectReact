import React, { useContext, useState } from 'react'
import { UserContext } from '../../components/user/context/UserContext'
import PageTitle from '../../components/user/custom/PageTitle';
import ProfileArea from '../../components/user/profile/ProfileArea';

export default function Profile() {
    ;
  return (
    <div>
      <PageTitle title={"Welcome"}/>
      <ProfileArea/>
    </div>
  )
}
