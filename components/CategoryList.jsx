import Link from 'next/link';

const CategoryList = ({ categories, categoryName }) => {
  // console.log(categoryName);
  return (
    <div className="w-full p-5 bg-white rounded-lg shadow-md mt-6">
      <h3 className="text-2xl bg-gray-800 text-white p-3 rounded">
        Blog Categories
      </h3>
      <ul className="divide-y divide-gray-300 flex sm:flex-row lg:flex-col">
        {categories.map((category, index) => (
          <Link key={index} href={`/blog/category/${category.toLowerCase()}`}>
            <li
              className={`p-4 cursor-pointer  ${
                category.toLowerCase() === categoryName
                  ? 'bg-gray-300'
                  : 'hover:bg-gray-50'
              }`}
            >
              {category}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
