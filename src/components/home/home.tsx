import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Spinner from "../../utils/spinner/spinner";
import Card from "../card/card";

import './home.css';
import Navbar from "../navbar/navbar";
import { Aux } from '../../hoc/aux';
import { randomSeries } from "../../store/actions";

interface Image {
    original: string;
    medium: string;
}
interface Item {
    name: string;
    image: Image;
    id: string;
}

/**
 * Renders a list of the tv series that can be sorted
 * @returns 
 */
function Home(props: any) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [categories, setCategories] = useState([{}]);
    const [toggler, setToggler] = useState(false);
    const [sortTrigger, setSortTrigger] = useState(false);
    let [pageNum, setPageNum] = useState(2);

    useEffect(() => {
        setLoading(true);
        const url = 'https://api.tvmaze.com/shows?page=1';
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                let sortedRes = res.sort((a: Item, b: Item) => a.name.localeCompare(b.name));
                setLoading(false);
                test(sortedRes);
                setSortTrigger(true);
            })
            .catch((err: ErrorEvent) => {
                setLoading(false);
                setError(err.message);
            })
    }, []);

    function loadMore(page: number) {
        const url = `https://api.tvmaze.com/shows?page=${page}`;
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                const total = [...props.series, ...res];
                let sortedRes = total.sort((a: Item, b: Item) => a.name.localeCompare(b.name));
                setLoading(false);
                test(sortedRes);
                setSortTrigger(true);
            })
            .catch((err: ErrorEvent) => {
                setLoading(false);
                setError(err.message);
            })
    }

    const onLoadMore = () => {
        loadMore(pageNum);
        setPageNum(pageNum++);
    }

    const test = (data: any[]) => {
        props.onSeriesLoad(data);
    }
    
    const onSortHandler = () => {
        if (sortTrigger) {
            let newRes = [...props.series];
            let sortedRes = newRes.sort((a: Item, b: Item) => b.name.localeCompare(a.name));
            props.onSeriesLoad(sortedRes);
        } else {
            let newRes = [...props.series];
            let sortedRes = newRes.sort((a: Item, b: Item) => a.name.localeCompare(b.name));
            props.onSeriesLoad(sortedRes);
        }
        setSortTrigger(!sortTrigger);
    }
    
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    const onCategorySet = () => {
        if (toggler) {
            setToggler(false);
            return;
        }
        setToggler(true);
        //use the alphabet
        const final = [];
        for (let item of alphabet.toUpperCase()) {
            const res = props.series.filter((el: Item) => el.name.startsWith(item));
            if (res.length >= 1) final.push({letter: item, array: res});
        }

        setCategories(final);
    }

    return (
        <>
            <Navbar />
            <div className="home-wrapper">
                {loading ?
                <Spinner />
                :
                error ?
                <h5 style={{color: 'red'}}>There was an error fetching the list: {error}</h5>
                :
                <>
                    <div className="btn-wrapper">
                        <button className="sort" onClick={onSortHandler}>{sortTrigger ? 'Sort Descending' : 'Sort Ascending'}</button>
                        <button className="cat" onClick={onCategorySet}>{toggler ? 'Uncategorize' : 'Categorize'}</button>
                    </div>
                    {toggler ?
                        <div className="cats">
                            {categories?.map((el: any, i) => {
                                return (
                                    <Aux key={i}>
                                        <h1>{el.letter}</h1>
                                        <div className="categ">
                                            {el.array?.map((item: any, i: any) => {
                                                return <Card key={i} {...item} />
                                            })}
                                        </div>
                                    </Aux>
                                )
                            })}
                        </div>
                    :
                        <div className="home-cards">
                            {props.series?.map((el: Item, i: number) => {
                                return <Card key={i} {...el} />
                            })}
                        </div>  
                    }
                    <button onClick={onLoadMore} className="load-more">Load More</button>
                </>
                }
            </div>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        series: state.randomSeries
    }
}

const dispatchToReducer = (dispatch: any) => {
    return {
        onSeriesLoad: (data: any[]) => dispatch(randomSeries(data))
    }
}

export default connect(mapStateToProps, dispatchToReducer)(Home);