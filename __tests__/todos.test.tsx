import { render, screen, waitFor } from '@testing-library/react';
import { fetchFilteredTodos } from '@/app/lib/data';
import { Todo } from '@/app/lib/definitions';
import Todos from '@/app/ui/todos/todos';

jest.mock('@/app/lib/data', () => ({
    fetchFilteredTodos: jest.fn(),
}));

jest.mock('@/app/ui/todo-list-item/todo-list-item', () => {
    return jest.fn(({ todo, onItemRemoved }) => (
        <li data-testid="todo-item">
            <p>{todo.title}</p>
            <button onClick={() => onItemRemoved(todo.id)}>Remove</button>
        </li>
    ));
});

describe('Todos component', () => {
    const mockData: Todo[] = [
        { id: '1', title: 'Buy milk', is_completed: false },
        { id: '2', title: 'Go for a walk', is_completed: true },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('it should fetch and display todos', async () => {
        (fetchFilteredTodos as jest.Mock).mockResolvedValue(mockData);

        render(<Todos query="test-query" />);

        await waitFor(() => expect(screen.getAllByTestId('todo-item')).toHaveLength(2));

        expect(screen.getByText('Buy milk')).toBeInTheDocument();
        expect(screen.getByText('Go for a walk')).toBeInTheDocument();
        expect(fetchFilteredTodos).toHaveBeenCalledWith('test-query');
    });

    it('should handle todo removing', async () => {
        (fetchFilteredTodos as jest.Mock).mockResolvedValue(mockData);

        render(<Todos query="test-query" />);

        await waitFor(() => expect(screen.getAllByTestId('todo-item')).toHaveLength(2));

        const removeButton = screen.getAllByText('Remove')[0];
        removeButton.click();

        await waitFor(() => expect(screen.getAllByTestId('todo-item')).toHaveLength(1));
        expect(screen.queryByText('Buy milk')).not.toBeInTheDocument();
    });

    it('should match snapshot', async () => {
        (fetchFilteredTodos as jest.Mock).mockResolvedValue(mockData);

        const { asFragment } = render(<Todos query="test-query" />);
        await waitFor(() => expect(screen.getAllByTestId('todo-item')).toHaveLength(2));

        expect(asFragment()).toMatchSnapshot();
    });
});
