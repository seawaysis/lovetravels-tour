import PermissionsRoutes from './public/permissions-routes/permissions';
import { Provider } from 'react-redux';
import store from './services/store/Store';

function App () {
  return (
    <div className="App">
      <Provider store={store}>
        {<PermissionsRoutes />}
      </Provider>
    </div>
  );
}
export default App;
