import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {deleteTodoById, updateTodo} from '@/app/lib/data';
import {useRouter} from 'next/navigation';
import {Todo} from '@/app/lib/definitions';
import TodoListItem from '@/app/ui/todo-list-item/todo-list-item';

jest.mock('@/app/lib/data', () => ({
    deleteTodoById: jest.fn(),
    updateTodo: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}));

describe('TodoListItem component', () => {
    const mockTodo: Todo = {id: '1', title: 'Go for a walk', is_completed: false};
    const mockOnItemRemoved = jest.fn();
    const mockPush = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({push: mockPush});
    });

    it('should render the todo', () => {
        render(<TodoListItem todo={mockTodo} onItemRemoved={mockOnItemRemoved}/>);

        expect(screen.getByText('Go for a walk')).toBeInTheDocument();
        expect(screen.getByAltText('complete')).toBeInTheDocument();
        expect(screen.getByAltText('remove')).toBeInTheDocument();
    });

    it('should update the is_completed of todo and apply the completed class', async () => {
        render(<TodoListItem todo={mockTodo} onItemRemoved={mockOnItemRemoved}/>);

        const completeButton = screen.getByAltText('complete');
        fireEvent.click(completeButton);

        expect(updateTodo).toHaveBeenCalledWith({...mockTodo, is_completed: true});
        expect(screen.getByText('Go for a walk')).toHaveClass('completed');
    });

    it('should remove the todo and call .onItemRemoved()', async () => {
        render(<TodoListItem todo={mockTodo} onItemRemoved={mockOnItemRemoved}/>);

        const removeButton = screen.getByAltText('remove');
        fireEvent.click(removeButton);

        await waitFor(() => {
            expect(deleteTodoById).toHaveBeenCalledWith(mockTodo.id);
            expect(mockOnItemRemoved).toHaveBeenCalledWith(mockTodo.id);
        });
    });

    it('should navigate to edit page after the user clicked on title', () => {
        render(<TodoListItem todo={mockTodo} onItemRemoved={mockOnItemRemoved}/>);

        const title = screen.getByText('Go for a walk');
        fireEvent.click(title);

        expect(mockPush).toHaveBeenCalledWith(`todos/${mockTodo.id}/edit`);
    });

    it('should match snapshot', () => {
        const {asFragment} = render(<TodoListItem todo={mockTodo} onItemRemoved={mockOnItemRemoved}/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
