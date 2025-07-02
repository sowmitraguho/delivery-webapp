import React from 'react';
import { Tooltip } from 'react-tooltip'
import { useAuth } from '../../hooks/useAuth';

const UserTooltip = () => {
    const {user} = useAuth()
    return (
        <div>
            <a  data-tooltip-id="my-tooltip" data-tooltip-content={user.displayName? user.displayName : user.email}>
                <img className='w-8 h-8 rounded-2xl' src={user.photoURL? user.photoURL : `https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_items_boosted&w=740`} alt="" />
            </a>
            <Tooltip className='z-20' id="my-tooltip" />
        </div>
    );
};

export default UserTooltip;