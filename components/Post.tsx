import Link from 'next/link'
import { POST } from '../types/Types'

const Post: React.FC<POST> = ({ title, date, img }) => {
    return (
        <Link href={`/posts/${title}`}>
            <div className="article-card">
                <div className="card-title">{title}</div>
                <div className="card-tags">
                    <div className="card-tag">{date}</div>
                </div>
                {img != 'none' && <img
                    className="card-image"
                    src={img}
                />}
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