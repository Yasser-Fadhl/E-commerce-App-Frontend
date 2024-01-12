import React, { useEffect } from "react";
import { fetchProducts, setPage } from "../slicers/productsSlice";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
  const normalStyle =
    "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full text-center align-middle font-sans text-xs font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
  const highStyle =
    "relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-full bg-gray-900 text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none";
  const pagesGen = (pgs) => {
    const result = [];
    for (let index = 0; index < pgs; index++) {
      result.push(index + 1);
    }
    return result;
  };

  const dispatch = useDispatch();
  const { limit, page, keyword, pages, loading } = useSelector(
    (state) => state.products
  );
  const Page = page;
  useEffect(() => {
    dispatch(fetchProducts({ limit, page, keyword }));
  }, [page]);
  return (
    <div className="flex items-center gap-4">
      {Page > 1 && (
        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => dispatch(setPage(Page - 1))}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            ></path>
          </svg>
          Previous
        </button>
      )}
      <div className="flex max-sm:hidden items-center xs:gap-0 sm:gap-2">
        {pagesGen(pages).length > 1 &&
          pagesGen(pages).map((page, index) => (
            <button
              className={page === Page ? highStyle : normalStyle}
              type="button"
              key={index}
              onClick={() => dispatch(setPage(page))}
            >
              <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                {page}
              </span>
            </button>
          ))}
      </div>
      {Page < pages && (
        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-full select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={() => dispatch(setPage(Page + 1))}
        >
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            aria-hidden="true"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
};

export default Pagination;
