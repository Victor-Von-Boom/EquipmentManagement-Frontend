import './Pagination.css'

interface PaginationProps {
    currentPage: number,
    pages: (string | number)[],
    onPageSelect: (value: number) => void
}

export const Pagination = ({ currentPage, pages, onPageSelect }: PaginationProps) => {
    return (
        <>
            {pages.map((page, index) => (
                page === '...'
                    ? <span key={index}>...</span>
                    : <button
                        type="button"
                        key={`page-${page}`}
                        onClick={(e) => { typeof page === 'number' && onPageSelect(page) }}
                        className={`${page === currentPage ? 'btn active-btn' : 'btn'}`}
                        disabled={page === currentPage}>
                        {page}
                    </button >
            ))}
        </>
    );
}