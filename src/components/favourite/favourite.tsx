import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { updateFavourites } from '../../store';
import Series from '../../interfaces/series';
import { InitialState } from '../../store/reducers';
import Card from '../card/card';
import Navbar from '../navbar/navbar';
import Spinner from '../../utils/spinner/spinner';
import FetchAPIData from '../../utils/fetchData';
import './favourite.css';

interface FavouriteProps {
    onUpdateFetch: (data: any) => { type: string; data: any; };
    favourites: Series[];
}
/**
 * display a list of favourite series with their updates
 * @param param0 
 * @returns 
 */
function Favourite({onUpdateFetch, favourites} : FavouriteProps) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let mounted = true;
        setError('');
        setLoading(true);
        const url = 'https://api.tvmaze.com/updates/shows';
        if (mounted) {
            (async () => {
                const { data, error } = await FetchAPIData(url);
                setLoading(false);
                if (error) {
                    setError(error);
                } else {
                    onUpdateFetch(data);
                }
            })();
        }

        return () => {
            mounted = false;
        }
    }, [onUpdateFetch]);

    return (
        <>
            <Navbar />
            {favourites.length < 1 ?
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
                        return <Card key={i} series={el} favouriteFromComponent />
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