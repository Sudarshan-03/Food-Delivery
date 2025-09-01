import React, { useState } from 'react';
import './Admin.css';
import Add from './components/Add';
import List from './components/List';
import Orders from './components/Orders';
import Applications from './components/Applications';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('add');

  const renderContent = () => {
    switch (activeTab) {
      case 'add':
        return <Add />;
      case 'list':
        return <List />;
      case 'orders':
        return <Orders />;
      case 'applications':
        return <Applications />;
      default:
        return <Add />;
    }
  };

  return (
    <div className='admin'>
      <div className='admin-sidebar'>
        <div className='admin-sidebar-options'>
          <div
            className={`admin-sidebar-option ${activeTab === 'add' ? 'active' : ''}`}
            onClick={() => setActiveTab('add')}
          >
            <p>Add Items</p>
          </div>
          <div
            className={`admin-sidebar-option ${activeTab === 'list' ? 'active' : ''}`}
            onClick={() => setActiveTab('list')}
          >
            <p>List Items</p>
          </div>
          <div
            className={`admin-sidebar-option ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <p>Orders</p>
          </div>
          <div
            className={`admin-sidebar-option ${activeTab === 'applications' ? 'active' : ''}`}
            onClick={() => setActiveTab('applications')}
          >
            <p>Applications</p>
          </div>
        </div>
      </div>
      <div className='admin-content'>
        {renderContent()}
      </div>
    </div>
  );
};

export default Admin;