import React from 'react';

import ReactPaginate from 'react-paginate';

import styles from "./pagination.module.scss"
const Paginotion = () => {

    return (

        <ReactPaginate
        className={styles.root}
        breakLabel="................"
        nextLabel=">"
        previousLabel="<"
        onPageChange={e=>console.log(e)}
        pageRangeDisplayed={8}
        pageCount={3}   
        renderOnZeroPageCount={null}
      />

    );
};

export default Paginotion;