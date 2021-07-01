import React, {FC} from 'react';
import {ProfileType} from "../../types/types";

type PropsType = {}
const ProfileGuest: FC<PropsType> = (props) => {
    return (
        <div>
            <h1>Please Login on site for use your profile</h1>
        </div>
    );
}

export default ProfileGuest;