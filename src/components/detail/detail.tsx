import { connect } from 'react-redux';

/**
 * detail page of the series
 * @returns 
 */
function Detail(props: any) {
    console.log(props.series);
    const url: string = props.series.image.original;
    return (
        <div className="detail-wrapper" style={{backgroundImage: `url(${url})`, height: '100vh', width: 'auto', backgroundRepeat: 'no-repeat'}}>
            <h1>{props.series.name}</h1>
            <h1>{props.series.rating?.average}</h1>
            <h1>name</h1>
            <h1>name</h1>
        </div>
    )
}

const mapStateToProps = (state: any) => {
    return {
        series: state.selected
    }
}

export default connect(mapStateToProps)(Detail);