import React from 'react';
import Avatar from '../../common/Avatar/Avatar';

const TeamCard = ({
    name,
    email,
    photo,
    role
}) => {

    return (
        <div className="team-card card">
            <Avatar
                uri={ photo }
            />
            <div className="team-card-info">
                <h2 className="team-card-name">{ name }</h2>
                <h2>{ email }</h2>
                <h2>{ role }</h2>
            </div>
        </div>
    )
}

export default TeamCard;