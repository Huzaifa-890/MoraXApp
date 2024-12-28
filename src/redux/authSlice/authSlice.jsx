import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import API_BASE_URL from '../../Utils/Config/Config';

const authSlice = createApi({
  reducerPath: 'authSlice',
  baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
  endpoints: builder => ({
    login: builder.mutation({
      query: data => {
        return {
          url: '/login',
          method: 'POST',
          body: data,
        };
      },
    }),
    signup: builder.mutation({
      query: data => {
        return {
          url: '/register',
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {useLoginMutation, useSignupMutation} = authSlice;

export default authSlice;
