import SubService from '@/components/service/subService';
import SubServiceAdd from '@/components/service/subService/add';
import React from 'react';

const SubServicePage = () => {
    return (
        <>
            <SubServiceAdd />
            <SubService/>
        </>
    );
};

export default SubServicePage;