import Layout from '../../components/Layout'
import { getAllPostsSlug, getPostData } from '../../lib/api'
import { POST } from '../../types/Types'
import { GetStaticProps, GetStaticPaths } from 'next'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'

const PostDetail: React.FC<POST> = ({ title, tags, content }) => {
    return (
        <Layout title={title}>
            <div className='post'>
                <h1>{title}</h1>
                <div className="tags">
                    {tags && tags.map((tag) => (<li key={'tag-' + tag}
                        className="card-tag"
                    >
                        {tag}
                    </li>))}
                </div>
                <div className='markdown-body'>
                    <ReactMarkdown remarkPlugins={[gfm]}>{content}</ReactMarkdown>
                </div>
            </div>
        </Layout>
    )
}

export default PostDetail

// [title].tsx -> title1.tsx,title2.tsx
export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await getAllPostsSlug()
    return {
        paths,
        fallback: false,
    }
}

// 1ページづつ作成
export const getStaticProps: GetStaticProps = async (ctx) => {
    const post = getPostData(ctx.params.slug as string)
    return {
        props: {
            ...post,
        },
    }
}