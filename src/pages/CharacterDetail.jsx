import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import favoriteActions from '../store/favorite/favorite.actions';
import useMarvelFetch from '../hooks/useMarvelFetch';
import { buildCharacterDetail } from '../utils/urlBuilders';
import SectionHeader from '../layout/SectionHeader';
import LoadingAnimation from '../components/LoadingAnimation';
import Price from '../components/Price';
import ErrorMessage from '../components/ErrorMessage';
import ErrorInline from '../components/ErrorInline';
import GenericRelatedItems from '../components/GenericRelatedItems';
import { searchIfFavorite } from '../utils/favoriteStateUtils';

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [element, setElement] = useState(null);
  const characterUrl = buildCharacterDetail(id);
  const { elements, isLoading, statusCode } = useMarvelFetch(characterUrl);
  const [relatedComics, setRelatedComics] = useState(null);
  const { favorites, error: actionFavoriteError } = useSelector(
    (state) => state.favorite
  );
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(searchIfFavorite(favorites, parseInt(id, 10), 'CHARACTER'));
  }, [favorites]);

  function addToFavorite() {
    dispatch(
      favoriteActions.addFavorite({
        id: element.id,
        title: element.name,
        thumbnail: `${element.thumbnail.path}.${element.thumbnail.extension}`,
        type: 'CHARACTER',
        link: `/characters/${element.id}`,
      })
    );
  }

  function removeFromFavorite() {
    dispatch(favoriteActions.removeFavorite(parseInt(id, 10), 'CHARACTER'));
  }

  useEffect(() => {
    if (statusCode === 200) {
      if (!isLoading && elements) {
        const temp = elements[0];
        const { comics } = temp;
        setElement(temp);
        setRelatedComics(
          comics.items.map((e) => ({
            title: e.name,
            link: `/comics/${e.resourceURI.split('/comics/')[1]}`,
          }))
        );
      }
    }
  }, [isLoading, elements]);

  return (
    <>
      <SectionHeader>
        <h3 className="text-2xl font-bold py-2 text-gray-100">Comic Detail</h3>
      </SectionHeader>
      <div className="container mx-auto pb-20">
        {actionFavoriteError && (
          <ErrorInline
            title={actionFavoriteError.message}
            className="mt-5"
            action={() => dispatch(favoriteActions.removeError())}
          />
        )}
        {!isLoading && statusCode !== 200 ? (
          <ErrorMessage
            title={statusCode === 404 ? 'Not Found' : 'Application Error'}
            actionLink="/"
            actionTitle="Go home"
          />
        ) : null}

        {isLoading ? <LoadingAnimation /> : null}

        {element && !isLoading ? (
          <div className="flex flex-col px-1 mt-4 md:flex-row md:items-start md:justify-center md:mx-auto">
            <img
              src={`${element.thumbnail.path}.${element.thumbnail.extension}`}
              className="h-96 object-cover rounded-md shadow-md md:w-3/6"
              alt={`${element.name}`}
            />

            <div className="my-2 mx-3 md:ml-10 md:w-3/6">
              <h1 className="text-xl uppercase font-bold text-gray-700 my-2">
                {element.name}
              </h1>

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

              {element.description ? (
                <>
                  <h3 className="px-2 py-1 bg-red-500 text-white">
                    Description
                  </h3>
                  <p>{element.description}</p>
                </>
              ) : (
                <h2 className="font-semibold text-xl text-red-500">
                  No description!
                </h2>
              )}

              {element.prices && element.prices.length > 0 ? (
                <div className="my-2">
                  <h2 className="text-gray-600 font-semibold">Price</h2>
                  <div className="w-full flex flex-wrap">
                    {element.prices.map(({ type, price }) => (
                      <Price type={type} price={price} />
                    ))}
                  </div>
                </div>
              ) : null}

              <div className="my-2">
                <GenericRelatedItems
                  items={relatedComics}
                  title="See related comics"
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};
