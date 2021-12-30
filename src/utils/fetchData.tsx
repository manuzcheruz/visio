/**
 * function to fetch tv series api data based on the url
 * @param url 
 * @returns 
 */
export default async function FetchAPIData<T>(url: string) {
    let data: T[] = [];
    let error = '';

    try {
        const res = await fetch(url);
        data = await res.json();
    } catch (err: any) {
        if (err instanceof ErrorEvent) {
            error = err.message;
        } else {
            error = 'failed to fetch';
        }
    }
    
    return {data, error};
}