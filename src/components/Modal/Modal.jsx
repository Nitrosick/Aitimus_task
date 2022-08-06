import { useState, useEffect } from 'react';
import './Modal.css';

export const Modal = ({ setModal }) => {
    const [disabled, setDisabled] = useState(true);
    const [surname, setSurname] = useState('');
    const [name, setName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [phone, setPhone] = useState('');

    const checkInputs = () => {
        if (
            surname &&
            name &&
            patronymic &&
            phone
        ) {
            setDisabled(false);
        }
    };

    const handleClose = (e) => {
        e.preventDefault();
        setModal(false);
    };

    useEffect(() => {
        const unsubscribe = window.addEventListener('keydown', event => {
            if (event.key === 'Escape') { setModal(false) }
        });

        return unsubscribe;
    }, []);

    return (
        <div className="modal">
            <form action="#" className="modal_content">
                <h2 className="modal_title">Откликнуться</h2>
                <button
                    className="modal_close"
                    onClick={(e) => handleClose(e)}
                >
                    x
                </button>
                <fieldset className='custom_input'>
                    <legend className='custom_input_title'>Фамилия</legend>
                    <input
                        type="text"
                        className='custom_input_field'
                        placeholder='Фамилия'
                        required
                        value={surname}
                        onChange={(e) => {
                            setSurname(e.target.value);
                            checkInputs();
                        }}
                    />
                </fieldset>

                <fieldset className='custom_input'>
                    <legend className='custom_input_title'>Имя</legend>
                    <input
                        type="text"
                        className='custom_input_field'
                        placeholder='Имя'
                        required
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            checkInputs();
                        }}
                    />
                </fieldset>

                <fieldset className='custom_input'>
                    <legend className='custom_input_title'>Отчество</legend>
                    <input
                        type="text"
                        className='custom_input_field'
                        placeholder='Отчество'
                        required
                        value={patronymic}
                        onChange={(e) => {
                            setPatronymic(e.target.value);
                            checkInputs();
                        }}
                    />
                </fieldset>

                <fieldset className='custom_input'>
                    <legend className='custom_input_title'>Номер телефона</legend>
                    <input
                        type='tel'
                        className='custom_input_field'
                        placeholder='+7(000)000-00-00'
                        required
                        value={phone}
                        onChange={(e) => {
                            setPhone(e.target.value);
                            checkInputs();
                        }}
                    />
                </fieldset>

                <div className="modal_personal">
                    <input type="checkbox" name="personal" id="personal" />
                    <p className="modal_personal_text">
                        Я даю согласие на обработку своих персональных данных в<br />
                        соответствии с <a href="#" className="modal_personal_link">положением об обработке персональных данных.</a>
                    </p>
                </div>

                <button className='modal_submit' type="submit" disabled={disabled}>Откликнуться</button>
            </form>
        </div>
    )
};