// Simple global search implementation.
// It filters rows by checking whether the search query (state.search)
// appears in one of the searchable fields (customer, seller, date, total).
export function initSearching(searchField) {
    const searchFields = ['customer', 'seller', 'date', 'total'];

    return (data, state, action) => {
        const q = state && state.search ? String(state.search).trim() : '';
        if (!q) return data;

        const term = q.toLowerCase();

        return data.filter(row => {
            for (const key of searchFields) {
                if (!Object.prototype.hasOwnProperty.call(row, key)) continue;
                const val = row[key];
                if (val == null) continue;
                if (String(val).toLowerCase().includes(term)) return true;
            }
            return false;
        });
    }
}