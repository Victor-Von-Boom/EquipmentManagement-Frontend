
import type { QueryParams, PagedEquipment } from "../types/EquipmentTypes";

const BASEURL = '/api';

// export async function readEquipment(id) {
//     const response = await fetch(`${BASEURL}/equipment/${id}`);

//     if (!response.ok) throw new Error(`Error with id ${id}, ${response.statusText}`);

//     return await response.json();
// }

export async function getFilterPagedEquipment(query: QueryParams): Promise<PagedEquipment> {

    const params= new URLSearchParams({
        category: query.category,
        searchString: query.searchString,
        sortBy: query.sortBy,
        sortOrder: query.sortOrder,
        page: query.page.toString(),
        pageSize: query.pageCount.toString()
    })
    
    
    const response = await fetch(`${BASEURL}/equipment/?${params}`);

    if (!response.ok){
        const error = await response.json();
        throw new Error(error.errorMessage);
    }

    return response.json() as Promise<PagedEquipment>;
}