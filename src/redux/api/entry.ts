import { ApiResponse } from "@/types/ApiResponse";
import { baseApi } from "../baseApi";
import { CREATE_ENTRY, DELETE_ENTRY, GET_ENTRIES } from "../routes/routes";
import { IEntry } from "@/types/IEntry";
import { RecordApi } from "./record";
import { IRecord } from "@/types/IRecord";
import { updateSummary } from "@/utils/common";

export const EntryApi = baseApi.injectEndpoints({
    endpoints: (builder) => {
        return {
            getEntries: builder.query<IEntry[], string>({
                query: (recordId) => GET_ENTRIES(recordId),
                transformResponse: (response: ApiResponse) => response.data,
                providesTags: ['Entry']
            }),
            createEntry: builder.mutation({
                query: ({ data, recordId }) => ({
                    url: CREATE_ENTRY(recordId),
                    method: 'Post',
                    body: data
                }),
                transformResponse: (response: ApiResponse) => response.data,
                async onQueryStarted({ recordId }, { dispatch, queryFulfilled }) {
                    let entriesPatch;
                    let recordsPatch;
                    try {
                        await queryFulfilled;
                        const { data: entry } = await queryFulfilled;
                        entriesPatch = dispatch(
                            EntryApi.util.updateQueryData(
                                "getEntries",
                                recordId,
                                (draft) => {
                                    draft.unshift(entry);
                                }
                            )
                        );
                        recordsPatch = dispatch(
                            RecordApi.util.updateQueryData("getRecords", {}, (draft) => {
                                const record = draft.find((r: IRecord) => r._id === recordId);

                                if (!record) return;

                                updateSummary(record.summary, entry, 1);
                            })
                        );
                    } catch {
                        entriesPatch?.undo();
                        recordsPatch?.undo();
                    }
                },
            }),
            deleteEntry: builder.mutation({
                query: ({ recordId, entryId }) => ({
                    url: DELETE_ENTRY(recordId, entryId),
                    method: 'DELETE',
                }),
                async onQueryStarted({ recordId, entryId }, { dispatch, queryFulfilled, getState }) {
                    let entriesPatch;
                    let recordsPatch;
                    try {
                        await queryFulfilled;
                        const entries = EntryApi.endpoints.getEntries.select(recordId)(
                            getState()
                        ).data;

                        const deletedEntry = entries?.find(
                            (entry) => entry._id === entryId
                        );

                        if (!deletedEntry) {
                            await queryFulfilled;
                            return;
                        }
                        entriesPatch = dispatch(
                            EntryApi.util.updateQueryData(
                                "getEntries",
                                recordId,
                                (draft) => {
                                    const index = draft.findIndex(
                                        (entry: IEntry) => entry._id === entryId
                                    );

                                    if (index !== -1) {
                                        draft.splice(index, 1);
                                    }
                                }
                            )
                        );

                        recordsPatch = dispatch(
                            RecordApi.util.updateQueryData(
                                "getRecords",
                                {},
                                (draft) => {
                                    const record = draft.find(
                                        (r: IRecord) => r._id === recordId
                                    );

                                    if (!record) return;

                                    updateSummary(record.summary, deletedEntry, -1);
                                }
                            )
                        );

                    } catch {
                        entriesPatch?.undo();
                        recordsPatch?.undo();
                    }
                },
            }),
        };
    }
})

export const { useGetEntriesQuery, useCreateEntryMutation, useDeleteEntryMutation } = EntryApi