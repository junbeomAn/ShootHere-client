/** @jsx jsx */

import { jsx } from '@emotion/react';
import React from 'react';

import {
  footerStyles,
  footerBoxContainerStyles,
  footerBoxStyles,
  infoStyles,
} from './Footer.styles';

const FooterPresenter = () => {
  return (
    <footer css={footerStyles}>
      <div css={footerBoxContainerStyles}>
        <section css={footerBoxStyles}>
          <div css={infoStyles}>
            <a href='https://github.com/junbeoman/shoothere-client'>
              @ Project Repo
            </a>
            <a href='https://github.com/junbeoman'>@ Github</a>
          </div>
          Copyright &copy; 2022. Junbeom An. All Rights Reserved.
        </section>
      </div>
    </footer>
  );
};

export default FooterPresenter;
