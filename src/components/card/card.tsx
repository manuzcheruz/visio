import './card.css';

/**
 * multipurpose card for displaying individual series in any page
 * @param props 
 * @returns 
 */
function Card(props: any) {
    return (
        <div className="card-wrapper">
            <div className="card-body">
                <img src={props.image.medium} alt={props.name} height='250px' width='auto' />
            </div>
            <div className="card-footer">
                <h5 className="title">{props.name}</h5>
                {props.genres.map((el: string, i: number) => {
                    return <span style={{marginLeft: '5px'}} key={i} className="genre">{el}</span>
                })}
            </div>
        </div>
    )
}

export default Card;