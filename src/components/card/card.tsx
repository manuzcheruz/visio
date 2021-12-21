import { useState } from 'react';
import { connect } from 'react-redux';
import { favourites, selectedSeries } from '../../store/actions';

import './card.css';
import Plus from '../../assets/plus';
import { Link } from 'react-router-dom';
import Close from '../../assets/close';

/**
 * multipurpose card for displaying individual series in any page
 * @param props 
 * @returns 
 */
function Card(props: any) {
    const [favourite, setFavourite] = useState(false);
    const onFavouriteHandler = (item: any) => {
        let status = false;
        if (favourite || props.favourite) {
            status = true;
            props.addToFavourite(item, status);
        } else props.addToFavourite(item, status);
        setFavourite(true);
    }

    const selectSeriesHandler = (item: any) => {
        props.onSelectSeries(item);
    }

    return (
        <div>
            <div className="card-wrapper">
                <div className="card-body">
                    <img src={props.image.medium} alt={props.name} height='300px' width='auto' />
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
        addToFavourite: (item: any, status: boolean) => dispatch(favourites(item, status))
    }
}

export default connect(null, dispatchToReducer)(Card);