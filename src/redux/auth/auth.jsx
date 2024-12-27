
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';
import API_BASE_URL from '../../Utils/Config/Config';

const auth = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({baseUrl: API_BASE_URL}),
  tagTypes: ['auth'],
  endpoints: builder => ({
    login: builder.mutation({
      query: data => {
        return {
          url: `/login`,
          method: 'POST',
          body: data,
        };
      },
    }),
  }),
});

export const {useLoginMutation} = auth;

export default auth;
