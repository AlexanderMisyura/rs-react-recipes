import { Provider } from 'react-redux';
import { store } from 'redux/store';

export const ReduxStoreWrapper = ({ children }: { children: React.ReactNode }) => (
  <Provider store={store}>{children}</Provider>
);
