import React, { useState } from 'react';
import '../components/ColorBox/ColorBox.scss';
import TodoForm from './TodoForm';

function TodoList() {
    const [todos, onToDoClick] = useState(
        [
            { id: 1, title: 'one' },
            { id: 2, title: 'two' },
            { id: 3, title: 'three' },
            { id: 4, title: 'four' }
        ], null
    );

    function handleTodoList(todo) {
        const newTodoList = todos.filter(x => x.id !== todo.id);
        onToDoClick(newTodoList);
    };

    function addTodo(formValue) {
        const newTodos = [...todos];
        const newtodo = {
            id: todos.length + 1,
            ...formValue
        }
        newTodos.push(newtodo);
        onToDoClick(newTodos);
    }

    return (
        <div>
            <TodoForm onSubmit={addTodo} />
            <ul className="todo-list">
                {todos.map(todo => (
                    <li key={todo.id} onClick={() => handleTodoList(todo)}>
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;
