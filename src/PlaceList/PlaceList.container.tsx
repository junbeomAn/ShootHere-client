import * as React from 'react';

import PlaceList from './PlaceList.presenter';

import { IPlaceListContainer, IPhoto, IPlaceImage } from './PlaceList.entity';
import { client } from '../api/client';
import { getPlaceImagesQuery } from '../api/query';
import { ModalContext } from '../context/modalContext';
import { ListPageContext } from '../context/listPageContext';

const { useState, useContext, useMemo, useRef, useEffect } = React;

const ITEM_COUNT_PER_PAGE = 5;

const PlaceListContainer = ({ data, isLoading }: IPlaceListContainer) => {
  const [images, setImages] = useState<IPlaceImage[]>([]);
  const [placeName, setPlaceName] = useState('');

  const { setIsOpen } = useContext(ModalContext);
  // page context use
  const { page, setPage } = useContext(ListPageContext);
  const loadingRef = useRef<HTMLDivElement>(null);

  const handlePlaceClick = (placeId: string, name: string) => {
    setIsOpen(true);

    client.fetch<IPhoto[]>(getPlaceImagesQuery(placeId)).then((res) => {
      const [data] = res;

      setImages(data ? data.url : []);
      setPlaceName(name);
    });
  };
  // next page * COUNT 이 data의 length 보다 작거나 같을때.
  const hasNextPage = (currPage: number) =>
    (currPage + 1) * ITEM_COUNT_PER_PAGE <= data.length;

  const handleObserver: IntersectionObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      setTimeout(() => {
        setPage((prevPage) => {
          if (hasNextPage(prevPage)) {
            return prevPage + 1;
          }
          observer.unobserve(entry.target);
          return prevPage;
        });
      }, 1000);
    });
  };

  // intersection observer  sholud be imported and initialized
  const initObserver = () => {
    let observer: IntersectionObserver;

    const options = {
      rootMargin: '0px',
    };

    observer = new IntersectionObserver(handleObserver, options);
    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }
  };

  useEffect(() => {
    initObserver();
    return () => {
      setPage(1);
    };
  }, [data]);

  // change data according to page, using usememo
  const dataWithCurrentPage = useMemo(() => {
    return data.slice(0, page * ITEM_COUNT_PER_PAGE);
  }, [page, data]);

  return (
    <>
      <PlaceList
        data={dataWithCurrentPage}
        isLoading={isLoading}
        handlePlaceClick={handlePlaceClick}
        images={images}
        placeName={placeName}
        loadingRef={loadingRef}
        isLastPage={hasNextPage(page) === false}
      />
    </>
  );
};

export default PlaceListContainer;
