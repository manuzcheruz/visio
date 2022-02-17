/**
 * function to fetch tv series api data based on the url
 * @param url 
 * @returns 
 */
export default async function fetchApiData<T>(url: string) {
    let tempData;
    let error = '';

    try {
        const res = await fetch(url);
        tempData = await res.json();
    } catch (err: any) {
        if (err instanceof ErrorEvent) {
            error = err.message;
        } else {
            error = 'failed to fetch';
        }
    }

    const data: T = tempData;
    
    return {data, error};
}