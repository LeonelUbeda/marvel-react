import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { getItemsFromStore } from '../utils/store';
import { getPageFromQuery } from '../utils/params';
import ElementCard from '../components/ElementCard';
import Pagination from '../components/Pagination';
import { setListingParams } from '../store/characters/characters.actions';
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
      { value: null, label: 'Default' },
      { value: 'name', label: 'Name (ascendent)' },
      { value: '-name', label: 'Name (descending)' },
    ],
  },
];

const CharacterItem = ({ comics, stories, series, thumbnail, id, name }) => {
  const extras = [];
  if (comics && comics.available > 0) {
    extras.push({
      className: 'bg-red-500',
      title: `${comics.available} comics`,
    });
  }
  if (stories && stories.available > 0) {
    extras.push({
      className: 'bg-green-500',
      title: `${stories.available} stories`,
    });
  }
  if (series && series.available > 0) {
    extras.push({
      className: 'bg-blue-500',
      title: `${series.available} series`,
    });
  }
  return (
    <ElementCard
      key={nanoid()}
      image={`${thumbnail.path}.${thumbnail.extension}`}
      link={`/characters/${id}`}
      title={name}
      extras={extras}
    />
  );
};

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
  } = useSelector((state) => state.characters);

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
    dispatch(setListingParams({ page: selectedPage, limit: LIMIT, filters }));
  }, [filters, selectedPage]);

  useEffect(() => {
    setItems(getItemsFromStore(itemsFromStore, currentRequest.items));
  }, [currentRequest.items]);

  return (
    <div>
      <SectionHeader>
        <h3 className="text-2xl font-bold py-2 text-gray-100">Characters</h3>
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
                      ({ comics, stories, series, thumbnail, id, name }) => (
                        <CharacterItem
                          comics={comics}
                          stories={stories}
                          series={series}
                          thumbnail={thumbnail}
                          name={name}
                          id={id}
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
