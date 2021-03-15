import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import favoriteActions from '../store/favorite/favorite.actions';
import { loadComicById } from '../store/comics/comics.actions';
import { searchIfFavorite } from '../utils/favoriteStateUtils';
import ErrorInline from '../components/ErrorInline';
import SectionHeader from '../layout/SectionHeader';
import Price from '../components/Price';
import ErrorHandler from '../components/ErrorHandler';
import LoadingHandler from '../components/LoadingHandler';
import ComicDate from '../components/comics/ComicDate';
import GenericRelatedItems from '../components/GenericRelatedItems';

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [element, setElement] = useState(null);
  const [relatedCharacters, setRelatedCharacters] = useState(null);

  const { favorites, error: actionFavoriteError } = useSelector(
    (state) => state.favorite
  );
  const { items: itemsFromStore, isLoading, error } = useSelector(
    (state) => state.comics
  );
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(searchIfFavorite(favorites, id, 'COMIC'));
  }, [favorites]);

  useEffect(() => {
    dispatch(loadComicById(id));
  }, []);

  useEffect(() => {
    if (id in itemsFromStore) {
      setElement(itemsFromStore[id]);
      setRelatedCharacters(
        itemsFromStore[id].characters.items.map((e) => ({
          title: e.name,
          link: `/characters/${e.resourceURI.split('/characters/')[1]}`,
        }))
      );
    }
  }, [itemsFromStore]);

  function addToFavorite() {
    dispatch(
      favoriteActions.addFavorite({
        id: element.id,
        title: element.title,
        thumbnail: `${element.thumbnail.path}.${element.thumbnail.extension}`,
        type: 'COMIC',
        link: `/comics/${element.id}`,
      })
    );
  }
  function removeFromFavorite() {
    dispatch(favoriteActions.removeFavorite(parseInt(id, 10), 'COMIC'));
  }

  return (
    <>
      <SectionHeader>
        <h3 className="text-2xl font-bold py-2 text-gray-100">Comic Detail</h3>
      </SectionHeader>
      <div className="container mx-auto pb-20 px-2">
        {actionFavoriteError && (
          <ErrorInline
            title={actionFavoriteError.message}
            className="mt-5"
            action={() => dispatch(favoriteActions.removeError())}
          />
        )}
        <ErrorHandler error={error}>
          <LoadingHandler isLoading={isLoading}>
            <>
              {element && (
                <Comic
                  isFavorite={isFavorite}
                  removeFromFavorite={removeFromFavorite}
                  addToFavorite={addToFavorite}
                  relatedCharacters={relatedCharacters}
                  thumbnail={element.thumbnail}
                  title={element.title}
                  pageCount={element.pageCount}
                  issueNumber={element.issueNumber}
                  format={element.format}
                  dates={element.dates}
                  prices={element.prices}
                  description={element.description}
                />
              )}
            </>
          </LoadingHandler>
        </ErrorHandler>
      </div>
    </>
  );
};

function Comic({
  thumbnail,
  title,
  isFavorite,
  removeFromFavorite,
  addToFavorite,
  pageCount,
  issueNumber,
  format,
  dates,
  prices,
  description,
  relatedCharacters,
}) {
  return (
    <div className="flex flex-col items-center mt-4 md:flex-row md:items-start md:justify-center md:mx-auto">
      <img
        src={`${thumbnail.path}.${thumbnail.extension}`}
        className="h-96 object-cover rounded-md shadow-md"
        alt=""
      />

      <div className="my-2 mx-3 md:ml-10 md:w-3/6">
        <h1 className="text-xl uppercase font-bold text-gray-700 my-2">
          {title}
        </h1>

        <div className="text-lg text-gray-700 font-semibold my-2">
          <h3 className="text-red-500 my-2 cursor-pointer">
            <button
              type="button"
              onClick={() => {
                if (isFavorite) {
                  removeFromFavorite();
                } else {
                  addToFavorite();
                }
              }}>
              {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            </button>
          </h3>

          <h3 className="px-2 py-1 bg-red-500 text-white">Details</h3>

          <div className="text-sm grid grid-cols-1 md:grid-cols-2">
            {pageCount ? (
              <h5 className="mb-2">
                {'Pages: '}
                <span className="text-teal-500">{pageCount}</span>
              </h5>
            ) : null}

            {issueNumber && issueNumber !== '' ? (
              <h5 className="mb-2">
                {'Issue number: '}
                <span className="text-green-500">{issueNumber}</span>
              </h5>
            ) : null}

            {format ? (
              <h5 className="mb-2">
                {'Format: '}
                <span className="text-green-500">{format}</span>
              </h5>
            ) : null}

            {dates ? (
              <>
                {dates.map((e) => (
                  <ComicDate
                    type={e.type}
                    date={new Date(e.date)}
                    key={nanoid(5)}
                  />
                ))}
              </>
            ) : null}
          </div>
        </div>

        {prices.length > 0 ? (
          <div className="my-2">
            <h2 className="text-red-500 font-semibold">Price</h2>
            <div className="w-full flex flex-wrap">
              {prices.map(({ type, price }) => (
                <Price type={type} price={price} key={nanoid()} />
              ))}
            </div>
          </div>
        ) : null}

        {description ? (
          <>
            <h3 className="px-2 py-1 bg-red-500 text-white font-semibold">
              Description
            </h3>
            <p>{description}</p>
          </>
        ) : (
          <h2 className="font-semibold text-xl text-red-500">
            No description!
          </h2>
        )}
        <div className="mt-4">
          <GenericRelatedItems
            items={relatedCharacters}
            title="See related characters"
          />
        </div>
      </div>
    </div>
  );
}
