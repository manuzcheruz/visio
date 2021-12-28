import { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';

import { favourites, removeFavourites, selectedSeries } from '../../store';
import {Plus, Close} from '../../assets/icons';
import Series from '../../interfaces/series';
import Default from '../../assets/images/Default.png';
import './card.css';

/**
 * multipurpose card for displaying individual series in any page
 * and handles selection, adding and removing from favourites
 * @param props 
 * @returns 
 */
function Card(props: any) {
    const [favourite, setFavourite] = useState(false);
    const {id, name, image}: {id: number, name: string, image: {medium: string}} = props;
    const {addToFavourite, removeFromFavourite} = props;

    const onFavouriteHandler = (item: Series) => {
        if (favourite || props.favourite) {
            removeFromFavourite(item);
            setFavourite(false);
        } else {
            addToFavourite(item);
            setFavourite(true);
        } 
    }


    const selectSeriesHandler = (item: Series) => {
        props.onSelectSeries(item);
    }

    let timeToShow = '';
    if (props.updated) {
        let currentTime = Date.now() / 1000;
        let difference = currentTime - props.updated;
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
                    <Link to={`/series/${id}`} onClick={() => selectSeriesHandler(props)}>
                        <img src={image?.medium ? image.medium : Default} alt={name} />
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
                    <Link to={`/series/${id}`} onClick={() => selectSeriesHandler(props)} >
                        <button>Watch Now</button>
                    </Link>
                </div>
                {props.favourite &&
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
        onSelectSeries: (data: Series) => dispatch(selectedSeries(data)),
        addToFavourite: (item: Series) => dispatch(favourites(item)),
        removeFromFavourite: (item: Series) => dispatch(removeFavourites(item))
    }
}

export default connect(null, dispatchToReducer)(Card);