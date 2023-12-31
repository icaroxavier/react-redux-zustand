import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { api } from "../../lib/axios";

type Course = {
  id: number
  modules: Array<{
    id: number
    title: string
    lessons: Array<{
      id: string
      title: string
      duration: string
    }>
  }>
}

export type PlayerState = {
  currentModuleIndex: number
  currentLessonIndex: number
  course: Course | null
  isLoading: boolean
}

const initialState = {
  course: null,
  currentModuleIndex: 0,
  currentLessonIndex: 0,
  isLoading: true,
} as PlayerState

export const loadCourse = createAsyncThunk(
  'player/load',
  async () => {
    const response = await api.get('/courses/1')
    return response.data
  }
)

export const playerSlice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers: {
        play: (state, action: PayloadAction<{ lessonIndex: number, moduleIndex: number }>) => {
            if (!state.course) return
            if (action.payload.moduleIndex >= state.course.modules.length) {
                return;
            }
            if (action.payload.lessonIndex >= state.course.modules[action.payload.moduleIndex].lessons.length) {
                return;
            }
            state.currentLessonIndex = action.payload.lessonIndex;
            state.currentModuleIndex = action.payload.moduleIndex;
        },
        playNext: (state) => {
            if (!state.course) return
            if (state.currentLessonIndex + 1 < state.course.modules[state.currentModuleIndex].lessons.length) {
                state.currentLessonIndex++;
            } else if (state.currentModuleIndex + 1 < state.course.modules.length) {
                state.currentModuleIndex++;
                state.currentLessonIndex = 0;
            }
        }
    },
    extraReducers(builder) {
      builder.addCase(loadCourse.fulfilled, (state, action) => {
        state.course = action.payload
        state.isLoading = false
      })
      builder.addCase(loadCourse.pending, (state) => {
        state.isLoading = true
      })
    }
})


export const playerReducer = playerSlice.reducer;
export const playerActions = playerSlice.actions;

export const useCurrentIndexes = () => useAppSelector(state => ({
  currentModuleIndex: state.player.currentModuleIndex,
  currentLessonIndex: state.player.currentLessonIndex
}))
export const useCurrentModule = () => useAppSelector(state => state.player.course?.modules[state.player.currentModuleIndex])
export const useCurrentLesson = () => useAppSelector(state => state.player.course?.modules[state.player.currentModuleIndex].lessons[state.player.currentLessonIndex])
