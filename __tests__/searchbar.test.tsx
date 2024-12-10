import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import React from 'react';
import Searchbar from '@/app/ui/searchbar/searchbar';

jest.mock('next/navigation', () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
    useSearchParams: jest.fn(),
}));

jest.mock('@/app/ui/fonts', () => ({
    poppins: {className: 'mock-poppins-font'},
}));

describe('Searchbar component', () => {
    const mockReplace = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        (useRouter as jest.Mock).mockReturnValue({replace: mockReplace});
        (usePathname as jest.Mock).mockReturnValue('/todos');
        (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('?query=existing'));
    });

    it('should render the search input and button', () => {
        render(<Searchbar/>);

        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button');

        expect(input).toBeInTheDocument();
        expect(input).toHaveClass('mock-poppins-font');
        expect(button).toBeInTheDocument();
    });

    it('should update the query parameter if input changes', async () => {
        render(<Searchbar/>);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: 'mock filter text'}});

        await waitFor(() => {
            expect(mockReplace).toHaveBeenCalledWith('/todos?query=mock+filter+text');
        });
    });

    it('should remove the query parameter if the input becomes empty', async () => {
        render(<Searchbar/>);

        const input = screen.getByRole('textbox');
        fireEvent.change(input, {target: {value: ''}});

        await waitFor(() => {
            expect(mockReplace).toHaveBeenCalledWith('/todos');
        });
    });

    it('should navigate to /todos/create if the button was clicked', () => {
        render(<Searchbar/>);

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', '/todos/create');
    });

    it('should match snapshot', () => {
        const {asFragment} = render(<Searchbar/>);
        expect(asFragment()).toMatchSnapshot();
    });
});
