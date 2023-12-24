import { useCurrentLesson, useStore } from "../zustand-store"

export function Header() {
    const isCourseLoading = useStore(store => store.isLoading)
    const { currentModule, currentLesson } = useCurrentLesson()

    return (
        <div className="flex flex-col gap-1 data-[loading=true]:opacity-0" data-loading={isCourseLoading}>
            <h1 className="text-2xl font-bold">{currentLesson?.title || 'Carregando'}</h1>
            <span className="text-sm text-zinc-400">Módulo "{currentModule?.title || 'Carregando'}"</span>
        </div>
    )
}