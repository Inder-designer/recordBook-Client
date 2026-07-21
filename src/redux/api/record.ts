import { ApiResponse } from "@/types/ApiResponse";
import { baseApi } from "../baseApi";
import { ADD_MEMBER, CREATE_RECORD, DELETE_RECORD, GET_RECORD, GET_RECORDS, UPDATE_RECORD } from "../routes/routes";
import { IRecord } from "@/types/IRecord";

export const RecordApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecords: builder.query({
            query: () => GET_RECORDS,
            transformResponse: (response: ApiResponse) => response.data,
            providesTags: ['RECORDS']
        }),
        createRecord: builder.mutation({
            query: (data) => ({
                url: CREATE_RECORD,
                method: 'Post',
                body: data
            }),
            transformResponse: (response: ApiResponse) => response.data,
            invalidatesTags: ['RECORDS']
        }),
        updateRecord: builder.mutation({
            query: ({ values, recordId }) => ({
                url: UPDATE_RECORD(recordId),
                method: 'PUT',
                body: values
            }),
            transformResponse: (response: ApiResponse) => response.data,
            async onQueryStarted({ values, recordId }, { dispatch, queryFulfilled }) {
                let recordsPatch;
                let recordPatch;
                try {
                    await queryFulfilled;
                    recordPatch = dispatch(
                        RecordApi.util.updateQueryData("getRecordById", recordId, (draft) => {
                            if (!draft) return;

                            draft.title = values.title
                            draft.description = values.description
                        })
                    );
                    recordsPatch = dispatch(
                        RecordApi.util.updateQueryData("getRecords", {}, (draft) => {
                            const record = draft.find((r: IRecord) => r._id === recordId);

                            if (!record) return;

                            record.title = values.title
                            record.description = values.description
                        })
                    );
                } catch {
                    recordPatch?.undo();
                    recordsPatch?.undo();
                }
            },
        }),
        deleteRecord: builder.mutation({
            query: (recordId) => ({
                url: DELETE_RECORD(recordId),
                method: 'DELETE',
            }),
            invalidatesTags: ['RECORDS']
        }),
        getRecordById: builder.query<IRecord, string>({
            query: (recordId) => GET_RECORD(recordId),
            transformResponse: (response: ApiResponse) => response.data,
            providesTags: ['RECORD']
        }),
        addMember: builder.mutation({
            query: ({ data, recordId }) => ({
                url: ADD_MEMBER(recordId),
                method: 'POST',
                body: data
            }),
            transformResponse: (response: ApiResponse) => response.data,
        })
    })
})

export const { useGetRecordsQuery, useUpdateRecordMutation, useCreateRecordMutation, useDeleteRecordMutation, useGetRecordByIdQuery, useAddMemberMutation } = RecordApi