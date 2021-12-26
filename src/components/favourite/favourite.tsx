import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { updateFavourites } from '../../store/actions';
import Series from '../../interfaces/series';
import { InitialState } from '../../store/reducers';
import Card from '../card/card';
import Navbar from '../navbar/navbar';
import './favourite.css';
import Spinner from '../../utils/spinner/spinner';
import { Dispatch } from 'redux';

/**
 * display a list of favourite series
 * @param props 
 * @returns 
 */
function Favourite(props: any) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { onUpdateFetch } = props

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setLoading(true);
            const url = 'https://api.tvmaze.com/updates/shows';
            fetch(url)
                .then(res => {
                    return res.json();
                })
                .then((res: any) => {
                    setLoading(false);
                    onUpdateFetch(res);
                })
                .catch(err => {
                    setLoading(false);
                    setError(err.message);
                })
        }

        return () => {
            mounted = false;
        }
    }, [onUpdateFetch]);

    const favourites: Series[] = props.favourites;
    return (
        <>
            <Navbar />
            {props.favourites.length < 1 ?
            <h5>No favourites yet, go to home or search to add some</h5>
            :
            loading ?
            <>
                <Spinner />
                <h5 style={{color: 'green'}}>Updating favourites</h5>
            </>
            :
            error ?
            <h5 style={{color: 'red'}}>There was an error updating: {error}</h5>
            :
            <>
                <div className="fav-wrapper">
                    {favourites.map((el: Series, i: number) => {
                        return <Card key={i} {...el} favourite />
                    })}
                </div>
            </>
            }
        </>
    )
}

const dispatchToReducer = (dispatch: Dispatch) => {
    return {
        onUpdateFetch: (data: any) => dispatch(updateFavourites(data))
    }
} 

const mapStateToProps = (state: InitialState) => {
    return {
        favourites: state.favouriteSeries
    }
}

export default connect(mapStateToProps, dispatchToReducer)(Favourite);