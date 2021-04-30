import '@testing-library/jest-dom/extend-expect'
import { render,screen } from '@testing-library/react'
import { getPage } from 'next-page-tester'


describe('ProjectPage', () => {
    it('Display project.', async () => {
        const { page } = await getPage({
            route: '/project',
        })
        render(page)
        expect(await screen.findByText('project')).toBeInTheDocument()
    })
})
