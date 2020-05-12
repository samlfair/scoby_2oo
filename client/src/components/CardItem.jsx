import React from 'react'

function CardItem(props) {
    return (
        <div className="cardItem" key ={props._id}>
        <img src={props.image} alt=""/>
        <h2>{props.name}</h2>
        <h3><p>{props.quantity} | {props.category}</p></h3>
        <p>{props.address}</p>
        <p>Given by</p>
        <p>Contact infos</p>    
        </div>
    )
}

export default CardItem

