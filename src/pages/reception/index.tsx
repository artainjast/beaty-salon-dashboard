import Reception from '@/components/reception';
import ReceptionAdd from '@/components/reception/add';
import React, { useState } from 'react';

const ReceptionPage = () => {

    const [isCustomerModalOpen , setIsCustomerModalOpen] = useState<boolean>()
    const [isServiceModalOpen , setIsServiceModalOpen] = useState<boolean>()

    return (
      <>
        <ReceptionAdd openCustomerModal={setIsCustomerModalOpen} openServiceModal={setIsServiceModalOpen} />
        <Reception
          isCustomerModalOpen={isCustomerModalOpen}
          setCustomerModal={() => setIsCustomerModalOpen(false)}
          isServiceModalOpen={isServiceModalOpen}
          setServiceModal={() => setIsServiceModalOpen(false)}
        />
      </>
    );
};

export default ReceptionPage;