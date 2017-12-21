import React from 'react';
import { storiesOf } from '@kadira/storybook';
require('../styles/application.scss')
import Navbar from './Navbar'

storiesOf('Navbar', module)
  .add('just plane', () => (
    <Navbar/>
  ))
