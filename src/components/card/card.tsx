import { useState } from 'react';
import { connect } from 'react-redux';
import { favourites, removeFavourites, selectedSeries } from '../../store/actions';

import './card.css';
import Plus from '../../assets/plus';
import { Link } from 'react-router-dom';
import Close from '../../assets/close';
import Test from '../../assets/images/test.jpeg';

/**
 * multipurpose card for displaying individual series in any page
 * @param props 
 * @returns 
 */
function Card(props: any) {
    const [favourite, setFavourite] = useState(false);
    const onFavouriteHandler = (item: any) => {
        if (favourite || props.favourite) {
            props.removeFromFavourite(item);
            setFavourite(false);
            props.favourite = false;
        } else {
            props.addToFavourite(item);
            setFavourite(true);
        } 
    }

    const selectSeriesHandler = (item: any) => {
        props.onSelectSeries(item);
    }

    return (
        <div>
            <div className="card-wrapper">
                <div className="card-body">
                    <img src={props.image?.medium ? props.image.medium : Test} alt={props.name} />
                </div>
                    <div className="favourite">
                        <div onClick={() => onFavouriteHandler(props)} className="icon">
                            {favourite || props.favourite ?
                            <Close color='black' height='25' />
                            :
                            <Plus color='black' height='25' />
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
        onSelectSeries: (data: any) => dispatch(selectedSeries(data)),
        addToFavourite: (item: any) => dispatch(favourites(item)),
        removeFromFavourite: (item: any) => dispatch(removeFavourites(item))
    }
}

export default connect(null, dispatchToReducer)(Card);