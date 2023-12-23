import ReactPlayer from "react-player";
import { useAppSelector } from "../store";
import { useDispatch } from "react-redux";
import { playerActions } from "../store/slices/player";

export function Video() {
    const dispatch = useDispatch()

    const currentLesson = useAppSelector(state => {
        const { currentModuleIndex, currentLessonIndex } = state.player
        const currentLesson = state.player.course.modules[currentModuleIndex].lessons[currentLessonIndex]

        return currentLesson
    })

    return (
        <div className="w-full bg-zinc-950 aspect-video">
            <ReactPlayer 
                width={'100%'} 
                height={'100%'} 
                controls
                playing
                url={`https://www.youtube.com/watch?v=${currentLesson.id}`}
                onEnded={() => dispatch(playerActions.playNext())}
            />
        </div>
    )
}