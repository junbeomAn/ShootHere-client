/** @jsx jsx */
import { jsx } from '@emotion/react';
import * as React from 'react';
import { css } from '@emotion/react';

import { IMapPresenter } from './Map.entity';
import { mapStyles } from './Map.styles';
import { SpinnerWithContainer } from '../Spinner/Spinner.presenter';

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
