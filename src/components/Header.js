import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/esm/Table';
import { DELETE }  from '../redux/actions/action';
import { Badge } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import Menu from '@mui/material/Menu';
import { useDispatch, useSelector } from 'react-redux';
import "./style.css";


const Header = () => {

    const [price, setPrice] = useState(0);

    const getData = useSelector((state) => state.cartReducer.carts);
    // console.log(getData);

    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DELETE(id))
    };

    const total = ()=>{
        let price = 0;
        getData.map((elem)=>{
            price = elem.price * elem.qnty + price;
    });

    setPrice(price);

    };
    
    useEffect(()=>{
        total();
    },[total])
    

    return (
        <div>
            <Navbar bg="dark" data-bs-theme="dark" style={{ height: "60px" }}>
                <Container className="text-white">
                    <NavLink to="/" className="text-decoration-none text-light mx-4">Add To Cart</NavLink>
                    <Nav className="me-auto text-white">
                        <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
                    </Nav>
                    <Badge badgeContent={getData.length} color="success"
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-cart-shopping text-white" style={{ fontSize: "25px", cursor: "pointer" }}></i>

                    </Badge>
                </Container>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >

                    {
                        getData.length ?
                            <div className="card_details" style={{ width: "28rem", padding: 10 }}>
                                <Table striped bordered hover>
                                    <thead  style={{gap : "20px"}}>
                                        <tr>Click on Photo</tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData.map((e)=>{
                                                return (
                                                    <>
                                                    <tr>
                                                        <td>
                                                        <NavLink onClick={handleClose} to={`/cart/${e.id}`}><img src={e.imgdata} style={{width : "5rem", height : "5rem"}} alt="" /></NavLink>
                                                        </td>
                                                        <td>
                                                            <p>{e.rname}</p>
                                                            <p>Price : {e.price}</p>
                                                            <p>Quantity : {e.qnty}</p>
                                                            <p onClick={()=>dlt(e.id)} style={{color : "red", cursor : "pointer"}}><i className="fas fa-trash smalltrash"></i></p>
                                                        </td>
                                                        <td>
                                                            <p onClick={()=>dlt(e.id)} style={{color : "red", cursor : "pointer"}}><i className="fas fa-trash largetrash"></i></p>

                                                        </td>
                                                    </tr>
                                                    </>
                                                )
                                            })
                                        }

                                        <p className="text-center">Total : ₹ {price}</p>
                                    </tbody>
                                </Table>
                            </div> :
                            <div className="card_details d-flex justify-content-center align-items-center" style={{ width: "220px", padding: 8, position: "relative" }}>
                            <i className="fas fa-close smallclose" onClick={handleClose} style={{ position: "absolute", top: 12, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                            <p style={{ fontSize: 16 }}>Your Card is Empty</p>
                        </div>
                    }

                    
                </Menu>
            </Navbar>
        </div>
    )
}

export default Header;
