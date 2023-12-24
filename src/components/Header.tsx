import { useAppSelector } from "../store"
import { useCurrentLesson, useCurrentModule } from "../store/slices/player"

export function Header() {
    const currentModule = useCurrentModule()
    const currentLesson = useCurrentLesson()
    const isCourseLoading = useAppSelector(state => state.player.isLoading)

    return (
        <div className="flex flex-col gap-1 data-[loading=true]:opacity-0" data-loading={isCourseLoading}>
            <h1 className="text-2xl font-bold">{currentLesson?.title || 'Carregando'}</h1>
            <span className="text-sm text-zinc-400">Módulo "{currentModule?.title || 'Carregando'}"</span>
        </div>
    )
}