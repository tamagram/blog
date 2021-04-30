import Layout from '../components/Layout'
import Post from '../components/Post'
import { GetStaticProps } from 'next'
import { getAllPosts } from '../lib/api'
import { POST } from '../types/Types'

interface STATICPROPS {
  posts: POST[]
}

const Blog: React.FC<STATICPROPS> = ({ posts }) => {
  return (
    <Layout title="Blog">
      <div className="container">
        {posts && posts.map((post) => <Post key={post.title}{...post} />)}
      </div>
    </Layout>
  )
}
export default Blog

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts(['title', 'date','img'])
  return {
    // title is not real slug
    props: { posts },
  }
}