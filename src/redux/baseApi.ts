import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ACCOUNT_VERIFY, FIND_USER, FORGOT_PASSWORD, GET_ME, LOGIN, LOGOUT, OTP_VERIFY, REGISTER, RESET_PASSWORD, UPDATE_USER } from './routes/routes';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { BaseQueryApi } from '@reduxjs/toolkit/query/react';
import { ApiResponse, ErrResponse } from '@/types/ApiResponse';
import { clearUser, updateName } from './Slices/AuthSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_LIVE_API_URL,
    credentials: 'include',
    prepareHeaders: (headers) => headers,
});

type ExtraOptions = object;

const baseQueryWithAuth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError,
    ExtraOptions
> = async (
    args: string | FetchArgs,
    api: BaseQueryApi,
    extraOptions: ExtraOptions
) => {
        const result = await baseQuery(args, api, extraOptions);

        // if (result.error && result.error.status === 401) {
        //     window.location.href = "/auth/login";

        // }

        return result;
    };

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithAuth,
    tagTypes: ['Auth', 'USER', "RECORDS", "RECORD", "Entries"],
    endpoints: (builder) => ({
        getMe: builder.query({
            query: () => GET_ME,
            transformResponse: (response: ApiResponse) => response.data,
            providesTags: ['USER']
        }),
        findUser: builder.query({
            query: (email) => `${FIND_USER}?email=${encodeURIComponent(email)}`,
            transformResponse: (response: ApiResponse) => response.data
        }),
        login: builder.mutation({
            query: (data) => ({
                url: LOGIN,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['USER']
        }),
        register: builder.mutation({
            query: (data) => ({
                url: REGISTER,
                method: 'POST',
                body: data
            })
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: UPDATE_USER,
                method: 'PATCH',
                body: data
            }),
            transformResponse: (response: ApiResponse) => response.data,
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                console.log(data);
                
                try {
                    await queryFulfilled;
                    dispatch(updateName(data));
                } catch (error) {
                    console.error("Logout failed: ", error);
                }
            },
        }),
        forgotPassword: builder.mutation({
            query: (data) => ({
                url: FORGOT_PASSWORD,
                method: 'POST',
                body: data
            })
        }),
        otpVerify: builder.mutation({
            query: (data) => ({
                url: OTP_VERIFY,
                method: 'POST',
                body: data
            })
        }),
        verifyAccount: builder.mutation({
            query: (data) => ({
                url: ACCOUNT_VERIFY,
                method: 'POST',
                body: data
            })
        }),
        resetPasword: builder.mutation({
            query: (data) => ({
                url: RESET_PASSWORD,
                method: 'POST',
                body: data
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: LOGOUT,
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Dispatch logout action
                    dispatch(clearUser());
                    // Reset all API cache
                    dispatch(baseApi.util.resetApiState());
                } catch (error) {
                    console.error("Logout failed: ", error);
                }
            },
        })
    })
})

export const { useGetMeQuery, useFindUserQuery, useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateUserMutation, useForgotPasswordMutation, useOtpVerifyMutation, useVerifyAccountMutation, useResetPaswordMutation } = baseApi;