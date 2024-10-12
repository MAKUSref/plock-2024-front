import { baseApi } from "./baseApi";
import { Course } from "@/types/course";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], { searchText?: string; searchTag?: string }>({
      query: ({ searchTag, searchText } = {}) => {
        const queryBuilder = [];
        if (searchTag) {
          queryBuilder.push(`tags=${searchTag}`);
        }
        if (searchText) {
          queryBuilder.push(`search=${searchText}`);
        }
        const queryParams = queryBuilder.join("&");

        return {
          url: `/course${queryParams !== "" ? "?" + queryParams : ""}`,
        }
      },
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/course/${id}`,
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery } = courseApi;
