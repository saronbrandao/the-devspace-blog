import Link from 'next/link';

export default function CategoryLabel({ children }) {
  const colorKey = {
    JavaScript: 'bg-orange-600',
    HTML: 'bg-red-600',
    REACT: 'bg-amber-600',
    CSS: 'bg-lime-600',
  };

  return (
    <Link
      href={`/blog/category/${children.toLowerCase()}`}
      className={`px-2 py-1 ${colorKey[children]} text-gray-100 font-bold rounded`}
    >
      {children}
    </Link>
  );
}
