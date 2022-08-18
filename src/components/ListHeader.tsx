import React from 'react';

const ListHeader: React.FC = () => {
  return (
    <div className='list__header'>
      <div className='id-col'>№</div>
      <div className='col'>name</div>
      <div className='col'>phone</div>
      <div className='action-col'>actions</div>
    </div>
  );
};

export default ListHeader;