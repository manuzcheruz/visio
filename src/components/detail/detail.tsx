import { connect } from 'react-redux';

import Series from '../../interfaces/series';
import { InitialState } from '../../store/reducers';
import Navbar from '../navbar/navbar';
import Default from '../../assets/images/Default.png';
import './detail.css';

/**
 * detail page of the series
 * @param props 
 * @returns 
 */
function Detail(props: any) {
    const {series}: {series: Series} = props;
    let url = series.image?.original;
    if (!url) url = Default
    return (
        <>
            <Navbar />
            <div className="detail-wrapper" style={{backgroundImage: `url(${url})`}}>
            </div>
            <div className="thumbnail-card-details">
                <div className="thumbnail-card">
                    <img src={series.image?.original ? series.image?.original : url} alt={series.name} />
                </div>
                <div>
                    <h1>{series.name}</h1>
                    <h2>{series.rating?.average}</h2>
                    <h2>{series.network?.name}</h2>
                    <h2>{series.status}</h2>
                    <h2>{series.premiered}</h2>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: InitialState) => {
    return {
        series: state.selected
    }
}

export default connect(mapStateToProps)(Detail);