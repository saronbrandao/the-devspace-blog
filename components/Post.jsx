import Link from 'next/link';
import Image from 'next/image';
import CategoryLabel from './CategoryLabel';

const Post = ({ post, compact, hideSearchResults }) => {
  return (
    <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6 flex flex-col justify-between">
      <div className="flex flex-col">
        {!compact && (
          <Image
            src={post.frontmatter.cover_image}
            alt="Cover Image"
            height={420}
            width={600}
            className="mb-4 rounded"
          />
        )}

        <div className="flex justify-between items-center">
          <span className="font-light text-gray-600">
            {post.frontmatter.date}
          </span>
          <CategoryLabel>{post.frontmatter.category}</CategoryLabel>
        </div>

        <div className="mt-2">
          <Link
            href={`/blog/${post.slug}`}
            className="text-2xl text-gray-700 fnt-bold hover:underline"
            onClick={hideSearchResults}
          >
            {post.frontmatter.title}
          </Link>
          <p className="mt-2 text-gray-600">{post.frontmatter.excerpt}</p>
        </div>
      </div>

      {!compact && (
        <div className="flex justify-between items-center ">
          <Link
            href={`/blog/${post.slug}`}
            className="text-gray-900 hover:text-blue-600"
          >
            Read More
          </Link>
          <div className="flex items-center">
            <Image
              src={post.frontmatter.author_image}
              alt="Author Image"
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              height={100}
              width={100}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
