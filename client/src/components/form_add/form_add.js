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
import './form_add.css';
//компонент не оч простой и вызывает ваще у меня кучу сомнений
const FormAdd = ({modal,loading,onToggle,addProduct})=>{
    //тут наименование продукта
    const [name, setName] = useState('');
    //тут цена продукта
    const [price, setPrice] = useState(0);
    //тут Дом елемент спиннер или кнопка
    const [el, setEl] = useState(null);
    //функция изменения Имени
    const onName = (e)=>{
        setName(e.target.value);
    };
    //цены
    const onPrice = (e)=>{
        setPrice(e.target.value);
    };
    //тут мы отправляем на сервер наши данные посредством вызова функции переданой
    //из родительского компонента, тут можно наверно навешать всяких проверок
    //свистелок и перделок, но нам оно не надо
    const onAdd = ()=>{
        addProduct({name,price});
    }
    //и вот вот оно то что грызет меня, тут я должен следить за флажком в каком
    //положении приложение тоесть оно ждет ответ от сервера или нет, на самом
    //деле так редко когда надо ведь Аякс запросы для того и были предуманы
    //что бы не вешать всю страницу в ожидание ответа, но пусть будет что нам надо
    //именно ждать ответа от сервера, и вот тут мне не понятно, карочи если я еще не
    //буду смотреть за name,price, то при клике на кнопку у меня будет не обновленный
    //стейт, тоесть пустые будут name и price
    //И ваще меня бесит JSX в ВУ мне больше нравиться работать с секцией <template>
    //И еще это получаеться что при каждом чихе Реакт перерисовывает всю кнопку?
    // или как? + однозначно я гоняю условие при каждом чихе, ну бред же
    //тут нужно мнение експерта, а возможно и сомого создателя Реакт, чувак ты знаеш
    //инглиш может напишеш им а как быть то Блеать??!!
    useEffect(()=>{
        if(loading){
            setEl(<Spinner className="mr-3" color="primary" />);
        }else{
            setEl(<Button className="mr-3" color="primary" onClick={onAdd}>Добавить</Button>);
        }
    },[loading,name,price]);

    return (
        <Modal isOpen={modal} toggle={onToggle}>
            <ModalHeader toggle={onToggle}>Add Product</ModalHeader>
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
                {/* а как бы это выглядело в ВУ?*/}
                {/* <Spinner v-if="loading" className="mr-3" color="primary" />
                <Button 
                    v-else 
                    className="mr-3" 
                    color="primary" 
                    onClick={onAdd}
                >Добавить</Button> */}
                {/* ну ваще шикарно ведь и не надо мне там мудохаться 
                с еще наблюдением чего либо просто v-if v-else
                может я гдето что то протупил???  */}
                <Button color="secondary" onClick={onToggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
}

export default FormAdd;