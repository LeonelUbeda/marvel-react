import React from 'react'


export default ({
    title,
    titleClassName = 'text-center bg-red-500 font-bold text-white py-4 rounded-md',
    subTitle,
    subTitleClassName = 'text-center font-bold text-blue-500 py-2 text-xl',
    containerClassName = 'mt-5 px-10',
}) => {
    return (
        <div className={containerClassName}>
            <h1 className={titleClassName}>{title}</h1>
            {/* TODO: Refactor this */}
            {subTitle ?
                <h3 className={subTitleClassName}>{subTitle}</h3>
            : null}

        </div>
    )
}