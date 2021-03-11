import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getItemsFromStore } from '../utils/store';
import ElementCard from '../components/ElementCard';
import Pagination from '../components/Pagination';
import { setParams } from '../store/comics/comics.actions';
import LoadingHandler from '../components/LoadingHandler';
import ErrorHandler from '../components/ErrorHandler';
import DynamicFilter from '../components/DynamicFilter';
import SectionHeader from '../layout/SectionHeader';
import SimpleArrow from '../components/SimpleArrow';
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
      { value: null, label: 'All' },
      { value: 'issueNumber', label: 'Issue Number (ascendent)' },
      { value: '-issueNumber', label: 'Issue Number (descending)' },
    ],
  },
  {
    label: 'Comic Format',
    type: 'select',
    propName: 'format',
    options: [
      { value: null, label: 'All' },
      { value: 'comic', label: 'Comic' },
      { value: 'magazine', label: 'Magazine' },
      { value: 'trade paperback', label: 'Trade Paperback' },
      { value: 'hardcover', label: 'Hardcover' },
      { value: 'digest', label: 'Digest' },
      { value: 'graphic novel', label: 'Graphic Novel' },
      { value: 'digital comic', label: 'Digital Comic' },
      { value: 'infinite comic', label: 'Infinite Comic' },
    ],
  },
];
const ComicItem = ({ characters, format, thumbnail, id, title }) => {
  const extras = [];
  if (characters && characters.available > 0) {
    extras.push({
      className: 'bg-red-500',
      title: `${characters.available} characters`,
    });
  }
  if (format) {
    extras.push({
      className: 'bg-green-500',
      title: format,
    });
  }
  return (
    <ElementCard
      key={nanoid()}
      image={`${thumbnail.path}.${thumbnail.extension}`}
      link={`/comics/${id}`}
      title={title}
      extras={extras}
    />
  );
};

function getPageFromQuery(value) {
  const temp = parseInt(value, 10);
  if (!Number.isNaN(temp) && temp > 0) {
    return temp;
  }
  return 1;
}

export default () => {
  const query = useQuery();
  const [filters, setFilters] = useState({});
  const dispatch = useDispatch();
  const [isFilterHidden, setIsFilterHidden] = useState(true);
  const [items, setItems] = useState([]);
  const {
    items: itemsFromStore,
    isLoading,
    error,
    currentRequest,
  } = useSelector((state) => state.comics);

  const [selectedPage, setSelectedPage] = useState(
    getPageFromQuery(query.get('page'))
  );

  function handlePageClick({ selected }) {
    setSelectedPage(selected + 1);
  }

  function toggleIsFilterHidden() {
    setIsFilterHidden(!isFilterHidden);
  }

  function filterChangeHandler(newFilterObject) {
    setSelectedPage(1);
    setFilters(newFilterObject);
  }
  useEffect(() => {
    dispatch(setParams({ page: selectedPage, limit: LIMIT, filters }));
  }, [filters, selectedPage]);

  useEffect(() => {
    setItems(getItemsFromStore(itemsFromStore, currentRequest.items));
  }, [currentRequest.items]);

  return (
    <div>
      <SectionHeader>
        <h3 className="text-2xl font-bold py-2 text-gray-100">Comics</h3>
        <h3 className="text-xl font-bold py-2 text-gray-100 cursor-pointer">
          <button type="button" onClick={toggleIsFilterHidden}>
            Filters
            <SimpleArrow isUp={isFilterHidden} />
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
        <ErrorHandler error={error}>
          <LoadingHandler isLoading={isLoading}>
            <>
              <div className="container mx-auto py-5">
                <Pagination
                  handlePageClick={handlePageClick}
                  pagesQuantity={currentRequest.total / LIMIT}
                  selectedPage={selectedPage}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4 gap-y-8 px-2">
                {items.length === 0 ? (
                  <GenericMessage
                    title="No elements"
                    subTitle="Try a different search"
                  />
                ) : (
                  <>
                    {items.map(
                      ({ characters, format, thumbnail, id, title }) => (
                        <ComicItem
                          characters={characters}
                          format={format}
                          thumbnail={thumbnail}
                          id={id}
                          title={title}
                          key={nanoid()}
                        />
                      )
                    )}
                  </>
                )}
              </div>
              <div className="container mx-auto pb-20 py-10">
                <Pagination
                  handlePageClick={handlePageClick}
                  pagesQuantity={currentRequest.total / LIMIT}
                  selectedPage={selectedPage}
                />
              </div>
            </>
          </LoadingHandler>
        </ErrorHandler>
      </div>
    </div>
  );
};
