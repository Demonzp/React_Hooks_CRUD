import React,{ useState, useEffect } from 'react';
import { 
            Button, 
            Modal, 
            ModalHeader, 
            ModalBody, 
            ModalFooter, 
            Form, 
            FormGroup, 
            Label, 
            Input,
            Spinner 
        } from 'reactstrap';
import './form_edit.css';
//Компонент модальное окно форма для редактирования продукта
const FormEdit = ({product,modal,loading,onToggle,updateProduct})=>{
    //возможно, нужно было сделать просто 1 обект а не вот так вот
    const [id, setId] = useState(0);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    //опять же ДОМ
    const [el, setEl] = useState(null);

    //вот при передаче изменении продукт я изменяю локальное хранилище
    useEffect(()=>{
        setId(product.id);
        setName(product.name);
        setPrice(product.price);
    },[product]);
    //про это читать в компоненте form_add, это просто садомия какаято я хз
    useEffect(()=>{
        if(loading){
            setEl(<Spinner className="mr-3" color="primary" />);
        }else{
            setEl(<Button className="mr-3" color="primary" onClick={onEdit}>Изменить</Button>);
        }
    },[loading,name,price]);

    const onName = (e)=>{
        setName(e.target.value);
    };

    const onPrice = (e)=>{
        setPrice(e.target.value);
    };
    //вызываем функцию которая отправит всю ляпоту на сервер
    const onEdit = ()=>{
        updateProduct({id,name,price});
    }

    return (
        <Modal isOpen={modal} toggle={onToggle}>
            <ModalHeader toggle={onToggle}>Edit Product</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Введите наименование" 
                            value={name}
                            onChange={onName}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="price">Price</Label>
                        <Input 
                            type="text" 
                            name="price" 
                            id="price" 
                            placeholder="Введите цену" 
                            value={price}
                            onChange={onPrice}
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                {el}
                <Button color="secondary" onClick={onToggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default FormEdit;