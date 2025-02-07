//import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllJobsCotext } from "../pages/AllJobs";
const PageBtnContainer = () => {
  const {
    data: { numberPages, curentPage },
  } = useAllJobsCotext();
  const { search, pathname } = useLocation();
  const navigate = useNavigate();
  const pages = Array.from({ length: numberPages }, (_, index) => index + 1);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    searchParams.set("page", pageNumber);
    navigate(`${pathname}?${searchParams.toString()}`);
  };

  const addPageButton = ({ pageNumber, activeClass }) => {
    return (
      <button
        className={`btn page-btn ${activeClass && "active"}`}
        key={pageNumber}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </button>
    );
  };
  const renderPageButtons = () => {
    const pageButtons = [];
    // Add the first page button
    pageButtons.push(
      addPageButton({
        pageNumber: 1,
        activeClass: curentPage === 1,
      })
    );
    // Add the dots before the current page if there are more than 3 pages
    if (curentPage > 3) {
      pageButtons.push(
        <span className="page-btn dots" key="dots-1">
          ....
        </span>
      );
    }
    // one before current page
    if (curentPage !== 1 && curentPage !== 2) {
      pageButtons.push(
        addPageButton({ pageNumber: curentPage - 1, activeClass: false })
      );
    }
    // Add the current page button
    if (curentPage !== 1 && curentPage !== numberPages) {
      pageButtons.push(
        addPageButton({ pageNumber: curentPage, activeClass: true })
      );
    }
    if (curentPage !== numberPages && curentPage !== numberPages - 1) {
      pageButtons.push(
        addPageButton({ pageNumber: curentPage + 1, activeClass: false })
      );
    }
    if (curentPage < numberPages - 2) {
      pageButtons.push(
        <span className="page-btn dots" key="dots+1">
          ...
        </span>
      );
    }
    pageButtons.push(
      addPageButton({
        pageNumber: numberPages,
        activeClass: curentPage === numberPages,
      })
    );
    return pageButtons;
  };

  return (
    <Wrapper>
      <button
        className="btn prev-btn"
        onClick={() => {
          let prevPage = curentPage - 1;
          if (prevPage < 1) prevPage = numberPages;
          handlePageChange(prevPage);
        }}
      >
        <HiChevronDoubleLeft />
        prev
      </button>
      <div className="btn-container">{renderPageButtons()}</div>
      <button
        className="btn next-btn"
        onClick={() => {
          let nextPage = curentPage + 1;
          if (nextPage > numberPages) nextPage = 1;

          handlePageChange(nextPage);
        }}
      >
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
