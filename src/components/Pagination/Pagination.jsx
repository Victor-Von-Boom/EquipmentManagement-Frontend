import React from "react";

import './Pagination.css'

export const Pagination = ({ currentPage, pages, onPageSelect }) => {
    return (
        <>
            {pages.map((page, index) => (
                page === '...'
                    ? <span key={index}>...</span>
                    : <button
                        type="button"
                        key={page}
                        onClick={(e) => { onPageSelect(page) }}
                        className={`${page === currentPage ? 'btn active-btn' : 'btn'}`}
                        disabled={page === currentPage}>
                        {page}
                    </button >
            ))}
        </>
    );
}