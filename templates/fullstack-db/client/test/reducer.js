import test from 'tape';
import * as actions from '../redux/reducer';
import configureStore from '../redux/store';

test('reducer', (t) => {
  const store = configureStore();
  const dummy = 'dummy';
  store.dispatch(actions.addData(dummy));
  t.equal(store.getState().reducer.data[0], dummy, 'addData works correctly');
  t.end();
});