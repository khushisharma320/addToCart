import React from 'react';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import "./style.css";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE,ADD,REMOVE } from '../redux/actions/action'

const CardsDetails = () => {

    const [data, setData] = useState([])

    const { id } = useParams();

    const history = useNavigate();

    const dispatch = useDispatch();

    const getData = useSelector((state) => state.cartReducer.carts);

    const dlt = (id) => {
        dispatch(DELETE(id));
        history("/");
    };

    const compare = () => {
        let compareData = getData.filter((e) => {
            return e.id == id;
        });

        setData(compareData);
    }

    const send = (e)=>{
        // console.log(e);
        dispatch(ADD(e));
      }

      const remove = (item)=>{
        dispatch(REMOVE(item))
      }

    useEffect(() => {
        compare()
    }, [id])

    return (
        <div>
            <div className="container mt-4 mb-5">
                <h2 className="text-center">Items Details Page</h2>
            </div>
            <section className="container mt-3">
                <div className="iteamsdetails">
                    {
                        data.map((elem) => {
                            return (
                                <div className="items_details bg-dark">
                                    <div className="items_img">
                                        <img src={elem.imgdata} alt="" />
                                    </div>
                                    <div className="card_details">
                                        <Table striped bordered hover >
                                            <tr>
                                                <td>
                                                    <p className="bg-dark text-light"> <strong>{elem.rname}</strong></p>
                                                    <p className="bg-dark text-light"> <strong>Price</strong>  : ₹ {elem.price}</p>
                                                    <p className="bg-dark text-light"> <strong>Dishes</strong>  : {elem.address}</p>
                                                    <p className="bg-dark text-light"> <strong>Total</strong>  : ₹ {elem.price * elem.qnty}</p>

  
                                                    <div className='mt-5 d-flex justify-content-between align-items-center' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                                                        <span style={{ fontSize: 24 }} onClick={elem.qnty <= 1 ? ()=>dlt(elem.id) : ()=>remove(elem)}>-</span>
                                                        <span style={{ fontSize: 22 }}>{elem.qnty}</span>
                                                        <span style={{ fontSize: 24 }} onClick={()=>send(elem)}>+</span>

                                                    </div>

                                                </td>
                                                <td>
                                                    <p className="bg-dark text-light"><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}> {elem.rating} ★</span></p>
                                                    <p className="bg-dark text-light"><strong>Order Review :</strong> <span >{elem.somedata}</span></p>
                                                    <p className="bg-dark text-light"><strong>Remove :</strong> <span ><i onClick={()=>dlt(elem.id)} className='fas fa-trash' style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i>	</span></p>
                                                </td>
                                            </tr>
                                        </Table>
                                    </div>
                                </div>
                            )
                        })
                    }



                </div>
            </section>
        </div>
    )
}

export default CardsDetails;
