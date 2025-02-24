import React from 'react'
import ImageArea from './ImageArea';

export default function ProfileArea({user}) {
    return (
        <div className="user-area-wrap ptb-100 container">
          <h4 className="user-header">User Profile</h4>
    
          <div className="user-info flex space-x-5 items-center">
            <div>
                  <ImageArea user={user}/>
            </div>
            <div className="w-full">
            <table className="table m-0">
                <tbody>
                    <tr>
                        <th scope="row">Username:</th>
                        <td>{user.userName}</td> 
                    </tr>
                    <tr>
                        <th scope="row">Email:</th>
                        <td>{user.email}</td> 
                    </tr>
                    <tr>
                        <th scope="row">Role:</th>
                        <td>{user.role}</td> 
                    </tr>
                    <tr>
                      <th scope="row">Number of orders:</th>
                      <td>
    
                      
    
                      </td>
                    </tr>
                </tbody>
    
            </table>
            </div>
    
          </div>
        </div>
      );
}
