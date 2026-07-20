import { ApiResponse } from "@/types/ApiResponse";
import { baseApi } from "../baseApi";
import { ADD_MEMBER, CREATE_RECORD, DELETE_RECORD, GET_RECORD, GET_RECORDS } from "../routes/routes";
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

export const { useGetRecordsQuery, useCreateRecordMutation, useDeleteRecordMutation, useGetRecordByIdQuery, useAddMemberMutation } = RecordApi