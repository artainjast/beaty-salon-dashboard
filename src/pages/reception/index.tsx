import { ReceptionPage } from '@/components/reception';
import ReceptionAdd from '@/components/reception/add';
import React, { useState } from 'react';

const Reception = () => {

    const [isCustomerModalOpen , setIsCustomerModalOpen] = useState<boolean>()
    const [isServiceModalOpen , setIsServiceModalOpen] = useState<boolean>()

    return (
      <div className='mt-2'>
        <ReceptionAdd openCustomerModal={setIsCustomerModalOpen} openServiceModal={setIsServiceModalOpen} />
        <ReceptionPage
          isCustomerModalOpen={isCustomerModalOpen}
          setCustomerModal={() => setIsCustomerModalOpen(false)}
          isServiceModalOpen={isServiceModalOpen}
          setServiceModal={() => setIsServiceModalOpen(false)}
        />
      </div>
    );
};

export default Reception;