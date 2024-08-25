import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import Logo from '../../Components/NavBarComponent/logo.png';
import { AiOutlineFileAdd, AiOutlineHome, AiOutlineLogout } from 'react-icons/ai';
import { useNavigate, Outlet } from 'react-router-dom';

const AdminLayout = () => {
const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    navigate(e.key);
  };

  return (
    <Layout>
      <Sider  
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)} style={{ backgroundColor: '#ffffff' }}>
        <div className='flex items-center justify-center'>
          <img className='h-15 w-24 rounded-xl m-1' src={Logo} alt='logo' />
        </div>
        <Menu
          className='text-start font-semibold'
          theme='light'
          mode='inline'
          onClick={handleMenuClick}
        >
          <Menu.Item key="/home" icon={<AiOutlineHome />}>
            Home
          </Menu.Item>
          <Menu.SubMenu key="managedoctor" title="Manage Doctor" icon={<AiOutlineFileAdd />}>
            <Menu.Item key="/admin/doctor/register">Register doctor</Menu.Item>
            <Menu.Item key="/admin/doctor/list">View doctor profile</Menu.Item>
          </Menu.SubMenu>
          <Menu.SubMenu key="managepatient" title="Manage Patient" icon={<AiOutlineFileAdd />}>
            <Menu.Item key="/admin/patient/register">Register Patient</Menu.Item>
            <Menu.Item key="/admin/patient/list">Patient List</Menu.Item>
          </Menu.SubMenu>
          <Menu.Item key="/logout" icon={<AiOutlineLogout />}>
            LogOut
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout.Content style={{ padding: '0 24px' }}>
        <Outlet /> {/* This is where the page content will be rendered */}
      </Layout.Content>
    </Layout>
  );
};

export default AdminLayout;


