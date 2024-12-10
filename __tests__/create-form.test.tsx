import {act, fireEvent, render, screen, waitFor} from '@testing-library/react';
import {addTodo} from '@/app/lib/data';
import {redirect} from 'next/navigation';
import CreateForm from '@/app/ui/create-form/create-form';

jest.mock('@/app/lib/data', () => ({
    addTodo: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    redirect: jest.fn(),
}));

describe('CreateForm component', () => {
    it('should render the form', () => {
        render(<CreateForm/>);

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();

        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('should handle form submission', async () => {
        render(<CreateForm/>);

        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button');

        act(() => {
            fireEvent.change(input, {target: {value: 'Go for a walk'}});

            fireEvent.click(button);
        });

        await waitFor(() => {
            expect(addTodo).toHaveBeenCalledWith('Go for a walk');

            expect(redirect).toHaveBeenCalledWith('/');
        });
    });

    it('should display an error if the title was empty and user tried to submit', async () => {
        render(<CreateForm/>);

        const button = screen.getByRole('button');

        act(() => {
            fireEvent.click(button);
        });

        await waitFor(() => {
            expect(screen.getByText('Title field cannot be empty!')).toBeInTheDocument();
        });
    });

    it('should clear error if input is not empty', async () => {
        render(<CreateForm/>);

        const input = screen.getByRole('textbox');

        fireEvent.click(screen.getByRole('button'));

        await waitFor(() => {
            expect(screen.getByText('Title field cannot be empty!')).toBeInTheDocument();

            fireEvent.change(input, {target: {value: 'Todo'}});

            expect(screen.queryByText('Title field cannot be empty!')).not.toBeInTheDocument();
        });
    });

    it('should match snapshot', () => {
        const {asFragment} = render(<CreateForm/>);

        expect(asFragment).toMatchSnapshot();
    });
});
