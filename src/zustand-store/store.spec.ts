import { beforeEach, describe, expect, it } from "vitest";
import { PlayerState, useStore } from '.'

const course = {
    id: 1,
    modules: [
        {
            id: 1,
            title: 'Iniciando com React',
            lessons: [
                { id: 'Jai8w6K_GnY', title: 'CSS Modules', duration: '13:45' },
                { id: 'w-DW4DhDfcw', title: 'Estilização do Post', duration: '10:05' },
            ],
        },
        {
            id: 2,
            title: 'Estrutura da aplicação',
            lessons: [
                { id: 'gE48FQXRZ_o', title: 'Componente: Comment', duration: '13:45' },
                { id: 'Ng_Vk4tBl0g', title: 'Responsividade', duration: '10:05' },
            ],
        },
    ],
} 

const inititalState = useStore.getState()    

describe('zustand store', () => {
    beforeEach(() => {
        useStore.setState(inititalState)
    })
    it('should be able to play', () => {
        useStore.setState({ course })
        const { play } = useStore.getState()

        play({ lessonIndex: 1, moduleIndex: 1})

        const { currentModuleIndex, currentLessonIndex } = useStore.getState()

        expect(currentModuleIndex).toEqual(1)
        expect(currentLessonIndex).toEqual(1)
    })

    it('should not be able to play a lesson that does not exist', () => {
        const { play } = useStore.getState()

        play({
            lessonIndex: 2,
            moduleIndex: 0
        })

        const { currentModuleIndex, currentLessonIndex } = useStore.getState()

        expect(currentModuleIndex).toEqual(0)
        expect(currentLessonIndex).toEqual(0)
    })

    it('should not be able to play a lesson in a module that does not exist', () => {
        const { play } = useStore.getState()

        play({
            lessonIndex: 0,
            moduleIndex: 2
        })

        const { currentModuleIndex, currentLessonIndex } = useStore.getState()

        expect(currentModuleIndex).toEqual(0)
        expect(currentLessonIndex).toEqual(0)
    })

    it('should be able to play next video automatically', () => {
        useStore.setState({ course })
        const { playNext } = useStore.getState()

        playNext()

        const { currentModuleIndex, currentLessonIndex } = useStore.getState()

        expect(currentModuleIndex).toEqual(0)
        expect(currentLessonIndex).toEqual(1)
    })

    it('should be able to jump to the next module automatically', () => {
        useStore.setState({ course })
        const { playNext } = useStore.getState()

        useStore.setState({
            currentLessonIndex: 1
        })

        playNext()

        const { currentModuleIndex, currentLessonIndex } = useStore.getState()

        expect(currentModuleIndex).toEqual(1)
        expect(currentLessonIndex).toEqual(0)
    })

    it('should not be able to play next video if there is no next video', () => {
        useStore.setState({ course })
        const { playNext } = useStore.getState()

        useStore.setState({
            currentLessonIndex: 1,
            currentModuleIndex: 1
        })

        playNext()

        const { currentModuleIndex, currentLessonIndex } = useStore.getState()

        expect(currentModuleIndex).toEqual(1)
        expect(currentLessonIndex).toEqual(1)
    })
})