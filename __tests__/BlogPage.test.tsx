import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { getPage } from 'next-page-tester'


describe('BlogPage', () => {
    it('View a summary of the post.', async () => {
        const { page } = await getPage({
            route: '/',
        })
        render(page)
        expect(await screen.findByText('Blog.md')).toBeInTheDocument()
        expect(screen.getByText('2021-04-30')).toBeInTheDocument()
    })
})
