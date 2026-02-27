import { readEquipment, getFilterPagedEquipment } from '../../services/EquipmentApi';
import { useState, useEffect } from 'react';

import { Searchbar } from '../../components/Searchbar/Searchbar';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Table } from '../../components/Table/Table'
import { Pagination } from '../../components/Pagination/Pagination';

import './Equipment.css';
import { data } from 'react-router-dom';

const DEFAULT_QUERY = {
    category: "id",
    searchString: "",
    sortBy: "id",
    sortOrder: "ASC",
    page: 1
}

const EquipmentOverview = () => {
    const [equipment, setEquipment] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorState, setErrorState] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");
    const [query, setQuery] = useState(DEFAULT_QUERY);
    const [currentPage, setCurrentPage] = useState(DEFAULT_QUERY.page);
    const [totalPages, setTotalPages] = useState(DEFAULT_QUERY.page);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await getFilterPagedEquipment(query);
                if (data && data.list.length > 0) {
                    setEquipment(data.list);
                    setCurrentPage(data.currentPage);
                    setTotalPages(data.totalPages);
                    setHeaders(Object.keys(data.list[0]));
                }
                else {
                    setEquipment([]);
                }
            } catch (error) {
                setErrorState(true)
                setErrorMessage(error.message)
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [query]);

    const handleSearch = (value) => {
        setQuery(prev => ({
            ...prev,
            searchString: value,
            page: 1
        }));
        console.log(query.searchString);
    };

    const handleCategory = (value) => {
        setQuery(prev => ({
            ...prev,
            category: value
        }));
    }

    const handleReset = () => {
        setQuery(DEFAULT_QUERY);

    }

    const handlePageRequest = (value) => {
        setQuery(prev => ({
            ...prev,
            page: value
        }));
    }

    const handleSort = (value) => {
        setQuery(prev => ({
            ...prev,
            sortBy: value,
            sortOrder: prev.sortBy === value && prev.sortOrder === "ASC" ? "DESC" : "ASC",
            page: 1
        }))
    }

    const getPagesToShow = (currentPage, totalPages) => {
        const delta = 2;
        const range = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 1) range.unshift('...');
        if (currentPage + delta < totalPages - 1) range.push('...');

        range.unshift(1);
        if (totalPages > 1) range.push(totalPages);

        return range;
    }


    const pagesToShow = getPagesToShow(currentPage, totalPages);

    return (
        <div className='equipment-main-content'>
            {loading && <p>Loading...</p>}
            {errorState && <p>{errorMessage}</p>}
            {!loading && !errorState &&
                <div className='search-table-pagintation-container'>
                    <div className='dropdown-search-container'>
                        <Dropdown
                            selectedCategory={query.category}
                            categories={headers}
                            onSelect={handleCategory} />
                        <Searchbar
                            search={query.searchString}
                            onSearch={handleSearch} />
                        <button type='button' onClick={handleReset} className='btn'>Reset Filters</button>
                    </div>
                    <div>
                        <Table
                            data={equipment}
                            sortBy={query.sortBy}
                            sortOrder={query.sortOrder}
                            onSort={handleSort} />
                    </div>

                    <div className='pagination-container'>
                        {totalPages > 1 && <Pagination
                            currentPage={currentPage}
                            pages={pagesToShow}
                            onPageSelect={handlePageRequest}
                        />}
                    </div>
                </div>}
        </div>
    );
}

export default EquipmentOverview;