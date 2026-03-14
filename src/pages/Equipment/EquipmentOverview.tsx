import { useState, useEffect, useMemo } from 'react';

import { Searchbar } from '../../components/Searchbar/Searchbar';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Table } from '../../components/Table/Table'
import { Pagination } from '../../components/Pagination/Pagination';

import { getFilterPagedEquipment } from '../../services/EquipmentApi';
import { getPagesToShow } from '../../utils/pagination';

import type { QueryParams } from '../../types/EquipmentTypes';
import type { PagedEquipment, Equipment } from '../../types/EquipmentTypes';

import './Equipment.css';


const DEFAULT_QUERY: QueryParams = {
    category: "id",
    searchString: "",
    sortBy: "id",
    sortOrder: "ASC",
    page: 1,
    pageCount: 20
}

const DEFAULT_HEADERS: string[] = ['id', 'category', 'type', 'manufacturer', 'model', 'sn'];

function EquipmentOverview() {
    const [equipment, setEquipment] = useState<Equipment[]>([]);
    const [headers, setHeaders] = useState<string[]>(DEFAULT_HEADERS);
    const [loading, setLoading] = useState<boolean>(true);
    const [errorState, setErrorState] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [query, setQuery] = useState<QueryParams>(DEFAULT_QUERY);
    const [currentPage, setCurrentPage] = useState<number>(DEFAULT_QUERY.page);
    const [totalPages, setTotalPages] = useState<number>(DEFAULT_QUERY.page);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data : PagedEquipment = await getFilterPagedEquipment(query);
                if (data && data.list.length > 0) {
                    setEquipment(data.list);
                    setCurrentPage(data.currentPage);
                    setTotalPages(data.totalPages);
                }
                else {
                    setEquipment([]);
                }
            } catch (error) {
                setErrorState(true)
                setErrorMessage(error instanceof Error ? error.message : "Unknown Error")
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [query]);

    const handleSearch = (searchString: string) => {
        setQuery(prev => ({
            ...prev,
            searchString: searchString,
            page: 1
        }));
    };

    const handleCategory = (category: string) => {
        setQuery(prev => ({
            ...prev,
            category: category
        }));
    }

    const handleReset = () => {
        setQuery(DEFAULT_QUERY);

    }

    const handlePageRequest = (page: number) => {
        setQuery(prev => ({
            ...prev,
            page: page
        }));
    }

    const handleSort = (sortBy: string) => {
        setQuery(prev => ({
            ...prev,
            sortBy: sortBy,
            sortOrder: prev.sortBy === sortBy && prev.sortOrder === "ASC" ? "DESC" : "ASC",
            page: 1
        }))
    }

    const pagesToShow = useMemo(() => getPagesToShow(currentPage, totalPages), [currentPage, totalPages]);

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
                            onSelect={handleCategory}/>
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
                            headers={headers}
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