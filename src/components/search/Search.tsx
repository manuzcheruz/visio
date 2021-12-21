import { useEffect, useState } from "react";
import Spinner from "../../utils/spinner/spinner";
import Card from "../card/card";
import Navbar from "../navbar/navbar";

import './search.css';

/**
 * function to search tv series
 * @returns 
 */
function Search() {
    const [searchVal, setSearchVal] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    //can search onKeyup or onSubmit, will have to decide on which

    function searchApi() {
        setLoading(true);
        console.log(searchVal);
        const url = `https://api.tvmaze.com/search/shows?q=${searchVal}`;
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                let newArr: any[] = new Array(res);
                setLoading(false);
                //@ts-ignore
                setResults(newArr[0]);
            })
            .catch((err: ErrorEvent) => {
                setLoading(false);
                setError(err.message);
            })
    }

    const onSearchChange = (event: any) => {
        setSearchVal(event.target.value);
    }

    const onSearchHandler = (event: any) => {
        event.preventDefault();
        searchApi();
    }

    return (
        <div>
            <Navbar />
            <form className="search-form" onSubmit={e => onSearchHandler(e)}>
                <input className="input" type="text" placeholder="search tv series..." value={searchVal} onChange={e => onSearchChange(e)} />
                <input className="btn" type="button" value="submit" />
            </form>
            {loading ?
            <Spinner />
            :
            error ?
            <h5 style={{color: 'red'}}>There was an error with your search: {error}</h5>
            :
            <div className="results-wrapper">
                {results.map((el: any, i) => {
                    return <Card key={i} {...el.show} />
                })}
            </div>
            }
        </div>
    )
}

export default Search;