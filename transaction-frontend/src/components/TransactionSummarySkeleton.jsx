import React from "react";

const TransactionSummarySkeleton = () => {
return (
<div className="animate-pulse bg-white rounded-xl p-4 sm:p-6 mb-4">
	<div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
	<div className="h-10 bg-gray-300 rounded w-1/4 mb-4"></div>
	<div className="flex gap-4">
		<div className="h-16 bg-gray-300 rounded w-1/2"></div>
		<div className="h-16 bg-gray-300 rounded w-1/2"></div>
	</div>
</div>
);
};

export default TransactionSummarySkeleton;