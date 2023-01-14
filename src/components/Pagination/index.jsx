import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from "./pagination.module.scss"

const Paginotion = ({setPages}) => {

    return (

        <ReactPaginate
        className={styles.root}
        breakLabel=" ... "
        nextLabel=">"
        previousLabel="<"
        onPageChange={event=>setPages(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}   
        renderOnZeroPageCount={null}
      />

    );
};

export default Paginotion;