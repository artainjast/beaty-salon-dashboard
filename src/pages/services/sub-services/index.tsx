import SubService from '@/components/service/subService';
import SubServiceAdd from '@/components/service/subService/add';
import React from 'react';

const SubServicePage = () => {
    return (
        <div className='mt-2'>
            <SubServiceAdd />
            <SubService/>
        </div>
    );
};

export default SubServicePage;