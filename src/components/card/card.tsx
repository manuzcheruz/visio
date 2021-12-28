import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { favourites, removeFavourites, selectedSeries } from '../../store';
import {Plus, Close} from '../../assets/icons';
import Series from '../../interfaces/series';
import Default from '../../assets/images/Default.png';
import './card.css';

interface CardProps {
    removeFromFavourite: (item: Series) => { type: string; data: Series; };
    addToFavourite: (item: Series) => { type: string; data: Series; };
    onSelectSeries: (item: Series) => { type: string; data: Series; };
    series: Series;
    favouriteFromComponent?: boolean;
}

/**
 * multipurpose card for displaying individual series in any page
 * and handles selection, adding and removing from favourites
 * @param param0 
 * @returns 
 */
function Card({addToFavourite, removeFromFavourite, onSelectSeries, series, favouriteFromComponent} : CardProps) {
    const [favourite, setFavourite] = useState(false);

    const onFavouriteHandler = (item: Series) => {
        if (favourite || favouriteFromComponent) {
            removeFromFavourite(item);
            setFavourite(false);
        } else {
            addToFavourite(item);
            setFavourite(true);
        } 
    }


    const selectSeriesHandler = (item: Series) => {
        onSelectSeries(item);
    }

    let timeToShow = '';
    if (series.updated) {
        let currentTime = Date.now() / 1000;
        let difference = currentTime - series.updated;
        if (difference < 86400) {
            timeToShow = 'less than a day ago';
        } else if (difference < 604800) {
            timeToShow = 'less than a week ago';
        } else if (difference < 2.628e+6) {
            timeToShow = 'less than a month ago';
        } else if (difference < 3.154e+7) {
            timeToShow = 'less than a year ago';
        } else timeToShow = 'over an year ago';
    }

    return (
        <div>
            <div className="card-wrapper">
                <div className="card-body">
                    <Link to={`/series/${series.id}`} onClick={() => selectSeriesHandler(series)}>
                        <img src={series.image?.medium ? series.image.medium : Default} alt={series.name} />
                    </Link>
                </div>
                <div className="favourite">
                    <div onClick={() => onFavouriteHandler(series)} className="icon">
                        {favourite || favouriteFromComponent ?
                        <span className="remove"><Close color='black' height='25' /></span>
                        :
                        <span className="add"><Plus color='black' height='25' /></span>
                    }
                    </div>
                </div>
                <div className="card-footer">
                    <Link to={`/series/${series.id}`} onClick={() => selectSeriesHandler(series)} >
                        <button>Watch Now</button>
                    </Link>
                </div>
                {favouriteFromComponent &&
                    <div className="updated">
                        <span>{timeToShow ? `updated ${timeToShow}` : 'unupdated'}</span>
                    </div>
                }
            </div>
        </div>
    )
}

const dispatchToReducer = (dispatch: Dispatch) => {
    return {
        onSelectSeries: (item: Series) => dispatch(selectedSeries(item)),
        addToFavourite: (item: Series) => dispatch(favourites(item)),
        removeFromFavourite: (item: Series) => dispatch(removeFavourites(item))
    }
}

export default connect(null, dispatchToReducer)(Card);