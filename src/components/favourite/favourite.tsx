import { connect } from 'react-redux';
import Series from '../../interfaces/series';
import { InitialState } from '../../store/reducers';
import Card from '../card/card';
import Navbar from '../navbar/navbar';
import './favourite.css';

/**
 * display a list of favourite series
 * @param props 
 * @returns 
 */
function Favourite(props: any) {
    const favourite: Series[] = props.favourites;
    return (
        <>
            <Navbar />
            <div className="fav-wrapper">
                {favourite.map((el: Series, i: number) => {
                    return <Card key={i} {...el} favourite />
                })}
                { props.favourites.length < 1 && <h4>No favourites yet, go to home or search to add some</h4>}
            </div>
        </>
    )
}

const mapStateToProps = (state: InitialState) => {
    return {
        favourites: state.favouriteSeries
    }
}

export default connect(mapStateToProps)(Favourite);