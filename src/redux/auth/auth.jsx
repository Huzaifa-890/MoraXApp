import {fetchBaseQuery, createApi} from '@reduxjs/toolkit/query/react';
import API_BASE_URL from '../../Utils/Config/Config';

const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
  tagTypes: ['auth'],
  endpoints: builder => ({
    login: builder.mutation({
      query: data => {
        return {
          url: `/api/global/login`,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {useLoginMutation} = auth;

export default auth;
