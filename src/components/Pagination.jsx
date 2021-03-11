import React from 'react';
import ReactPaginate from 'react-paginate';

export default ({ pagesQuantity, selectedPage, handlePageClick }) => (
  <ReactPaginate
    initialPage={selectedPage - 1}
    pageCount={pagesQuantity}
    pageRangeDisplayed={1}
    marginPagesDisplayed={2}
    containerClassName="flex py-2 px-4 justify-center"
    onPageChange={handlePageClick}
    activeLinkClassName="font-bold"
    pageLinkClassName="py-1 px-3 bg-green-700 text-white rounded-md mx-1"
    breakLinkClassName="py-1 px-2 bg-green-800 text-white rounded-md mx-1"
    nextLinkClassName="py-1 px-2 bg-green-600 text-white rounded-md mx-1"
    previousLinkClassName="py-1 px-2 bg-green-600 text-white rounded-md mx-1"
  />
);
