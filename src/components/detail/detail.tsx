import { connect } from 'react-redux';
import Series from '../../interfaces/series';
import Navbar from '../navbar/navbar';
import './detail.css';

/**
 * detail page of the series
 * @returns 
 */
function Detail(props: any) {
    const series: Series = props.series;
    const url: string = series.image.original;
    return (
        <>
            <Navbar />
            <div className="detail-wrapper" style={{backgroundImage: `url(${url})`, height: '100vh', width: 'auto', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', filter: 'blur(8px)', WebkitFilter: 'blur(8px)'}}>
            </div>
            <div className="thumbnail-card-details">
                <div className="thumbnail-card">
                    <img src={series.image.original} alt={props.series.name} />
                </div>
                <div>
                    <h1>{series.name}</h1>
                    <h2>{series.rating?.average}</h2>
                    <h2>{series.network.name}</h2>
                    <h2>{series.status}</h2>
                    <h2>{series.premiered}</h2>
                    {/* <div dangerouslySetInnerHTML={{__html: series.summary.slice(0, 50)}}></div> */}
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