import React from 'react'
import ReactPaginate from "react-paginate";


export default ({pagesQuantity, selectedPage, handlePageClick}) => {
    return <ReactPaginate pageCount={pagesQuantity}
                          pageRangeDisplayed={2}
                          marginPagesDisplayed={1}
                          marginPagesDisplayed={1}
                          breakClassName={"py-1 px-2 bg-gray-600 text-white rounded-md mx-1"}
                          containerClassName={"flex py-2 px-4 justify-center"}
                          previousClassName={"py-1 px-2 bg-gray-700 text-white rounded-md mx-1"}
                          nextClassName={"py-1 px-2 bg-gray-700 text-white rounded-md mx-1"}
                          pageClassName={"py-1 px-2 bg-gray-600 text-white rounded-md mx-1"}
                          initialPage={selectedPage}
                          onPageChange={handlePageClick}/>
}