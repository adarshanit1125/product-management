export default function Pagination({ total, limit, page, setPage }) {
    const pages = Math.ceil(total / limit);
    if (pages <= 1) return null;

    return (
        <div className="pagination">
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Prev
            </button>
            <span>{page} / {pages}</span>
            <button disabled={page === pages} onClick={() => setPage(page + 1)}>
                Next
            </button>
        </div>
    );
}
