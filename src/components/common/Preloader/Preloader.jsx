import React from 'react'
import preloader from "../../../assets/images/preloader.gif";
import s from "./Preloader.module.css";

export default function Preloader(props) {
    return (
        <div style={{height:props.height}} className={s.content}>
            <img src={preloader} alt="" className={s.preloader}/>
        </div>
    );
}