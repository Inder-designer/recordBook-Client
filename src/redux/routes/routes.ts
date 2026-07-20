// Auth

export const LOGIN = "/user/login";
export const LOGOUT = "/user/logout";
export const REGISTER = "/user/signup";
export const GET_ME = "/user";
export const FORGOT_PASSWORD = "/user/forgot-password";
export const OTP_VERIFY = "/user/verify-otp";
export const ACCOUNT_VERIFY = "/user/verify-account";
export const RESET_PASSWORD = "/user/reset-password";
export const FIND_USER = "/user/find";

// Records
export const CREATE_RECORD = "/record/create";
export const GET_RECORDS = "/record";
export const GET_RECORD = (id: string) =>
    `/record/${id}`;

export const UPDATE_RECORD = (id: string) =>
    `/record/${id}`;

export const DELETE_RECORD = (id: string) =>
    `/record/${id}`;

// Members
export const ADD_MEMBER = (recordId: string) =>
    `/record/${recordId}/members`;

export const REMOVE_MEMBER = (
    recordId: string,
    memberId: string
) =>
    `/record/${recordId}/members/${memberId}`;

export const UPDATE_MEMBER_ROLE = (
    recordId: string,
    memberId: string
) =>
    `/record/${recordId}/members/${memberId}/role`;

// Entries
export const CREATE_ENTRY = (recordId: string) =>
    `/record/${recordId}/entries`;

export const GET_ENTRIES = (recordId: string) =>
    `/record/${recordId}/entries`;

export const GET_ENTRY = (
    recordId: string,
    entryId: string
) =>
    `/record/${recordId}/entries/${entryId}`;

export const UPDATE_ENTRY = (
    recordId: string,
    entryId: string
) =>
    `/record/${recordId}/entries/${entryId}`;

export const DELETE_ENTRY = (
    recordId: string,
    entryId: string
) =>
    `/record/${recordId}/entries/${entryId}`;