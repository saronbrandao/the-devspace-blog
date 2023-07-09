import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import Link from 'next/link';
import Layout from '@/components/Layout';
import CategoryLabel from '@/components/CategoryLabel';
import sanitizeHtml from 'sanitize-html';
import Image from 'next/image';

// Preventing erroneous warnings:
marked.use({
  langPrefix: '',
  mangle: false,
  headerIds: false,
});

const PostPage = ({
  frontmatter: { title, category, date, cover_image, author, author_image },
  content,
  slug,
}) => {
  return (
    <Layout title={title}>
      <div className="w-full px-10 py-6 bg-white rounded-lg shadow-md mt-6">
        <Link
          href="/blog"
          className="inline-block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer"
        >
          Go Back
        </Link>
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-5xl mb-7">{title}</h1>
          <CategoryLabel>{category}</CategoryLabel>
        </div>
        <Image
          src={cover_image}
          alt="Cover Image"
          className="w-full rounded"
          width={500}
          height={400}
        />

        <div className="flex justify-between items-center bg-gray-100 p-2 my-8">
          <div className="flex items-center">
            <Image
              src={author_image}
              alt="Author Image"
              className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
              width={500}
              height={400}
            />
            <h4>{author}</h4>
          </div>
          <div className="mr-4">{date}</div>
        </div>

        <div className="blog-text mt-2">
          <div
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(marked.parse(content)),
            }}
          ></div>
        </div>
        <Link
          href="/blog"
          className="inline-block py-2 px-3 leading-tight bg-white border border-gray-300 text-gray-800 mr-1 hover:bg-gray-200 cursor-pointer"
        >
          Go Back
        </Link>
      </div>
    </Layout>
  );
};

export default PostPage;

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const paths = files.map((filename) => {
    return {
      params: {
        slug: filename.replace('.md', ''),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const markDownWithMetta = fs.readFileSync(
    path.join('posts', slug + '.md'),
    'utf-8'
  );

  const { data: frontmatter, content } = matter(markDownWithMetta);
  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}
