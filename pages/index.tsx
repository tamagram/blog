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
      <ul>{posts && posts.map((post) => <Post key={post.title}{...post} />)}</ul>
    </Layout>
  )
}
export default Blog

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts(['title', 'date'])
  return {
    // title is not real slug
    props: { posts },
  }
}