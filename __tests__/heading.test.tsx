import {fireEvent, render, screen} from '@testing-library/react';
import {Theme, ThemeContext} from '@/context/Theme.context';
import Heading from '@/app/ui/heading/heading';

describe('Heading component', () => {
    it('should renders the heading', () => {
        render(
            <ThemeContext.Provider value={{ toggleTheme: jest.fn(), theme: Theme.LIGHT }}>
                <Heading />
            </ThemeContext.Provider>
        );

        expect(screen.getByText('Todoist')).toBeInTheDocument();

        expect(screen.getByAltText('todoist logo')).toBeInTheDocument();
        expect(screen.getByAltText('sun icon')).toBeInTheDocument();
        expect(screen.getByAltText('moon icon')).toBeInTheDocument();
    });

    it('should call .toggleTheme if the button was clicked', () => {
        const mockToggleTheme = jest.fn();

        render(
            <ThemeContext.Provider value={{ toggleTheme: mockToggleTheme, theme: Theme.LIGHT }}>
                <Heading />
            </ThemeContext.Provider>
        );

        const button = screen.getByRole('button');
        fireEvent.click(button);

        expect(mockToggleTheme).toHaveBeenCalled();
    });

    it('should match snapshot', () => {
        const {asFragment} = render(
            <ThemeContext.Provider value={{ toggleTheme: jest.fn(), theme: Theme.LIGHT }}>
                <Heading />
            </ThemeContext.Provider>
        );

        expect(asFragment).toMatchSnapshot();
    });
});
