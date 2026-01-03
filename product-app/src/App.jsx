import { useEffect, useState } from "react";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import ProductCards from "./components/ProductCards";
import Pagination from "./components/Pagination";

export default function App() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editProduct, setEditProduct] = useState(null);

  const [page, setPage] = useState(1);
  const limit = 5;

  /* Debounce Search */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  /* Filter */
  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  /* Pagination */
  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit);

  /* Delete */
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  return (
    <div className="container">
      <h2>Product Management</h2>

      <ProductForm
        products={products}
        setProducts={setProducts}
        editProduct={editProduct}
        setEditProduct={setEditProduct}
      />

      <div className="controls">
        <input
          placeholder="Search product..."
          value={search}
          onChange={e => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <button onClick={() => setView("table")}>List View</button>
        <button onClick={() => setView("grid")}>Card View</button>
      </div>

      {view === "table" ? (
        <ProductTable
          products={paginated}
          onEdit={setEditProduct}
          onDelete={handleDelete}
        />
      ) : (
        <ProductCards
          products={paginated}
          onEdit={setEditProduct}
          onDelete={handleDelete}
        />
      )}

      <Pagination
        total={filtered.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
