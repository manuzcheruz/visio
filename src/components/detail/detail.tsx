import { connect } from 'react-redux';
import Navbar from '../navbar/navbar';
import './detail.css';

/**
 * detail page of the series
 * @returns 
 */
function Detail(props: any) {
    console.log(props.series);
    const url: string = props.series.image.original;
    return (
        <>
            <div className="detail-wrapper" style={{backgroundImage: `url(${url})`, height: '100vh', width: 'auto', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <Navbar />
                <div className="thumbnail-card-details">
                    <div className="thumbnail-card">
                        <img src={props.series.image.original} alt={props.series.name} height='350px' width='auto' />
                    </div>
                    <div>
                        <h1>{props.series.name}</h1>
                        <h1>{props.series.rating?.average}</h1>
                        <h1>{props.series.network.name}</h1>
                        <h1>{props.series.status}</h1>
                    </div>
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