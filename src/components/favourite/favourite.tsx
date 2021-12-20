import { connect } from 'react-redux';
import Card from '../card/card';
import './favourite.css';

function Favourite(props: any) {
    return (
        <div className="fav-wrapper">
            <div className="fav-cards">
                {props.favourites.map((el: any, i: number) => {
                    return <Card key={i} {...el} />
                })}
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        favourites: state.favouriteSeries
    }
}

export default connect(mapStateToProps)(Favourite);