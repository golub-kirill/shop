import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useSearch = (searchQuery) => {
	const items = useSelector((state) => state.items);

	return useMemo(() => {
		return items.filter(
			(item) =>
				// Seaarch by title
				item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				// Search by description
				item.description
					.toLowerCase()
					.includes(searchQuery.toLowerCase()) ||
				// Search by category
				item.category.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [searchQuery, items]);
};
