import Layout from '../../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Link from 'next/link';
import Post from '../../components/Post';
import { sortByDate } from '../../utils';

export default function BlogPage({ posts }) {
  return (
    <Layout>
      <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const files = fs.readdirSync(path.join('posts'));

  const posts = files.map((filename) => {
    const slug = filename.replace('.md', '');

    // going inside 'posts' folder and reading the current file
    const markDownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );

    // getting the front-matter object and renaming the data object that comes inside it
    const { data: frontmatter } = matter(markDownWithMeta);

    // returning an array of objects with the slugs
    // slug = slug
    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
