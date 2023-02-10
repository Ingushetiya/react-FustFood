import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './pagination.module.scss';

type PaginotionProps = {
  currentPage: number;
  setPages: any;
};

const Paginotion: React.FC<PaginotionProps> = ({ currentPage, setPages }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel=" ... "
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => setPages(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
    />
  );
};

export default Paginotion;
