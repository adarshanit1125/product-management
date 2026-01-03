import { useEffect, useState } from "react";

export default function ProductForm({ products, setProducts, editProduct, setEditProduct }) {
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editProduct) setForm(editProduct);
    }, [editProduct]);

    const validate = () => {
        const e = {};
        if (!form.name) e.name = "Name is required";
        if (!form.price) e.price = "Price is required";
        if (!form.category) e.category = "Category is required";
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!validate()) return;

        if (editProduct) {
            setProducts(products.map(p => p.id === form.id ? form : p));
            setEditProduct(null);
        } else {
            setProducts([...products, { ...form, id: Date.now() }]);
        }

        setForm({ name: "", price: "", category: "", stock: "", description: "" });
        setErrors({});
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input placeholder="Name" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })} />
            {errors.name && <span>{errors.name}</span>}

            <input type="number" placeholder="Price" value={form.price}
                onChange={e => setForm({ ...form, price: e.target.value })} />
            {errors.price && <span>{errors.price}</span>}

            <input placeholder="Category" value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })} />
            {errors.category && <span>{errors.category}</span>}

            <input type="number" placeholder="Stock" value={form.stock}
                onChange={e => setForm({ ...form, stock: e.target.value })} />

            <textarea placeholder="Description"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })} />

            <button type="submit">
                {editProduct ? "Update Product" : "Add Product"}
            </button>
        </form>
    );
}
