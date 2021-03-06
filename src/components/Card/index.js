import './style.css';

function Card({ name, color }) {
    return (
        <div className="card">
            <h5 className="card-title">{name}</h5>
            <h6 className="card-subtitle">{color}</h6>
            <div className="card-content" style={{ background: color }}></div>
        </div>
    )
}

export default Card
