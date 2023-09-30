import Customer from '@/components/customer';
import CustomerAdd from '@/components/customer/add';
import React from 'react';

const CustomerPage = () => {
    return (
        <>
            <CustomerAdd/>
            <Customer/>
        </>
    );
};

export default CustomerPage;