import Layout from '@/components/Layout';
import Image from 'next/image';

const About = () => {
  return (
    <Layout title="About DevSpace">
      <h1 className="ml-10 md:ml-4 text-5xl border-b-4 pb-5 font-bold">
        About
      </h1>
      <div className="bg-white shadow-md rounded-lg px-10 py-6 mt-6">
        <div className="flex flex-col gap-10 items-center md:flex-row ">
          <Image
            src="/images/avatar.webp"
            alt="Author Image"
            className="h-40 w-40 object-cover rounded-full sm:block"
            height={200}
            width={200}
          />
          <div>
            <h3 className="text-2xl mb-5">The DevSpace Blog</h3>
            <p className="mb-3">
              My name is Saron Brandao, and I&apos;m a web developer located in
              Berlin, Germany. I have created this blog as a part of my
              portfolio to exhibit my skills and expertise in web development.
              While the content on this blog is entirely fictional, it reflects
              the type of work I am capable of producing. From clean and
              minimalist designs to implementing efficient coding practices,
              this blog serves as a testament to my enthusiasm for crafting
              engaging and user-friendly websites. For additional details about
              my work, please visit my website:{' '}
              <span>
                <a href="https://www.sarondev.com" target="_blank">
                  www.sarondev.com
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
