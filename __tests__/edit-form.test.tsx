import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {updateTodo} from '@/app/lib/data';
import {redirect} from 'next/navigation';
import EditForm from '@/app/ui/edit form/edit-form';

jest.mock('@/app/lib/data', () => ({
    updateTodo: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

describe('EditForm component', () => {
    const mockTodo = {
        id: '1',
        title: 'Buy a cake',
        is_completed: false,
    };

    it('should render the form', () => {
        render(<EditForm todo={mockTodo}/>);

        const input = screen.getByDisplayValue(mockTodo.title);
        expect(input).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('should handle form submission', async () => {
        render(<EditForm todo={mockTodo}/>);

        const input = screen.getByDisplayValue(mockTodo.title);
        const button = screen.getByRole('button');

        fireEvent.change(input, {target: {value: 'A new mock title'}});

        fireEvent.click(button);

        await waitFor(() => {
            expect(updateTodo).toHaveBeenCalledWith({...mockTodo, title: 'A new mock title'});

            expect(redirect).toHaveBeenCalledWith('/');
        });
    });

    it('should display error message if title is empty', async () => {
        render(<EditForm todo={mockTodo}/>);

        const input = screen.getByDisplayValue(mockTodo.title);
        const button = screen.getByRole('button');

        act(() => {
            fireEvent.change(input, {target: {value: ''}});

            fireEvent.click(button);
        });

        await waitFor(() => {
            expect(screen.getByText('Title field cannot be empty!')).toBeInTheDocument();
        });
    });

    it('should clear the error if the field is not empty', async () => {
        render(<EditForm todo={mockTodo}/>);

        const input = screen.getByDisplayValue(mockTodo.title);

        act(() => {
            fireEvent.change(input, {target: {value: ''}});
            fireEvent.click(screen.getByRole('button'));
        });

        await waitFor(() => {
            expect(screen.getByText('Title field cannot be empty!')).toBeInTheDocument();

            fireEvent.change(input, {target: {value: 'A new mock todo title'}});

            expect(screen.queryByText('Title field cannot be empty!')).not.toBeInTheDocument();
        });
    });

    it('should match snapshot', () => {
        const {asFragment} = render(<EditForm todo={mockTodo}/>);

        expect(asFragment).toMatchSnapshot();
    });
});
