import TodoListItem from '@/app/ui/todo-list-item/todo-list-item';

function Todos() {
    return(
        <div className="container" role='container'>
            <h1>Todoist</h1>
            <ul>
                <TodoListItem title='buy milk'/>
            </ul>
        </div>
    );
}

export default Todos;