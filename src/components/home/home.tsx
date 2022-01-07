import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Dispatch } from "redux";

import Card from "../card/card";
import Navbar from "../navbar/navbar";
import Series from "../../interfaces/series";
import Spinner from "../spinner/spinner";
import { randomSeries } from "../../store";
import { InitialState } from "../../store/reducers";
import fetchApiData from "../../utils/fetchData";
import { ActionTypes } from "../../store/actionTypes";
import './home.css';

interface Category {
    letter: string;
    array: Series[];
}

interface HomeProps {
    series: Series[];
    onSeriesLoad: (data: Series[]) => { type: ActionTypes.RANDOM_TV_SERIES; data: Series[]; }
}

/**
 * Renders a list of the tv series that can be sorted and categorized
 * @param param0 
 * @returns
 */
function Home({series, onSeriesLoad} : HomeProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [toggleCategories, setToggleCategories] = useState(false);
    const [sortDirectionAsce, setSortDirectionAsce] = useState(false);
    let [pageNum, setPageNum] = useState(2);
    const [loadingMore, setLoadingMore] = useState(false);
    const [errorOnMore, setErrorOnMore] = useState('');

    useEffect(() => {
        let mounted = true;
        setError('');
        setLoading(true);
        const url = `https://api.tvmaze.com/shows?page=1`;
        if (mounted) {
            (async () => {
                const { data, error } = await fetchApiData<Series>(url);
                setLoading(false);
                if (error) {
                    setError(error);
                } else {
                    let sortedResult = data.sort((seriesA: Series, seriesB: Series) => seriesA.name.localeCompare(seriesB.name));
                    onSeriesLoad(sortedResult);
                    setSortDirectionAsce(true);
                }
            })();
        };
        return () => {
            mounted = false;
        }
    }, []);

    const onLoadMore = async () => {
        setLoadingMore(true);
        setErrorOnMore('');
        const url = `https://api.tvmaze.com/shows?page=${pageNum}`
        const { data, error } = await fetchApiData<Series>(url);
        setLoadingMore(false);
        if (error) {
            setErrorOnMore(error);
        } else {
            const total = [...series, ...data];
            let sortedResult = total.sort((seriesA: Series, seriesB: Series) => seriesA.name.localeCompare(seriesB.name));
            onSeriesLoad(sortedResult);
            setSortDirectionAsce(true);
        }

        setPageNum(pageNum++);
    }
    
    const onSortHandler = () => {
        if (sortDirectionAsce) {
            let newResult: Series[] = [...series];
            let sortedResult = newResult.sort((seriesA: Series, seriesB: Series) => seriesB.name.localeCompare(seriesA.name));
            onSeriesLoad(sortedResult);
        } else {
            let newResult: Series[] = [...series];
            let sortedResult = newResult.sort((seriesA: Series, seriesB: Series) => seriesA.name.localeCompare(seriesB.name));
            onSeriesLoad(sortedResult);
        }
        setSortDirectionAsce(!sortDirectionAsce);
    }
    
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const onCategorySet = () => {
        if (toggleCategories) {
            setToggleCategories(false);
            return;
        }
        setToggleCategories(true);
        const final: Category[] = [];
        for (let item of alphabet.toUpperCase()) {
            const result = series.filter((el: Series) => el.name.startsWith(item));
            if (result.length >= 1) final.push({letter: item, array: result});
        }

        setCategories(final);
    }

    return (
        <>
            <Navbar />
            <div className="home-wrapper">
                {loading ?
                <>
                    <Spinner />
                    <h5 style={{color: 'green'}}>Loading random series</h5>
                </>
                :
                error ?
                <h5 style={{color: 'red'}}>There was an error fetching the list: {error}</h5>
                :
                <>
                    <div className="btn-wrapper">
                        <button className="sort" onClick={onSortHandler}>{sortDirectionAsce ? 'Sort Descending' : 'Sort Ascending'}</button>
                        <button className="cat" onClick={onCategorySet}>{toggleCategories ? 'Uncategorize' : 'Categorize'}</button>
                    </div>
                    {toggleCategories ?
                        <div className="cats">
                            {categories.map((el: Category, i: number) => {
                                return (
                                    <React.Fragment key={i}>
                                        <h1>{el.letter}</h1>
                                        <div className="categ">
                                            {el.array?.map((item: Series, i) => {
                                                return <Card key={i} series={item} />
                                            })}
                                        </div>
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    :
                        <div className="home-cards">
                            {series?.map((el: Series, i: number) => {
                                return <Card key={i} series={el} />
                            })}
                        </div>  
                    }
                    {loadingMore ?
                    <>
                        <Spinner />
                        <h5 style={{color: 'green'}}>Loading More Series</h5>
                    </>
                    :
                    errorOnMore ?
                    <h5 style={{color: 'red'}}>There was an error fetching the list: {error}</h5>
                    :
                    <button onClick={onLoadMore} className="load-more">Load More</button>
                    }
                </>
                }
            </div>
        </>
    )
}

const mapStateToProps = (state: InitialState) => {
    return {
        series: state.randomSeries
    }
}

const dispatchToReducer = (dispatch: Dispatch) => {
    return {
        onSeriesLoad: (data: Series[]) => dispatch(randomSeries(data))
    }
}

export default connect(mapStateToProps, dispatchToReducer)(Home);