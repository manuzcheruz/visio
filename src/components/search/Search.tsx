import { ChangeEvent, FormEvent, useState } from "react";
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
    const suggestionsHeight = 54; //in px

    /**
     * make a request based on the search input value
     */
    function searchApi(search: string) {
        if (search.trim() === '') {
            alert('Search cannot be empty!');
            return;
        }
        setLoading(true);
        const url = `https://api.tvmaze.com/search/shows?q=${search}`;
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                let newArr: Series[] = new Array(res);
                setLoading(false);
                // @ts-ignore
                setResults(newArr[0]);
                props.onSaveSearchTerm(search);
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
        setSuggestionToggle(false);
        event.preventDefault();
        searchApi(searchVal)
    }

    const onSuggestionSelect = (term: string) => {
        setSuggestionToggle(false);
        setSearchVal(term);
        searchApi(term);
    }

    const onSuggestionToggle = () => {
        setSuggestionToggle(!suggestionToggle);
    }

    const searchTerms: string[] = props.searchTerms;

    return (
        <div>
            <Navbar />
            <form className="search-form" onSubmit={e => onSearchHandler(e)}>
                <span className="search-icon">
                    <SearchIcon height='20' color='grey' />
                </span>
                <input className="search-input" onClick={onSuggestionToggle} type="text" placeholder="search tv series..." value={searchVal} onChange={e => onSearchChange(e)} />
                {suggestionToggle && searchTerms.length ?
                <div className="suggestions-wrapper">
                    <div className="suggestions" style={{height: `${suggestionsHeight * searchTerms.length}px`}}>
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
            <>
                <Spinner />
                <h5 style={{color: 'green'}}>Looking up {searchVal}</h5>
            </>
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