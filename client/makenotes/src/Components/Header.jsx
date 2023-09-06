import React, { useEffect, useState } from 'react';
import {
  MDBNavbar,
  MDBContainer,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBNavbarBrand,
  MDBCollapse,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from 'mdb-react-ui-kit';

import { LogOut,setUser } from '../Redux/ReduxSlice/UserSlice';
import { useDispatch, useSelector } from 'react-redux';
import {useLocation} from 'react-router-dom'
export default function Header() {
  const dispatch=useDispatch()
const location=useLocation()
  const [showNavColor, setShowNavColor] = useState(false);

const {user}=useSelector((state)=>state.user)


useEffect(() => {
  dispatch(setUser(user));
}, [location,user]);

// handleLogOut

const handleLogout=()=>{
    dispatch(LogOut())
}
  return (
    <>
      <MDBNavbar expand='lg' dark bgColor='primary'>
        <MDBContainer fluid>
          <MDBNavbarBrand href='/' className='fs-2'>Make Notes</MDBNavbarBrand>
          <MDBNavbarToggler
            type='button'
            data-target='#navbarColor02'
            aria-controls='navbarColor02'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowNavColor(!showNavColor)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
          <MDBCollapse show={showNavColor} navbar>
            <MDBNavbarNav right className='me-auto mb-2 mb-lg-0'>
              <MDBNavbarItem className='active'>
                <MDBNavbarLink aria-current='page' href='/'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/notes'>Notes</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink href='/createnotes'>Create Note</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBDropdown>
                  <MDBDropdownToggle>{user?.result?.username}</MDBDropdownToggle>
                  <MDBDropdownMenu>
                    <MDBDropdownItem>
                    <MDBNavbarLink href='/signin' style={{color:"black"}} onClick={handleLogout}>{user?"LogOut":"Login"}</MDBNavbarLink>
                    </MDBDropdownItem>
                  </MDBDropdownMenu>
                </MDBDropdown>
              </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBContainer>
      </MDBNavbar>     
    </>
  );
}