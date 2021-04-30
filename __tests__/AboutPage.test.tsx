import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { getPage } from 'next-page-tester'


describe('AboutPage', () => {
    it('Display about.', async () => {
        const { page } = await getPage({
            route: '/about',
        })
        render(page)
        expect(await screen.findByText('about')).toBeInTheDocument()
    })
})
