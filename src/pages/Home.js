import React from 'react'
import SectionCard from "../components/SectionCard";
const sections = [
    {
        src: 'https://images.unsplash.com/photo-1587270613304-4cc9ef012b92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
        link: '/comics',
        title: 'Comics'
    },
    {
        src: 'https://images.unsplash.com/photo-1598888831741-cb535295b013?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        link: '/hey',
        title: 'Stories'
    },
    {
        src: 'https://images.unsplash.com/photo-1514329926535-7f6dbfbfb114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        link: '/hey',
        title: 'Characters'
    }
]



export default () => {
    return (
        <div className="mx-2 grid gap-y-4 py-4">
            {sections.map(section => <SectionCard {...section} />)}
        </div>
    )
}