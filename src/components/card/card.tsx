import { useState } from 'react';
import { connect } from 'react-redux';
import { favourites } from '../../store/actions';

import './card.css';
import Plus from '../../assets/plus';

/**
 * multipurpose card for displaying individual series in any page
 * @param props 
 * @returns 
 */
function Card(props: any) {
    const [favourite, setFavourite] = useState(false);
    const onFavouriteHandler = (item: any) => {
        props.addToFavourite(item);
        setFavourite(true);
    }
    return (
        <div className="card-wrapper">
            <div className="card-body">
                <img src={props.image.medium} alt={props.name} height='300px' width='auto' />
            </div>
                <div className="favourite">
                    <div onClick={() => onFavouriteHandler(props)} className="icon"><Plus color='black' height='25' /></div>
                </div>
            <div className="card-footer">
                <button>Watch Now</button>
            </div>
        </div>
    )
}

const dispatchToReducer = (dispatch: any) => {
    return {
        addToFavourite: (item: any) => dispatch(favourites(item))
    }
}

export default connect(null, dispatchToReducer)(Card);