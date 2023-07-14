import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

const ZingMP3 = {
  DoSomeThing(params: {}) {
    return fetch('abc');
  },
  DoSomeThing2(params: {}) {
    return fetch('abc');
  },
};

ZingMP3.DoSomeThing({})