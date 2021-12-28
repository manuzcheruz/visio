import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Dispatch } from "redux";

import Card from "../card/card";
import { Aux } from '../../hoc/aux';
import Navbar from "../navbar/navbar";
import Series from "../../interfaces/series";
import Spinner from "../../utils/spinner/spinner";
import { randomSeries } from "../../store";
import { InitialState } from "../../store/reducers";
import './home.css';

interface Category {
    letter: string;
    array: Series[];
}

interface HomeProps {
    series: Series[];
    onSeriesLoad: (data: Series[]) => { type: string; data: Series[]; }
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
        const page = 1;
        if (mounted) FetchData(page);
        return () => {
            mounted = false;
        }
    }, []);
 
    /**
     * Fetch series data both onload and onLoadMore tasks
     * @param page 
     * @returns 
     */
    function FetchData(page: number) {
        if (page === 1) {
            setError('');
            setLoading(true);
        } else {
            setErrorOnMore('');
            setLoadingMore(true);
        }

        const url = `https://api.tvmaze.com/shows?page=${page}`;
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then((res: Series[]) => {
                if (page === 1) {
                    let sortedRes = res.sort((a: Series, b: Series) => a.name.localeCompare(b.name));
                    setLoading(false);
                    storeSeries(sortedRes);
                    setSortDirectionAsce(true);
                } else {
                    const total = [...series, ...res];
                    let sortedRes = total.sort((a: Series, b: Series) => a.name.localeCompare(b.name));
                    setLoadingMore(false);
                    storeSeries(sortedRes);
                    setSortDirectionAsce(true);
                }
            })
            .catch((err: ErrorEvent) => {
                if (page === 1) {
                    setLoading(false);
                    setError(err.message);
                } else {
                    setLoadingMore(false);
                    setErrorOnMore(err.message);
                }
            })
    }

    const onLoadMore = () => {
        FetchData(pageNum);
        setPageNum(pageNum++);
    }

    const storeSeries = (data: Series[]) => {
        onSeriesLoad(data);
    }
    
    const onSortHandler = () => {
        if (sortDirectionAsce) {
            let newRes: Series[] = [...series];
            let sortedRes = newRes.sort((a: Series, b: Series) => b.name.localeCompare(a.name));
            onSeriesLoad(sortedRes);
        } else {
            let newRes: Series[] = [...series];
            let sortedRes = newRes.sort((a: Series, b: Series) => a.name.localeCompare(b.name));
            onSeriesLoad(sortedRes);
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
            const res = series.filter((el: Series) => el.name.startsWith(item));
            if (res.length >= 1) final.push({letter: item, array: res});
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
                                    <Aux key={i}>
                                        <h1>{el.letter}</h1>
                                        <div className="categ">
                                            {el.array?.map((item: Series, i) => {
                                                return <Card key={i} series={item} />
                                            })}
                                        </div>
                                    </Aux>
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