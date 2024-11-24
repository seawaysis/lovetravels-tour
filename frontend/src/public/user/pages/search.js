import React,{useState} from 'react';
import { useSelector,useDispatch } from 'react-redux';

import Header from '../components/header';
import PackageDetail from '../components/packageDetail';
import PackageSearch from '../components/packageSearch';
import Chat from '../components/chat';

import '../allStyle.css';

function Search(props) {
    const dispatch = useDispatch();
    const { packageSearch } = useSelector((state) => state.PackageSearch); 
    const [packageDetail,setPackageDetail] = useState({dataDetail : {},dataSearch:{},statusChange : false})
    
    const arrProps = {
        "dispatch" : dispatch,
        "dataSearch" : packageDetail.dataSearch,
        "packageSearch" : packageSearch,
        "setPackageDetail" : setPackageDetail
    };
    return (
        <>
        <Header/> 
       {!packageDetail.statusChange ? <PackageSearch {...arrProps}/> : <PackageDetail packageDetail={packageDetail} setPackageDetail={setPackageDetail} />}
        {/* <Chat /> */}
        </>
    )
}

export default Search