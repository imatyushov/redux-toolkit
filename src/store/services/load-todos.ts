import { getId } from '../utils/getId';

export function loadTodosFunc() {
    const todos = [
        { id: getId(), title: "Cook dinner", done: false },
        { id: getId(), title: "Work", done: false },
        { id: getId(), title: "Buy bread", done: false },
        { id: getId(), title: "Do something", done: false },
    ]

    return new Promise<typeof todos>((resolve) => {
        setTimeout(() => {
            resolve(todos);
        }, 1_500);
    })
}