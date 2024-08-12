import React from 'react'
import ConfigRoutes from '../../routers/routers';
import { Routes,Route,Navigate } from 'react-router-dom';

function PrivateRoutes(props) {
    const role = props.role || "user"

    const allowedRoutes = ConfigRoutes[role].allowedRoutes;
    const redirectRoutes = ConfigRoutes[role].redirectRoutes;

    console.log(role)
  return (
    <Routes>
        {allowedRoutes.map(route => <Route 
            path={route.url}
            keys={route.url}
            element={<route.component setRole={props.setRole}/>}
         />)}
        <Route path="*" element={<Navigate to={redirectRoutes} />} />
    </Routes>
  )
}

export default PrivateRoutes
