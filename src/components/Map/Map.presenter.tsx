/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import { css } from '@emotion/react';

import { SpinnerWithContainer } from 'components/Spinner/Spinner.presenter';

import { mapStyles } from './Map.styles';
import { IMapPresenter } from './Map.entity';

const MapPresenter = ({ isLoading }: IMapPresenter) => {
  return (
    <div css={mapStyles}>
      <div
        css={css`
          width: 100%;
          height: 100%;
        `}
        id='map'
      ></div>
      {isLoading && (
        <SpinnerWithContainer absolute message={`Map is being loaded..`} />
      )}
    </div>
  );
};

export default MapPresenter;
