import React, {useEffect} from 'react'
import {Pagination} from "antd";
import {useHistory} from 'react-router-dom';

type PropsType = {
    paginatorCount: number
    totalCount: number
    pageSize: number
    handlePagesCountMath: (count: number) => void
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}

const Paginator: React.FC<PropsType> = React.memo((props) => {

    let pagesCount = Math.ceil(props.totalCount / props.pageSize);
    if (!props.totalCount) pagesCount = 1;
    useEffect(() => {
        props.handlePagesCountMath(pagesCount);
    }, [pagesCount]);
    let currentPage = props.currentPage ? props.currentPage : 1;
    let history = useHistory();
    const handleChangeCurrentPage = (pageNumber: number) => {
        history.push(`/friends/${pageNumber}`)
        props.onPageChanged(pageNumber)
    }

    return (
        <Pagination pageSize={5} total={props.totalCount} showSizeChanger={false} onChange={handleChangeCurrentPage}
                    defaultCurrent={currentPage}/>
    );
});


export default Paginator;