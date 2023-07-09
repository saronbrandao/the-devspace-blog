import Head from 'next/head';
import Header from './Header';
import Search from './Search';
import Footer from './Footer';

export default function Layout({ title, keywords, description, children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>{title}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Search />
      <main className="container mx-auto sm:my-7">{children}</main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'Welcome to "The DevSpace" Blog',
  keywords: 'development, coding, programming',
  description: 'The best info and news in development',
};
