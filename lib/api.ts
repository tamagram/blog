import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { POST } from '../types/Types'

const postsDirectory = join(process.cwd(), '_posts')

export const getPostSlugs = () => {
    return fs.readdirSync(postsDirectory)
}

// slugはファイル名とか fieldsはmetaデータとか内容
export const getPostBySlug = (slug: string, fields: string[] = []): POST => {
    const realSlug = slug.replace(/\.md/, '')
    const fullPath = join(postsDirectory, `${realSlug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    const items = {
        date: "none",
        update: "none",
        title: slug,
        img: 'none',
        tags: ["none"],
        content: 'none',
        htmlcontent: 'none'
    }

    fields.forEach((field) => {
        // 本文
        if (field === 'content') {
            items[field] = content
        }
        // img
        if (field === 'img') {
            if (content.match(/!\[[\w!?/\+\-_~=;.,*&@#$%\(\)\'\[\]]+\]\(https?:\/\/[\w!?/\+\-_~=;.,*&@#$%\(\)\'\[\]]+\)/)) {
                const markdownimg = content.match(/!\[[\w!?/\+\-_~=;.,*&@#$%\(\)\'\[\]]+\]\(https?:\/\/[\w!?/\+\-_~=;.,*&@#$%\(\)\'\[\]]+\)/)[0]
                items[field] = markdownimg.replace(/!\[[\w!?/\+\-_~=;.,*&@#$%\(\)\'\[\]]+\]\(/, '').slice(0, -1)
            }
        }
        // meta date,title
        // 取得したデータにmetaがあればitemへ
        if (data[field]) {
            items[field] = data[field]
        }
    })
    return items
}

// for getStaticPaths
export const getAllPostsSlug = () => {
    return getPostSlugs().map((slug) => {
        return {
            params: {
                slug: slug,
            },
        }
    })
}

export const getAllPosts = (fields: string[] = []) => {
    const slugs = getPostSlugs()
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
    return posts
}

// for [slug].tsx page generating
export const getPostData = (slug: string) => {
    const post = getPostBySlug(slug, ['date', 'update', 'title', 'img', 'tags', 'content'])
    return post
}