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