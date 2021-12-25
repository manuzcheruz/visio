import { ChangeEvent, FormEvent, useRef, useState } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { Clock, SearchIcon } from "../../assets/icons";
import Series from "../../interfaces/series";
import { saveSearchTerm } from "../../store/actions";
import { InitialState } from "../../store/reducers";
import Spinner from "../../utils/spinner/spinner";
import Card from "../card/card";
import Navbar from "../navbar/navbar";

import './search.css';

/**
 * function to search tv series
 * @returns 
 */
function Search(props: any) {
    const [searchVal, setSearchVal] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [suggestionToggle, setSuggestionToggle] = useState(false);

    /**
     * make a request based on the search input value
     */
    function searchApi() {
        setLoading(true);
        const url = `https://api.tvmaze.com/search/shows?q=${searchVal}`;
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                let newArr: Series[] = new Array(res);
                setLoading(false);
                // @ts-ignore
                setResults(newArr[0]);
                props.onSaveSearchTerm(searchVal);
            })
            .catch((err: ErrorEvent) => {
                setLoading(false);
                setError(err.message);
            })
    }

    const onSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchVal(event.target.value);
    }

    const onSearchHandler = (event: FormEvent) => {
        event.preventDefault();
        searchApi();
    }

    const onSuggestionSelect = (term: string) => {
        setSuggestionToggle(!suggestionToggle);
        setSearchVal(term);
        searchApi();
    }

    const suggestion = useRef<HTMLDivElement>(null);

    const onSuggestionToogle = () => {
        setSuggestionToggle(!suggestionToggle);
        suggestion?.current?.focus();
    }

    const searchTerms: string[] = props.searchTerms;

    return (
        <div>
            <Navbar />
            <form className="search-form" onSubmit={e => onSearchHandler(e)}>
                <span className="search-icon">
                    <SearchIcon height='20' color='grey' />
                </span>
                <input className="search-input" onClick={onSuggestionToogle} type="text" placeholder="search tv series..." value={searchVal} onChange={e => onSearchChange(e)} />
                {suggestionToggle && searchTerms.length ?
                <div className="suggestions-wrapper" ref={suggestion} tabIndex={0} onBlur={() => setSuggestionToggle(false)}>
                    <div className="suggestions">
                        <ul>
                            {searchTerms.map((el: string, i: number) => {
                                return <li onClick={() => onSuggestionSelect(el)} key={i}><span style={{marginRight: '15px', marginTop: '15px'}}><Clock color='grey' height='15' /></span>{el}</li>
                            })}
                        </ul>
                    </div>
                </div>
                :
                null
                }
            </form>
            {loading ?
            <Spinner />
            :
            error ?
            <h5 style={{color: 'red'}}>There was an error with your search: {error}</h5>
            :
            <div className="results-wrapper">
                {results.map((el: {show: Series[]}, i) => {
                    return <Card key={i} {...el.show} />
                })}
            </div>
            }
        </div>
    )
}

const dispatchToReducer = (dispatch: Dispatch) => {
    return {
        onSaveSearchTerm: (term: string) => dispatch(saveSearchTerm(term))
    }
}

const mapStateToProps = (state: InitialState) => {
    return {
        searchTerms: state.searchTerms
    }
}

export default connect(mapStateToProps, dispatchToReducer)(Search);