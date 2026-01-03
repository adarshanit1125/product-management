export default function ProductTable({ products, onEdit, onDelete }) {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {products.map(p => (
                    <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>₹ {p.price}</td>
                        <td>{p.category}</td>
                        <td>{p.stock}</td>
                        <td>
                            <button onClick={() => onEdit(p)}>Edit</button>
                            <button
                                className="danger"
                                onClick={() => onDelete(p.id)}
                            >
                                Delete
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
