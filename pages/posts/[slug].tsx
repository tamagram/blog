import Link from 'next/link'
import Layout from '../../components/Layout'
import { getAllPosts, getAllPostsSlug, getPostData } from '../../lib/api'
import { POST } from '../../types/Types'
import { GetStaticProps, GetStaticPaths } from 'next'
import { markdownToHtml } from '../../lib/markdown'

const PostDetail: React.FC<POST> = ({ title, tags, htmlcontent }) => {
    return (
        <Layout title={title}>
            <div className="flex">
                {tags && tags.map((tag) => (<button key={'tag-' + tag}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-5"
                >
                    {tag}
                </button>))}
            </div>
            <div dangerouslySetInnerHTML={{__html: htmlcontent}} />
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
    const htmlcontent = await markdownToHtml(post.content)
    return {
        props: {
            ...post,
            htmlcontent
        },
    }
}