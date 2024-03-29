import Layout from '@/components/Layout';
import fs from 'fs';
import path from 'path';
import Post from '@/components/Post';
import Pagination from '@/components/Pagination';
import { POSTS_PER_PAGE } from '@/config/index';
import getPosts from '@/lib/posts';
import CategoryList from '@/components/CategoryList';

export default function BlogPage({ posts, numPages, currentPage, categories }) {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="mr-10 w-full lg:w-3/4">
          <h1 className="text-5xl border-b-4 p-5 font-bold">Blog</h1>
          <Pagination currentPage={currentPage} numPages={numPages} />
          <div className="grid lg:grid-cols-2 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
          <Pagination currentPage={currentPage} numPages={numPages} />
        </div>
        <div className="sm:w-full lg:w-1/4 order-first lg:order-last">
          <CategoryList categories={categories} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join('posts'));

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);

  let paths = [];

  for (let i = 1; i <= numPages; i++) {
    paths.push({
      params: { page_index: i.toString() },
    });
  }

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(params) {
  const page = parseInt((params.params && params.params.page_index) || 1);
  const files = fs.readdirSync(path.join('posts'));
  const posts = getPosts();

  const categories = posts.map((post) => post.frontmatter.category);
  const uniqueCategories = [...new Set(categories)];

  const numPages = Math.ceil(files.length / POSTS_PER_PAGE);
  const pageIndex = page - 1;
  const orderedPosts = posts.slice(
    pageIndex * POSTS_PER_PAGE,
    (pageIndex + 1) * POSTS_PER_PAGE
  );

  return {
    props: {
      posts: orderedPosts,
      numPages,
      currentPage: page,
      categories: uniqueCategories,
    },
  };
}
