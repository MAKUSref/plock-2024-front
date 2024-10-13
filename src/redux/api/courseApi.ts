import { baseApi } from "./baseApi";
import { Course } from "@/types/course";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query<
      Course[],
      { searchText?: string; searchTag?: string }
    >({
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
        };
      },
      providesTags: ["course"],
    }),
    getCourse: builder.query<Course, string>({
      query: (id) => `/course/${id}`,
      providesTags: ["course"],
    }),
    signForCourse: builder.mutation<void, string>({
      query: (id) => ({
        method: "POST",
        url: `/course/${id}/sign`,
      }),
      invalidatesTags: ["course"],
    }),
    getMyCourses: builder.query<Course[], void>({
      query: () => "/course/self",
      providesTags: ["course"],
    }),
    amIPresent: builder.query<boolean, string>({
      query: (id) => `/course/self/${id}`,
      providesTags: ["course"],
    }),
    checkMyPresence: builder.mutation<void, { courseId: string }>({
      query: ({ courseId }) => ({
        method: "POST",
        url: `/course/${courseId}/presence`,
      }),
      invalidatesTags: ["course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useSignForCourseMutation,
  useGetMyCoursesQuery,
  useAmIPresentQuery,
  useCheckMyPresenceMutation,
} = courseApi;
