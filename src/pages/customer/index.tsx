import Customer from '@/components/customer';
import CustomerAdd from '@/components/customer/add';
import React from 'react';

const CustomerPage = () => {
    return (
        <div className='mt-2'>
            <CustomerAdd/>
            <Customer/>
        </div>
    );
};

export default CustomerPage;