import React from 'react';
import { nanoid } from 'nanoid';
import SectionCard from '../components/SectionCard';
import SectionHeader from '../layout/SectionHeader';

const sections = [
  {
    src:
      'https://images.unsplash.com/photo-1587270613304-4cc9ef012b92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
    link: '/comics',
    title: 'Comics',
  },
  {
    src:
      'https://images.unsplash.com/photo-1514329926535-7f6dbfbfb114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    link: '/characters',
    title: 'Characters',
  },
];

export default () => (
  <>
    <SectionHeader>
      <h3 className="text-3xl font-bold py-2 text-gray-100">Home</h3>
    </SectionHeader>
    <div className="grid gap-y-4 grid-cols-1 px-2 py-4 md:grid-cols-2 md:gap-x-4 container mx-auto h-full">
      {sections.map(({ src, link, title }) => (
        <SectionCard image={src} link={link} title={title} />
      ))}
    </div>
  </>
);
