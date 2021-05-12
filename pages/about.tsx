import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import gfm from 'remark-gfm'
import { GetStaticProps } from 'next'
import { ABOUT } from '../types/Types'
import { getAboutData } from '../lib/api'

const About: React.FC<ABOUT> = ({ content }) => {
  return (
    <Layout title="Blog">
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[gfm]}>{content}</ReactMarkdown>
      </div>
    </Layout>
  )
}
export default About

export const getStaticProps: GetStaticProps = async () => {
  const content = getAboutData()
  return {
    props: {
      content,
    },
  }
}
