import React from 'react';

const Footer = () => {
  return (
    <footer class="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
      <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Developed by Saron Brandao. © 2023{' '}
          <a
            href="https://www.sarondev.com/"
            target="_blank"
            class="hover:underline"
          >
            sarondev.com
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
