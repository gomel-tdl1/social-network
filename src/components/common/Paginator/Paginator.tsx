import React, {useEffect} from 'react'
import s from '../../Friends/FriendsPresentation/FriendsPresentation.module.css'
import {NavLink} from "react-router-dom";

type PropsType = {
    paginatorCount: number
    totalCount: number
    pageSize: number
    handlePagesCountMath: (count: number) => void
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = React.memo((props) => {
    //pagesCount should be %2=1
    const middlePage = Math.ceil(props.paginatorCount / 2);
    let pagesCount = Math.ceil(props.totalCount / props.pageSize);
    if (!pagesCount) pagesCount = 1;
    useEffect(() => {
        props.handlePagesCountMath(pagesCount);
    }, [pagesCount]);
    let currentPage = props.currentPage ? props.currentPage : 1;
    if (currentPage > pagesCount) {
        currentPage = pagesCount;
    }
    let pagesView = [];
    if (currentPage >= 1 && currentPage < middlePage) {
        for (let i = 1; i <= props.paginatorCount; i++) {
            pagesView.push(i);
        }
    } else if (currentPage >= middlePage && currentPage <= (pagesCount - middlePage + 1)) {
        for (let i = (currentPage - middlePage + 1); i <= (currentPage + middlePage - 1); i++) {
            pagesView.push(i);
        }
    } else if (currentPage > (pagesCount - middlePage + 1) && currentPage <= pagesCount) {
        for (let i = pagesCount - props.paginatorCount + 1; i <= pagesCount; i++) {
            pagesView.push(i);
        }
    }

    return (
        <div className={s.pages}>
            {pagesView.map(p => {
                const isSelected = currentPage === p;
                return (
                    <NavLink to={`/friends/${p}`} onClick={(e) => {
                        props.onPageChanged(p)
                    }} key={p}>
                        <span className={isSelected ? s.selected : ''}>{p}</span>
                    </NavLink>
                );
            })}
        </div>
    );
});


export default Paginator;