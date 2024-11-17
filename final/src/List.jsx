import React,{useState} from 'react';
import './List.css';

function List({ ts, em, pi, gs ,onClick}){
    return <div className="list1" onClick={onClick}  >
        <div>{ts}</div>
        <div>{em[0].label}</div>
    </div>
}
export default List;
// {em.map((obj,index)=>(
//     <div key={index}>
//     {obj.label}:{obj.score}