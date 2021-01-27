import './style.css';

function Card({ name, color }) {
    return (
        <div className="card">
            <h5 className="card-title">{name}</h5>
            <div className="card-content">
                <div className="card-display-color" style={{ background: color }}></div>
                <h6 className="card-subtitle">{color}</h6>
            </div>
        </div>
    )
}

export default Card