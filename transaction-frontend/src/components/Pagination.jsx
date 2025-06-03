function Pagination({ currentPage, totalPages, onPageChange }) {
	const pageNumbers = [];

	const startPage = Math.max(0, currentPage - 2);
	const endPage = Math.min(totalPages - 1, startPage + 4);

	for (let i = startPage; i <= endPage; i++) {
		pageNumbers.push(i);
	}

	return (
		<div className="flex justify-center mt-4 space-x-2">
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 0}
				className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
			>
				&laquo; Prev
			</button>

			{pageNumbers.map((page) => (
				<button
					key={page}
					onClick={() => onPageChange(page)}
					className={`px-3 py-1 rounded ${page === currentPage ? "bg-blue-500 text-white" : "bg-gray-300"
						}`}
				>
					{page + 1}
				</button>
			))}

			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages - 1}
				className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
			>
				Next &raquo;
			</button>
		</div>
	);
}

export default Pagination;