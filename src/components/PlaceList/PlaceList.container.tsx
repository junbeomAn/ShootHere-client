import * as React from 'react';
import { observer } from 'mobx-react';

import PlaceList from './PlaceList.presenter';
import Modal from 'components/Modal/Modal.container';
import Carousel from 'components/Carousel/Carousel.container';

import { client } from 'api/client';
import { getPlaceImagesQuery } from 'api/query';

import { IPlaceListContainer, IPhoto, IPlaceImage } from './PlaceList.entity';
import { useStore } from 'store';
import { EModal } from 'store/store.entity';

const { useState, useMemo, useRef, useEffect } = React;

const ITEM_COUNT_PER_PAGE = 6;

const PlaceListContainer = ({ data, isLoading }: IPlaceListContainer) => {
  const [images, setImages] = useState<IPlaceImage[]>([]);
  const [placeName, setPlaceName] = useState('');
  const [page, setPage] = useState(1);

  const {
    modalStore: { setModal, modalType },
  } = useStore();
  const loadingRef = useRef<HTMLDivElement>(null);

  // change data according to page, using usememo
  const dataWithCurrentPage = useMemo(() => {
    return data.slice(0, page * ITEM_COUNT_PER_PAGE);
  }, [page, data]);

  const resetCarouselData = () => {
    setImages([]);
    setPlaceName('');
  };

  const handlePlaceClick = (placeId: string, name: string) => {
    resetCarouselData();
    setModal(EModal.CAROUSEL);

    client.fetch<IPhoto[]>(getPlaceImagesQuery(placeId)).then((res) => {
      const [imageData] = res;

      setImages(imageData ? imageData.url : []);
      setPlaceName(name);
    });
  };

  const hasNextPage = (currPage: number) => {
    const totalCount = data.length;
    const isNextPageFullItem =
      (currPage + 1) * ITEM_COUNT_PER_PAGE <= totalCount;
    const lastPageItemCount = totalCount - currPage * ITEM_COUNT_PER_PAGE;
    const isNextPageItemExistAny = 0 <= lastPageItemCount;

    return isNextPageFullItem || isNextPageItemExistAny;
  };

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
    if (loadingRef.current && data.length > ITEM_COUNT_PER_PAGE) {
      observer.observe(loadingRef.current);
    }
  };

  useEffect(() => {
    initObserver();
    setPage(1);
  }, [data]);

  const carouselModal = modalType === EModal.CAROUSEL && (
    <Modal>
      <Carousel placeName={placeName} images={images} />
    </Modal>
  );

  return (
    <>
      {carouselModal}
      <PlaceList
        data={dataWithCurrentPage}
        isLoading={isLoading}
        handlePlaceClick={handlePlaceClick}
        loadingRef={loadingRef}
        isLastPage={hasNextPage(page) === false}
      />
    </>
  );
};

export default observer(PlaceListContainer);
