import Head from 'next/head'
import Link from 'next/link'

interface TITLE {
    title: string
}

const Layout: React.FC<TITLE> = ({ children, title = 'Nextjs' }) => {
    return (
        <div className="layout">
            <Head>
                <title>{title}</title>
            </Head>
            <header>
                <nav className="bg-gray-800 w-screen">
                    <div className="flex space-x-4">
                        <ul className="nav-links">
                            <li>
                                <Link href="/">
                                    <a
                                        data-testid="blog-nav"
                                        className="text-gray-300 hover:bg-gray-700 px-3 py-2"
                                    >
                                        Blog
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/project">
                                    <a
                                        data-testid="project-nav"
                                        className="text-gray-300 hover:bg-gray-700 px-3 py-2"
                                    >
                                        Project
                                    </a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/about">
                                    <a
                                        data-testid="about-nav"
                                        className="text-gray-300 hover:bg-gray-700 px-3 py-2"
                                    >
                                        About
                                    </a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
            <main className="flex flex-1 justify-center items-center flex-col w-screen">
                {children}
            </main>
            <footer className="w-full h-12 flex justify-center items-center border-t">
                &copy; tamagram 2021
                <a
                    className="flex items-center"
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div>Powered by</div>
                    <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
                </a>
            </footer>
        </div>
    )
}
export default Layout