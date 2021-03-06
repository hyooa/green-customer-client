import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCustomers } from '../modules/customers';
import CustomerUi from './CustomerUi';

const CustomerContainer = () => { // π
    // κ°μ²΄ κ΅¬μ‘°λΆν΄ ν λΉ
    const { data, loading, error } = useSelector(state => state.customers.customers);
    const dispatch = useDispatch(); // dispatch > μ‘μκ°μ²΄κ° μλ ν¨μκ° λ€μ΄κ°μμ

    // μ»΄ν¬λνΈ λ§μ΄νΈ ν κ³ κ° λͺ©λ‘ μμ²­
    useEffect(() => {
        dispatch(getCustomers());
    }, [dispatch])
    if(loading) return <div>πκΈ°λ€λ €π</div>;
    if(error) return <div>π¨ERRORπ¨</div>;
    if(!data) return <div>πμμπ</div>;

    return (
        <CustomerUi customers={data}></CustomerUi>
    );
};

export default CustomerContainer;