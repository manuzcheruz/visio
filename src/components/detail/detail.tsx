import { connect } from 'react-redux';
import Navbar from '../navbar/navbar';
import './detail.css';

/**
 * detail page of the series
 * @returns 
 */
function Detail(props: any) {
    const url: string = props.series.image.original;
    return (
        <>
            <Navbar />
            <div className="detail-wrapper" style={{backgroundImage: `url(${url})`, height: '100vh', width: 'auto', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', filter: 'blur(8px)', WebkitFilter: 'blur(8px)'}}>
            </div>
            <div className="thumbnail-card-details">
                <div className="thumbnail-card">
                    <img src={props.series.image.original} alt={props.series.name} />
                </div>
                <div>
                    <h1>{props.series.name}</h1>
                    <h2>{props.series.rating?.average}</h2>
                    <h2>{props.series.network.name}</h2>
                    <h2>{props.series.status}</h2>
                </div>
            </div>
        </>
    )
}

const mapStateToProps = (state: any) => {
    return {
        series: state.selected
    }
}

export default connect(mapStateToProps)(Detail);