import React from 'react';
import './table_row.css';

import { Button } from 'reactstrap';
//Вобщемто простенький компонент отбражающий строку таблицы
const TableRow = ({id,name,price,delProduct,editProduct})=>{
    //запускаем переданую в компонент функцию с ИД который хотим удалить
    const onDel = ()=>{
        delProduct(id);
    };
    //а тут продукт который хотим редактировать, на самом деле что то както
    //должно быть не так возможно если обьект большой а не 3 свойства надо не деструк
    //турировать его или передавать только ИД а в компоненте выше искать етот елемент
    //и передавать его
    const onEdit = ()=>{
        editProduct({id,name,price});
    };

    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{price}</td>
            <td>
                <Button className="mr-2" outline color="primary" onClick={onEdit}>Edit</Button>
                <Button outline color="danger" onClick={onDel}>Delete</Button>
            </td>
        </tr>
    );
}

export default TableRow;