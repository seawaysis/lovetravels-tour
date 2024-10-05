import React,{useState} from 'react';

import Header from './header';
import PackageTourShow from '../components/packageTourShow';
import AddPackageTour from '../components/packageTourAdd';
import EditPackageTour from '../components/packageTourEdit';

function PackageTour() {
  const [view, setView] = useState(null);
  const [idForEdit,setIdForEdit] = useState('');
  const renderComponent = () => {
    switch (view) {
      case 'add':
        return <><AddPackageTour setView={setView} /></>;
      case 'edit':
        return <><EditPackageTour setView={setView} idForEdit={idForEdit}/></>;
      default:
        return <><Header/><PackageTourShow setView={setView} setIdForEdit={setIdForEdit}/></>;
    }
  };
  return (
    <div>
      {renderComponent()}
    </div>
  )
}

export default PackageTour
