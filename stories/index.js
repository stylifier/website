import React from 'react';
import { storiesOf } from '@kadira/storybook';
require('../styles/application.scss')
import ShowCasePhotoSlider from './ShowCasePhotoSlider';

storiesOf('ShowCasePhotoSlider', module)
  .add('just plane', () => (
    <ShowCasePhotoSlider/>
  ))
  .add('with photo', () => (
    <ShowCasePhotoSlider photos={['asd']}/>
  ))
