import React,{useEffect} from 'react'
import ConfigRoutes from '../../routers/routers';
import { Routes,Route,Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import getRole from '../../services/store/thunks'
function PrivateRoutes(props) {

    const dispatch = useDispatch();
    //dispatch(getRole())
    useEffect(() => {dispatch(getRole())}, [dispatch]);
    const { role } = useSelector((state) => state.Roles); 
    const allowedRoutes = ConfigRoutes[role].allowedRoutes;
    const redirectRoutes = ConfigRoutes[role].redirectRoutes;
  return (
    <Routes>
        {allowedRoutes.map(route => <Route 
            path={route.url}
            key={route.url}
            element={<route.component />}
         />)}
        <Route path="*" element={<Navigate to={redirectRoutes} />} />
    </Routes>
  )
}

export default PrivateRoutes
