import Link from 'next/link'
import { POST } from '../types/Types'

const Post: React.FC<POST> = ({ title, date }) => {
    return (
        <Link href={`/posts/${title}`}>
            <div className="article-card">
                <div className="card-title">{title}</div>
                <div className="card-tags">
                    <div className="card-tag">{date}</div>
                </div>
                {/* <img
                    className="card-image"
                    src="https://raw.githubusercontent.com/tamagram/blog/master/src/articles/2021-4-1_%E4%B8%80%E5%B9%B4%E9%96%93%E3%82%92%E6%8C%AF%E3%82%8A%E8%BF%94%E3%82%8B/img/cardImage.png"
                /> */}
            </div>
        </Link>
        // <div>
        //     <span>{date}</span>
        //     {' : '}
        //     <Link href={`/posts/${title}`}>
        //         <a className="cursor-pointer border-b border-gray-500 hober:bg-gray-300">
        //             {title}
        //         </a>
        //     </Link>
        // </div>
    )
}
export default Post