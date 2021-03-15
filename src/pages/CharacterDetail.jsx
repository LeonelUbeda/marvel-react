import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ErrorInline from '../components/ErrorInline';

/* Components */
import SectionHeader from '../layout/SectionHeader';
import GenericRelatedItems from '../components/GenericRelatedItems';
import Price from '../components/Price';

/* Wrappers */
import LoadingHandler from '../components/LoadingHandler';
import ErrorHandler from '../components/ErrorHandler';

/* State */
import favoriteActions from '../store/favorite/favorite.actions';
import { loadCharacterById } from '../store/characters/characters.actions';

/* Utils */
import { searchIfFavorite } from '../utils/favoriteStateUtils';

export default () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [element, setElement] = useState(null);
  const { items: itemsFromStore, isLoading } = useSelector(
    (state) => state.characters
  );
  const [relatedComics, setRelatedComics] = useState(null);
  const { favorites, error: actionFavoriteError } = useSelector(
    (state) => state.favorite
  );
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(searchIfFavorite(favorites, id, 'CHARACTER'));
  }, [favorites]);

  useEffect(() => {
    dispatch(loadCharacterById(id));
  }, []);

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

  useEffect(() => {
    if (id in itemsFromStore) {
      setElement(itemsFromStore[id]);
      setRelatedComics(
        itemsFromStore[id].comics.items.map((e) => ({
          title: e.name,
          link: `/comics/${e.resourceURI.split('/comics/')[1]}`,
        }))
      );
    }
  }, [itemsFromStore]);

  function removeFromFavorite() {
    dispatch(favoriteActions.removeFavorite(id, 'CHARACTER'));
  }
  return (
    <>
      <SectionHeader>
        <h3 className="text-2xl font-bold py-2 text-gray-100">
          Character Detail
        </h3>
      </SectionHeader>
      <div className="container mx-auto pb-20">
        {actionFavoriteError && (
          <ErrorInline
            title={actionFavoriteError.message}
            className="mt-5"
            action={() => dispatch(favoriteActions.removeError())}
          />
        )}
        <ErrorHandler>
          <LoadingHandler isLoading={isLoading}>
            {element && (
              <Character
                thumbnail={element.thumbnail}
                name={element.name}
                isFavorite={isFavorite}
                removeFromFavorite={removeFromFavorite}
                addToFavorite={addToFavorite}
                description={element.description}
                prices={element.prices}
                relatedComics={relatedComics}
              />
            )}
          </LoadingHandler>
        </ErrorHandler>
      </div>
    </>
  );
};

function Character({
  thumbnail,
  name,
  isFavorite,
  removeFromFavorite,
  addToFavorite,
  description,
  prices,
  relatedComics,
}) {
  return (
    <div className="flex flex-col px-1 mt-4 md:flex-row md:items-start md:justify-center md:mx-auto">
      <img
        src={`${thumbnail.path}.${thumbnail.extension}`}
        className="h-96 object-cover rounded-md shadow-md md:w-3/6"
        alt={`${name}`}
      />

      <div className="my-2 mx-3 md:ml-10 md:w-3/6">
        <h1 className="text-xl uppercase font-bold text-gray-700 my-2">
          {name}
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

        {description ? (
          <>
            <h3 className="px-2 py-1 bg-red-500 text-white">Description</h3>
            <p>{description}</p>
          </>
        ) : (
          <h2 className="font-semibold text-xl text-red-500">
            No description!
          </h2>
        )}

        {prices && prices.length > 0 ? (
          <div className="my-2">
            <h2 className="text-gray-600 font-semibold">Price</h2>
            <div className="w-full flex flex-wrap">
              {prices.map(({ type, price }) => (
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
  );
}
