import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cardsdata from './CardsData';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  { ADD }  from "../redux/actions/action.js";
import "./style.css";

const Cards = () => {

    const [data, setData] = useState(Cardsdata);

    const dispatch = useDispatch();

    const send = (e) =>{
        dispatch(ADD(e))
    }

    return (
        <div className="container mt-3">
            <h2 className="text-center">Add to Cart Projets</h2>

            <div className="row d-flex justify-content-center align-items-center">
                {
                    data.map((element, id) => {
                        return (

                            <Card key={id} style={{ width: "20rem" }} className="mx-2 mt-2 mb-4 card_style bg-dark">
                                <Card.Img variant="top" src={element.imgdata} style={{ height: "16rem" }} />
                                <Card.Body className="text-light">
                                    <Card.Title>{element.rname}</Card.Title>
                                    <Card.Text>
                                        Price : ₹ {element.price}
                                    </Card.Text>
                                    <div className="button_div">
                                        <Button onClick={()=>send(element)} variant="success">Add to Cart</Button>
                                    </div>
                                </Card.Body>
                            </Card>

                        )
                    })
                }
            </div>


        </div>
    )
}

export default Cards;
