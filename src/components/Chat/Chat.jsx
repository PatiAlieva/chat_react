import React from 'react';
import { useState } from 'react';
import './chat.scss';

export default function Chat() {
    const [inputText, setInputText] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInput = (event) => {
        setInputText(event.target.value);
    }

    const handleSendBtn = (event) => {
        event.preventDefault();

        if (inputText.trim() === '') {
            return;
        }

        const newMessage = {
            id: Date.now(),
            text: inputText.trim(),
            selected: true,
        };

        setMessages(prevMessages => {
            const updatedMsg = prevMessages.map(message => {
                if (message.selected) {
                    return {...message, selected: false};
                }
                return message;
            });
            return [newMessage, ...updatedMsg];
        });

        setInputText('');
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <h1>Chatroom</h1>
            </div>

            <form className='form'>
                <div className='form_chat'>
                    <input name="input" type="text" value={inputText} onChange={handleInput} className="newMessage" placeholder="Введите сообщение"/>
                    <button onClick={handleSendBtn} className="sendBtn">Отправить</button>
                </div>         

                <ul>
                    {messages.map((message, index) => (
                        <li
                            key = {index}
                            className={index === 0 ? "newMessage" : "message"}>
                            {message.text}
                        </li>
                    ))}
                </ul>  
            </form>
        </div>
    );
};
