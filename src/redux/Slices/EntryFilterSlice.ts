import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEntryFilters } from "@/types/IEntry";

interface EntryFiltersState {
    filters: Record<string, IEntryFilters>;
}

const initialState: EntryFiltersState = {
    filters: {},
};

const entryFiltersSlice = createSlice({
    name: "entryFilters",
    initialState,
    reducers: {
        setFilters(
            state,
            action: PayloadAction<{
                recordId: string;
                filters: Partial<IEntryFilters>;
            }>
        ) {
            const { recordId, filters } = action.payload;

            state.filters[recordId] = {
                page: 1,
                limit: 20,
                ...state.filters[recordId],
                ...filters,
            };
        },

        resetFilters(state, action: PayloadAction<string>) {
            state.filters[action.payload] = {
                page: 1,
                limit: 20,
            };
        },
    },
});

export const { setFilters, resetFilters } = entryFiltersSlice.actions;
export default entryFiltersSlice.reducer;