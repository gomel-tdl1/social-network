import React from 'react-dom'
import SideItem from "./SideItem";
import {FC} from "react";
import {ProfileType} from "../../../types/types";

type PropsType = {
    views: Array<ProfileType>
}
const SideBar: FC<PropsType> = (props) => {
    const sideItems = props.views.map(i => {
        if(typeof i !== "number") return <SideItem name={i.fullName} avatar={i.photos.small} key={i.userId}/>
    });
    return (
        <div className='flex flex-col gap-2 pt-4'>
            {sideItems}
        </div>
    );
}
export default SideBar

