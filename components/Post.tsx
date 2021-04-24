import Link from 'next/link'
import { POST } from '../types/Types'

const Post: React.FC<POST> = ({ title, date }) => {
    return (
        <div>
            <span>{date}</span>
            {' : '}
            <Link href={`/posts/${title}`}>
                <a className="cursor-pointer border-b border-gray-500 hober:bg-gray-300">
                    {title}
                </a>
            </Link>
        </div>
    )
}
export default Post