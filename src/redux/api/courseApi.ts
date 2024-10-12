import { baseApi } from "./baseApi";
import { Course } from "@/types/course";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<
      Course[],
      { searchText?: string; searchTag?: string }
    >({
      query: ({ searchTag, searchText } = {}) => {
        return {
          url: `/course`,
          params: {
            tags: searchTag,
            search: searchText,
          },
        };
      },
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/course/${id}`,
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery } = courseApi;
