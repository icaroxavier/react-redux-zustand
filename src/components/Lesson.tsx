import { PlayCircle, Video } from "lucide-react";

type LessonProps = {
    title: string;
    duration: string;
    onPlay: () => void;
    isActive?: boolean;
}

export function Lesson({ title, duration, onPlay, isActive = false }: LessonProps) {
   

    return (
        <button disabled={isActive} className="flex items-center gap-3 text-sm text-zinc-400 data-[active=true]:text-emerald-400 enabled:hover:text-zinc-100" onClick={onPlay} data-active={isActive}>
            {isActive ? <PlayCircle className="w-4 h-4 text-emerald-400"/> : <Video className="w-4 h-4 text-zinc-500"/>}
            <span>{title}</span>
            <span className="ml-auto font-mono text-xs text-zinc-500">{duration}</span>
        </button>
    )
}