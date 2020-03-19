import React,{ useState, useEffect } from 'react';
import { Table, Container, Button } from 'reactstrap';
import './main_table.css';

import axios from 'axios';

import TableRow from '../table_row';
import FormAdd from '../form_add';
import FormEdit from '../form_edit';
import Alert from '../alert';


//Самый огромный и манолитный компонент, как сделать проще я хз(( возможно ты сможеж
//отрефакторить покрасивее, что касается по хукам в ширину да пожалую меньше кода,
//но в моем исполнее что то вдлину он просто огромен, так наверняка не должно быть,
//вобщем вся надежда на тебя
const MainTable = ()=>{
    //тут я держу массив полученный с сервера
    const [items, setItems] = useState([]);
    //тут я держу наверно массив компонентов row, тоесть строку таблицы
    const [elements, setElements] = useState([]);
    //флажок модального окна добавления
    const [modal_add, setModalAdd] = useState(false);
    //флажок модального окна редактирования
    const [modal_edit, setModalEdit] = useState(false);
    //флажок модального Алерта типа появляющегося сообщения
    const [modal_alert, setModalAlert] = useState(false);
    //текст модального окна
    const [text_alert, setTextAlert] = useState('');
    //стату ожидания ответа от сервера, на самом деле не самое нужное
    const [loading, setLoading] = useState(false);
    //тут весь обьект который хочу редактировать в нашем случае это будет
    // {
    //     id,
    //     name,
    //     price
    // }
    const [edit_item, setEditItem] = useState({});
    //так тут при первом рендере компонента я просто делаю запрос на сервер
    useEffect(()=>{
        _getItems();
    },[]);
    //тут я слежу за изменение массива items,
    //и при его изменении пересобираю массив дом елементов
    useEffect(()=>{
        //создаю массив дом елементов(компонентов tableRow)
        const t_elements = items.map((item) => {
            return (
                <TableRow
                    //ключ требует JSX
                    key={item.id}
                    //функция удаления продукта
                    delProduct={delProduct}
                    //функция для показа едит формы
                    editProduct={showEditProduct}
                    //ну и сам продукт
                    {...item }
                />
            );
        });

        setElements(t_elements);
    },[items]);

    //запрос на сервер на получение списка продуктов
    const _getItems = ()=>{
        //устанавливаю приложение в загрузка
        //нельзя добавлять редактировать при этом флажке
        //в формах будет вместо кнопки спиннер
        setLoading(true);

        axios.get('http://localhost:5000/products/')
        .then((res) => {
            setItems(res.data);
            //надо не забыть отменить флажок поле ответа сервера
            //иначе так и останеться приложение в загрузке))
            _isResponce();
        })
        .catch((err) => console.error(err));
    };
    //запрос на сервер на добавление нового елемента
    const addProduct = (data)=>{
        setLoading(true);

        axios.post('http://localhost:5000/products/update', data)
        .then((res) => {
            //я хз как там с Хуками навернож тоже надо извращаться 
            //как и со стейтом на классах
            const newArr = [
                ...items,
                {
                    ...res.data
                }
                
            ];
            setItems(newArr);
            //показали алерт
            _showAlert(`Новый Продукт под #"${res.data.id}" добавлен`);
            //установили флажок на фолсе
            _isResponce();
        });
    };
    //запрос удаления продукта по ИД
    const delProduct = (id)=>{
        setLoading(true);

        axios.delete('http://localhost:5000/products/delete/' + id)
        .then((res) => {
            const idx = items.findIndex((el) => el.id === id);

            const newArr = [
                ...items.slice(0, idx),
                ...items.slice(idx + 1)
            ];

            setItems(newArr);
            _showAlert(`Продукт #"${id}" Удален`);
            _isResponce();
        });
    };
    //запрос обновления продукта
    const updateProduct = (data)=>{
        const { name, price } = data;

        axios.put('http://localhost:5000/products/edit/' + data.id, {
            name, 
            price,
        })
        .then((res) => {
            const idx = items.findIndex((el) => el.id === data.id);

            const new_item = {
                ...items[idx],
                name,
                price
            }
            const newArr = [
                ...items.slice(0, idx),
                new_item,
                ...items.slice(idx + 1)
            ];

            setItems(newArr);
            _showAlert(`Продукт #"${data.id}" обновлен`);
            _isResponce();
        });
    };
    //функция для модального окна редактирования
    const showEditProduct = (data)=>{
        //записали все данные что хотим редактировать
        setEditItem(data);
        //отборазили модальное окно
        onModalEdit();
    };
    // функлия показа Алерт копмонента
    const _showAlert = (text)=>{
        setTextAlert(text);
        setModalAlert(true);
    };
    //серия функций установки флажков модальных окон
    const onModalAdd = () => setModalAdd(!modal_add);
    const onModalEdit = () => setModalEdit(!modal_edit);
    const onModalAlert = () => setModalAlert(!modal_alert);
    //функция для перевода приложения в не Лоад состояние и закрытие
    //всех модальных форм окон
    const _isResponce = ()=>{
        setLoading(false);
        setModalAdd(false);
        setModalEdit(false);
    }

    return (
        <Container className="themed-container">
            {/* Компонент Алерт */}
            <Alert
                // состояние флажка
                modal={modal_alert}
                //текст алерта
                text={text_alert}
                //функия изменения состояния флажка
                onToggle={onModalAlert}
            />
            <h1>Product List</h1>
            {/* Кнопка добавления просто вызывает модальное окно */}
            <Button className='my-3' color="success" onClick={onModalAdd}>Add</Button>
            <Table striped size="sm">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* рендерим массив TableRow компоненты */}
                    { elements }
                </tbody>
            </Table>
            {/* Форма добаления */}
            <FormAdd
                //флажок
                modal={modal_add}
                //флажок
                loading={loading}
                //функция
                onToggle={onModalAdd}
                //функция для отправки запроса
                addProduct={addProduct}
            />
            {/* Форма редактирования */}
            <FormEdit
                //флажок
                modal={modal_edit}
                //обект(продукт), который собираемся изменять
                product={edit_item}
                //флажок
                loading={loading}
                //функция
                onToggle={onModalEdit}
                //функция для отправки на сервер
                updateProduct={updateProduct}
            />
        </Container>
    );
}

export default MainTable;