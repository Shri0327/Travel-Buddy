import React, { useState } from 'react';
import maleStatic from '../../assets/ai/Male-Static.png';

const Chat = ({ chatData }) => {
    const [chat, setChat] = useState(chatData);

    return (
        <div className='w-full h-full overflow-y-scroll flex flex-col items-start gap-2 px-4'>
            {chat?.map((chat) => (
                <div key={chat.id} className={`flex items-center gap-4 max-w-[70%] w-auto border p-4 rounded-xl ${chat.name === 'User' ? "bg-indigo-200 self-end" : "bg-purple-200"}`}>
                    <img src={chat.name === 'User' ? 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' : maleStatic} alt="" className='w-12 h-12 object-cover rounded-full border self-start' />
                    <div>
                        <span className={`font-bold ${chat.name === 'User' ? "text-indigo-900" : "text-purple-900"}`}>{chat.name}</span>
                        <p>{chat.message}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Chat;