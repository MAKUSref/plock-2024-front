import { WordCloud } from "@/types/WordCloud";
import { baseApi } from "./baseApi";

export const wordCloudApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getWordClouds: builder.query<WordCloud[], { courseId: string }>({
      query: ({ courseId }) => `/activities/wordcloud/course/${courseId}`,
      providesTags: ["course", "wordCloud"],
    }),
    getWordCloudById: builder.query<WordCloud, string>({
      query: (id) => `/activities/wordcloud/${id}`,
      providesTags: ["wordCloud"],
    }),
    addWordCloud: builder.mutation<
      WordCloud,
      { courseId: string; wordCloud: Pick<WordCloud, "question"> }
    >({
      query: ({ courseId, wordCloud }) => ({
        method: "POST",
        url: `/activities/wordcloud/${courseId}`,
        body: wordCloud,
      }),
      invalidatesTags: ["wordCloud"],
    }),
    addWordToWordCloud: builder.mutation<
      void,
      { word: string; wordCloudId: string }
    >({
      query: ({ word, wordCloudId }) => ({
        method: "POST",
        url: `/activities/wordcloud/addword/${wordCloudId}`,
        body: { word },
      }),
      invalidatesTags: ["wordCloud"],
    }),
  }),
});

export const {
  useGetWordCloudsQuery,
  useAddWordToWordCloudMutation,
  useGetWordCloudByIdQuery,
  useAddWordCloudMutation,
} = wordCloudApi;
