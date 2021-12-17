import { useEffect, useState } from "react";

/**
 * function to search tv series
 * @returns 
 */
function Search() {
    const [searchVal, setSearchVal] = useState('');
    const [results, setResults] = useState(['']);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    //can search onKeyup or onSubmit, will have to decide on which

    useEffect(() => {
        setLoading(true)
        const url = `https://api.tvmaze.com/search/shows?q=${searchVal}`;
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                console.log(res);
                setLoading(false);
                setResults(res);
            })
            .catch((err: ErrorEvent) => {
                setLoading(false);
                setError(err.message);
            })
    }, [searchVal]);

    //make a fetch request for the specific series
    const onSearchResultSelect = (id: string) => {
        //kama inakuja na kila kitu then hakuna haja ya kumake the request, rather use redux and route to the detail page
    }

    console.log(searchVal);

    return (
        <div>
            <form>
                <input type="text" placeholder="search tv series..." value={searchVal} onChange={e => setSearchVal(e.target.value)} />
                <input type="button" value="submit" />
            </form>
            {results.map((el: any, i) => {
                return <h1 onClick={() => onSearchResultSelect(el.id)} key={i}>{el}</h1>
            })}
        </div>
    )
}

export default Search;