export default function ProductCards({ products, onEdit, onDelete }) {
    return (
        <div className="grid">
            {products.map(p => (
                <div className="card" key={p.id}>
                    <h4>{p.name}</h4>
                    <p>₹ {p.price}</p>
                    <p>{p.category}</p>
                    <p>Stock: {p.stock}</p>

                    <div className="card-actions">
                        <button onClick={() => onEdit(p)}>Edit</button>
                        <button className="danger" onClick={() => onDelete(p.id)}>
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
