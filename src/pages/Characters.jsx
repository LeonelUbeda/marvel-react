import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import ElementCard from '../components/ElementCard';
import Pagination from '../components/Pagination';
import useMarvelFetch from '../hooks/useMarvelFetch';
import { buildCharactersURL } from '../utils/urlBuilders';
import DynamicFilter from '../components/DynamicFilter';
import SectionHeader from '../layout/SectionHeader';
import LoadingAnimation from '../components/LoadingAnimation';
import ErrorMessage from '../components/ErrorMessage';
import GenericMessage from '../components/GenericMessage';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const LIMIT = 20;

const FILTERS = [
  {
    label: 'Order by',
    type: 'select',
    propName: 'orderBy',
    options: [
      { value: null, label: 'Default' },
      { value: 'name', label: 'Name (ascendent)' },
      { value: '-name', label: 'Name (descending)' },
    ],
  },
];

export default () => {
  const query = useQuery();
  const [filters, setFilters] = useState({});
  const [apiURL, setApiURL] = useState('');
  const [selectedPage, setSelectedPage] = useState(
    parseInt(query.get('page'), 10)
  );
  const { isLoading, elements, statusCode, pagesQuantity } = useMarvelFetch(
    apiURL,
    {}
  );
  const [isFilterHidden, setIsFilterHidden] = useState(true);

  function handlePageClick({ selected }) {
    setSelectedPage(selected);
  }

  function toggleIsFilterHidden() {
    setIsFilterHidden(!isFilterHidden);
  }

  function filterChangeHandler(newFilterObject) {
    setFilters(newFilterObject);
  }

  // change apiURL if filters or page changes
  // if apiURL changes, useMarvelFetch will make a request with the new url
  useEffect(() => {
    setApiURL(
      buildCharactersURL({
        ...filters,
        limit: LIMIT,
        offset: LIMIT * selectedPage,
      })
    );
  }, [filters, selectedPage]);

  return (
    <div className="">
      <SectionHeader>
        <h3 className="text-3xl font-bold py-2 text-gray-100">Characters</h3>
        <h3 className="text-xl font-bold py-2 text-gray-100 cursor-pointer">
          <button onClick={toggleIsFilterHidden} type="button">
            Filters
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`w-6 inline transition duration-200 ease-in-out transform ${
                  !isFilterHidden ? 'rotate-180' : null
                }`}
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="18" y1="11" x2="12" y2="5" />
                <line x1="6" y1="11" x2="12" y2="5" />
              </svg>
            </span>
          </button>
        </h3>
      </SectionHeader>

      <div className="container mx-auto px-2">
        <DynamicFilter
          filters={FILTERS}
          filterChangeHandler={filterChangeHandler}
          hidden={isFilterHidden}
        />
      </div>

      <div className="container mx-auto py-5">
        {isLoading ? <LoadingAnimation /> : null}

        {!isLoading && statusCode !== 200 ? (
          <ErrorMessage
            title="Application Error"
            actionLink="/"
            actionTitle="Go home"
          />
        ) : null}

        {elements && !isLoading && statusCode === 200 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-8 px-2">
              {elements.length === 0 ? (
                <GenericMessage
                  title="No elements"
                  subTitle="Try a different search"
                />
              ) : null}

              {elements.map((element) => {
                const extras = [];
                if (element.comics && element.comics.available > 0) {
                  extras.push({
                    className: 'bg-red-500',
                    title: `${element.comics.available} comics`,
                  });
                }
                if (element.stories && element.stories.available > 0) {
                  extras.push({
                    className: 'bg-green-500',
                    title: `${element.stories.available} stories`,
                  });
                }
                if (element.series && element.series.available > 0) {
                  extras.push({
                    className: 'bg-blue-500',
                    title: `${element.series.available} series`,
                  });
                }
                return (
                  <ElementCard
                    key={nanoid()}
                    image={`${element.thumbnail.path}.${element.thumbnail.extension}`}
                    link={`/characters/${element.id}`}
                    title={element.name}
                    extras={extras}
                  />
                );
              })}
            </div>

            {elements.length > 0 ? (
              <div className="container mx-auto pb-20 py-10">
                <Pagination
                  handlePageClick={handlePageClick}
                  pagesQuantity={pagesQuantity}
                  selectedPage={selectedPage}
                />
              </div>
            ) : null}
          </>
        ) : null}
      </div>
    </div>
  );
};
