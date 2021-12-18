import { useEffect, useState } from "react";
import Spinner from "../../utils/spinner/spinner";
import { connect } from 'react-redux';
import { selectedSeries } from '../../store/actions';
import Card from "../card/card";

import './home.css';
import { Link } from "react-router-dom";

/**
 * Renders a list of the tv series that can be sorted
 * @returns 
 */
function Home(props: any) {
    const [series, setSeries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        const url = 'https://api.tvmaze.com/shows?page=1';
        fetch(url)
            .then(res => {
                return res.json();
            })
            .then(res => {
                setLoading(false);
                setSeries(res);
            })
            .catch((err: ErrorEvent) => {
                setLoading(false);
                setError(err.message);
            })
    }, []);

    const selectSeriesHandler = (item: any) => {
        props.onSelectSeries(item);
    }

    // console.log(series);

    return (
        <div className="home-wrapper">
            {loading ?
            <Spinner />
            :
            error ?
            <h5 style={{color: 'red'}}>There was an error fetching the list: {error}</h5>
            :
            <div className="home-cards">
                {series && series.map((el: any, i) => {
                    return <Link to={`/series/${el.id}`} onClick={() => selectSeriesHandler(el)} key={i}><Card {...el} /></Link>
                })}
            </div>
            }
        </div>
    )
}

const mapPropsToDispatch = (dispatch: any) => {
    return {
        onSelectSeries: (data: any) => dispatch(selectedSeries(data))
    }
}

export default connect(null, mapPropsToDispatch)(Home);