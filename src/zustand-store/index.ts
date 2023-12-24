import { create } from "zustand";
import { api } from "../lib/axios";

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

    load: () => Promise<void>
    play: (payload: { lessonIndex: number, moduleIndex: number }) => void
    playNext: () => void
}

const initialState = {
    course: null,
    currentModuleIndex: 0,
    currentLessonIndex: 0,
    isLoading: true,
} as PlayerState

export const useStore = create<PlayerState>((set, get) => {
    return {
        ...initialState,
        load: async () => {
            set({ isLoading: true })

            const response = await api.get('/courses/1')

            set({
                course: response.data,
                isLoading: false
            })
        },
        play: (payload: { lessonIndex: number, moduleIndex: number }) => {
            const { course } = get()
            if (!course) return
            if (payload.moduleIndex >= course.modules.length) {
                return;
            }
            if (payload.lessonIndex >= course.modules[payload.moduleIndex].lessons.length) {
                return;
            }
            set({
                currentLessonIndex: payload.lessonIndex,
                currentModuleIndex: payload.moduleIndex
            })
           
        },
        playNext: () => {
            const { course, currentLessonIndex, currentModuleIndex } = get()
            if (!course) return
            if (currentLessonIndex + 1 < course.modules[currentModuleIndex].lessons.length) {
                set({
                    currentLessonIndex: currentLessonIndex + 1
                })
            } else if (currentModuleIndex + 1 < course.modules.length) {
                set({
                    currentLessonIndex: 0,
                    currentModuleIndex: currentModuleIndex + 1
                })
            }
        }
    }
})


export const useCurrentLesson = () => {
    return useStore(state => {
        const { currentLessonIndex, currentModuleIndex } = state

        const currentModule = state.course?.modules[currentModuleIndex]
        const currentLesson = currentModule?.lessons[currentLessonIndex]

        return { currentModule, currentLesson }
    })
}