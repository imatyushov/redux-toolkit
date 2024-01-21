import React, { useState, useEffect } from "react";
import {
  loadTodosThunk,
  useAppDispatch,
  useStateSelector,
  todoActions,
  useActionCreators
} from './store';

export function App() {
  const status = useStateSelector((state) => state.todo.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadTodosThunk())
  }, []);

  function renderList() {
    if (status === 'init' || status === 'loading') {
      return 'Loading...';
    }
    if (status === 'error') return 'Error happened';
    
    return <TodoListItems/>
  }

  return (
   <>
   <AddTodoForm/>
   {renderList()}
   </>
  )
}


function AddTodoForm() {
  const [title, setTitle] = useState('');
  const dispatch = useAppDispatch();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!title) {
      return;
    }

    dispatch(todoActions.addTodo({title}));
    setTitle('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="text" 
      value={title}
      onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}

function TodoListItems() {
  const items = useStateSelector((state) => state.todo.items);

  const actions = useActionCreators(todoActions);

  function handleDoneChange(itemId: number) {
    //dispatch(todoActions.toggleTodoDone({id: itemId}))
    actions.toggleTodoDone({id: itemId});
  }

  function handleDeleteTodo(itemId: number) {
    //dispatch(todoActions.deleteTodo({id: itemId}))
    actions.deleteTodo({id: itemId});
  }

  return (
    <div>
      {items.map((item) => {
        return (
          <div
          key={item.id}
          style={item.done ? {textDecoration: 'line-through'} : undefined}
          >
            <input 
            type="checkbox"
            checked={item.done}
            onChange={() => handleDoneChange(item.id)}
             />
             {item.title}
             <button
             onClick={() => handleDeleteTodo(item.id)}
             style={{ outline: "none", marginLeft: 6}}
             >
              X
              </button>
          </div>
        );
      })};
    </div>
  )
}