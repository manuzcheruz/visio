import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { configure } from '@testing-library/dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../components/home/home';
import { MemoryRouter, Route, Switch } from 'react-router';
import { SearchResponseData } from '../interfaces/searchresponseData';
import Series from '../interfaces/series';

configure({ testIdAttribute: 'id' });

const seriesData: Series[] = [
    {
        "id": 250,
        "name": "Kirby Buckets",
        "status": "Ended",
        "premiered": "2014-10-20",
        "rating": {
            "average": null
        },
        "network": {
            "name": "Disney XD"
        },
        "image": {
            "medium": "https://static.tvmaze.com/uploads/images/medium_portrait/1/4600.jpg",
            "original": "https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg"
        },
        "summary": "<p>The single-camera series that mixes live-action and animation stars Jacob Bertrand as the title character. <b>Kirby Buckets</b> introduces viewers to the vivid imagination of charismatic 13-year-old Kirby Buckets, who dreams of becoming a famous animator like his idol, Mac MacCallister. With his two best friends, Fish and Eli, by his side, Kirby navigates his eccentric town of Forest Hills where the trio usually find themselves trying to get out of a predicament before Kirby's sister, Dawn, and her best friend, Belinda, catch them. Along the way, Kirby is joined by his animated characters, each with their own vibrant personality that only he and viewers can see.</p>",
        "updated": 1617744408,
    },
]

describe('Home page api requests', () => {
    const server = setupServer(
        rest.get('https://api.tvmaze.com/shows?page=1', (req, res, ctx) => {
            return res(ctx.json(seriesData));
        }),
    )

    beforeAll(() => server.listen())
    afterEach(() => server.resetHandlers())
    afterAll(() => server.close())
    
    test('should load series on mount', async () => {
        render(<MemoryRouter><Home /></MemoryRouter>); // connect with store first

        await waitFor(() => screen.getByText(/Watch now/i));
        expect(screen.getByTestId('image')).toHaveAttribute('src', 'https://static.tvmaze.com/uploads/images/original_untouched/1/4600.jpg');
    });
})