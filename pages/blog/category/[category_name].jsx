import Layout from '@/components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Post from '@/components/Post';
import getPosts from '@/lib/posts';
import CategoryList from '@/components/CategoryList';

export default function CategoryBlogPage({ posts, categoryName, categories }) {
  return (
    <Layout>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-3/4 mr-10">
          <h1 className="text-5xl border-b-4 p-5 font-bold">
            Posts in {categoryName}
          </h1>
          <div className="grid lg:grid-cols-2 gap-5">
            {posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </div>
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

  const categories = files.map((filename) => {
    const markDownWithMeta = fs.readFileSync(
      path.join('posts', filename),
      'utf-8'
    );
    const { data: frontmatter } = matter(markDownWithMeta);
    return frontmatter.category.toLowerCase();
  });

  const paths = categories.map((category) => ({
    params: { category_name: category },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { category_name } }) {
  // filtering post by category
  const categoryPosts = getPosts().filter(
    (post) => post.frontmatter.category.toLowerCase() === category_name
  );

  const posts = getPosts();
  const categories = posts.map((post) => post.frontmatter.category);

  const uniqueCategories = [...new Set(categories)];

  return {
    props: {
      posts: categoryPosts,
      categoryName: category_name,
      categories: uniqueCategories,
    },
  };
}
