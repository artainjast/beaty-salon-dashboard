import Customer from '@/components/pages/customer';
import CustomerAdd from '@/components/pages/customer/add';
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