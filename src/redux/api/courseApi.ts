import { baseApi } from "./baseApi";
import { Course } from "@/types/course";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<Course[], void>({
      query: () => "/course",
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/course/${id}`,
    }),
  }),
});

export const { useGetCoursesQuery, useGetCourseQuery } = courseApi;
