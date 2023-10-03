import SubService from '@/components/pages/service/subService';
import SubServiceAdd from '@/components/pages/service/subService/add';
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