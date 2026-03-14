
export interface QueryParams{
    category: string,
    searchString: string,
    sortBy: string,
    sortOrder: "ASC" | "DESC",
    page: number,
    pageCount: number
}

export interface Equipment{
    id: number,
    category: string,
    type: string,
    manufacturer: string,
    model: string,
    sn: string
}

export interface PagedEquipment {
    currentPage: number,
    totalPages: number,
    list: Equipment[]
}