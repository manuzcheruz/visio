import { connect } from 'react-redux';
import './detail.css';

/**
 * detail page of the series
 * @returns 
 */
function Detail(props: any) {
    console.log(props.series);
    const url: string = props.series.image.original;
    return (
        <div className="detail-wrapper" style={{backgroundImage: `url(${url})`, height: '100vh', width: 'auto', filter: 'blur(8px)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat'}}>
            <div className="thumbnail-card">
                <h1>{props.series.name}</h1>
                <h1>{props.series.rating?.average}</h1>
                <h1>name</h1>
                <h1>name</h1>
            </div>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        series: state.selected
    }
}

export default connect(mapStateToProps)(Detail);