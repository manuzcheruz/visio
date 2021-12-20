import { useState } from 'react';
import { connect } from 'react-redux';
import { favourites } from '../../store/actions';

import Fav from '../../assets/fav';
import './card.css';

/**
 * multipurpose card for displaying individual series in any page
 * @param props 
 * @returns 
 */
function Card(props: any) {
    const [favourite, setFavourite] = useState(false);
    const onFavouriteHandler = (item: any) => {
        props.addToFavourite(item);
    }
    return (
        <div className="card-wrapper">
            <div className="card-body">
                <img src={props.image.medium} alt={props.name} height='250px' width='auto' />
            </div>
            <div className="card-footer">
                <div className="left">
                    <h5 className="title">{props.name}</h5>
                    {props.genres.map((el: string, i: number) => {
                        return <span style={{marginLeft: '5px'}} key={i} className="genre">{el}</span>
                    })}
                </div>
                <div className="right">
                    <span onClick={() => onFavouriteHandler(props.series)}><Fav height='20' /></span>
                </div>
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