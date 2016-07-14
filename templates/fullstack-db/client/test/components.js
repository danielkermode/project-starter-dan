import React from 'react';
import test from 'tape';
import { shallow } from 'enzyme';
import { App } from '../components/App';

test('<App />', (t) => {
  const wrapper = shallow(<App />);
  t.ok(wrapper.is('div'), 'has a div');
  t.end();
});