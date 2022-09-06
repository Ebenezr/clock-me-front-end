import React, { useContext } from 'react'
import { appContext } from '../../pages/Main';


interface UserListProps{
  renderUser(id:number):void;
}
const UserList:React.FC<UserListProps>=({renderUser})=> {
  const employees = useContext(appContext);
  return (
    <div className="results">
    {employees?.map((users) => (
      <span
        key={users.id}
        onClick={() => {
          renderUser(users.id);
        }}
      > 
         <h4>{users.name}</h4>
        <small>{users.department_id}</small>
      </span>
    ))}
  </div>
  )
}

export default UserList