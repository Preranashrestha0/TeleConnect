import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import Logo from '../../Components/NavBarComponent/logo.png';
import { AiOutlineBook, AiOutlineDashboard, AiOutlineFileAdd, AiOutlineHome, AiOutlineLogout, AiOutlineMedicineBox, AiOutlineMessage, AiOutlineProfile, AiOutlineSearch } from 'react-icons/ai';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const DoctorSideMenu = () => {
const [collapsed, setCollapsed] = useState(false);
  const { patientId } = useParams();
  const navigate = useNavigate();

  const handleMenuClick = (e) => {
    navigate(e.key);
  }
  return (
    <>
    <Layout className=''>
      <Sider style={{ backgroundColor: '#ffffff' }}
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        
        {/* Logo */}
        <div className='flex items-center justify-center'> 
          <img className='h-15 w-24 rounded-xl m-1' src={Logo} alt='logo'/>
        </div>  
        {/* Menu List */}
        <div>
          <Menu className='text-start font-semibold' theme='light' mode='inline' onClick={handleMenuClick}> 
            <Menu.Item key="/doctor/doctor/dashboard" icon={<AiOutlineDashboard/>}>Dashboard</Menu.Item>
            <Menu.Item key="/doctor/doctor/search" icon={<AiOutlineSearch/>}> Search</Menu.Item>
            <Menu.Item key="/doctor/doctor/chats" icon={<AiOutlineMessage/>}> My Chats</Menu.Item>
            <Menu.Item key="/doctor/doctor/addprescription" icon={<AiOutlineMedicineBox/>}> Add New Prescription</Menu.Item>
            <Menu.Item key="/doctor/doctor/bookings" icon={<AiOutlineBook/>}> My Bookings</Menu.Item>
            <Menu.Item key="/doctor/doctor/profile" icon={<AiOutlineProfile/>}> My Account</Menu.Item>
            <Menu.Item key="/logout" icon={<AiOutlineLogout/>}>LogOut</Menu.Item>

          </Menu>
        </div>
      </Sider>
      <Layout.Content style={{ padding: '0 24px' }}>
        <Outlet /> {/* This is where the page content will be rendered */}
      </Layout.Content>
    </Layout>
  </>
 )
}

export default DoctorSideMenu
