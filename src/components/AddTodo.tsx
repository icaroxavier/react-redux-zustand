import { useState } from "react"
import { useDispatch } from "react-redux"
import { add } from "../store"

export function AddTodo() {
    const [todoName, setTodoName] = useState('')
    const dispatch = useDispatch()

    function onFormSubmit(event: React.FormEvent) {
        event.preventDefault()
        dispatch(add(todoName))
        setTodoName('')
    }

    return (
        <form onSubmit={onFormSubmit}>
            <input type="text" value={todoName} onChange={e => setTodoName(e.target.value)}/>
            <button type="submit">Add</button>
        </form>
    )
}