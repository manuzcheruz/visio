import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { favourites, removeFavourites, selectedSeries } from '../../store/actions';

import './card.css';
import {Plus, Close} from '../../assets/icons';
import Default from '../../assets/images/Default.png';
import Series from '../../interfaces/series';

/**
 * multipurpose card for displaying individual series in any page
 * and handles selection, adding and removing from favourites
 * @param props 
 * @returns 
 */
function Card(props: any) {
    const [favourite, setFavourite] = useState(false);
    const onFavouriteHandler = (item: Series) => {
        if (favourite || props.favourite) {
            props.removeFromFavourite(item);
            setFavourite(false);
        } else {
            props.addToFavourite(item);
            setFavourite(true);
        } 
    }

    const selectSeriesHandler = (item: Series) => {
        props.onSelectSeries(item);
    }

    let timeToShow: string;
    if (props.updated) {
        let currentTime = Date.now() / 1000;
        let difference = currentTime - props.updated;
        if (difference < 86400) {
            timeToShow = 'Less than a day ago';
        } else if (difference < 604800) {
            timeToShow = 'Less than a week ago';
        } else if (difference < 2.628e+6) {
            timeToShow = 'Less than a month ago';
        } else if (difference < 3.154e+7) {
            timeToShow = 'Less than a year ago';
        } else timeToShow = 'Over an year old';
    } else timeToShow = 'Unupdated!';

    return (
        <div>
            <div className="card-wrapper">
                <div className="card-body">
                    <Link to={`/series/${props.id}`} onClick={() => selectSeriesHandler(props)}>
                        <img src={props.image?.medium ? props.image.medium : Default} alt={props.name} />
                    </Link>
                </div>
                <div className="favourite">
                    <div onClick={() => onFavouriteHandler(props)} className="icon">
                        {favourite || props.favourite ?
                        <span className="remove"><Close color='black' height='25' /></span>
                        :
                        <span className="add"><Plus color='black' height='25' /></span>
                    }
                    </div>
                </div>
                <div className="card-footer">
                    <Link to={`/series/${props.id}`} onClick={() => selectSeriesHandler(props)} >
                        <button>Watch Now</button>
                    </Link>
                </div>
                {props.favourite &&
                    <div className="updated">
                        <span>update: {timeToShow}</span>
                    </div>
                }
            </div>
        </div>
    )
}

const dispatchToReducer = (dispatch: any) => {
    return {
        onSelectSeries: (data: Series) => dispatch(selectedSeries(data)),
        addToFavourite: (item: Series) => dispatch(favourites(item)),
        removeFromFavourite: (item: Series) => dispatch(removeFavourites(item))
    }
}

export default connect(null, dispatchToReducer)(Card);