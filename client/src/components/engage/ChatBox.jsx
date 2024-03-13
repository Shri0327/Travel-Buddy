import React, { useEffect, useState } from 'react';
import { TextField, IconButton, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import UploadFileIcon from '@mui/icons-material/UploadFile';
// import { chatData } from '../../data/chatData';
import { useSelector, useDispatch } from 'react-redux';
import { setEndVid } from '../../redux/features/aiCard';
import { setCurrChat } from '../../redux/features/querySlice';
import Chat from './Chat';
import { useSpeechSynthesis } from 'react-speech-kit';
import { CircularProgress } from '@mui/material';
import { toast } from 'react-toastify';
import Api from '../../api';



const ChatBox = ({ customMsg }) => {
    const dispatch = useDispatch();
    const [message, setMessage] = useState(customMsg || '');
    const currChat = useSelector((state) => state.query.currChat);
    const [chatData, setChatData] = useState(currChat);
    const [change, setChange] = useState(false);
    const [loading, setLoading] = useState(true);
    const { startLocationInfo, destinationInfo } = useSelector((state) => state.query);
    const user = JSON.parse(localStorage.getItem('user'));
    const { audio, video, endVid } = useSelector((state) => state.aiCard);
    const { speak, cancel, voices } = useSpeechSynthesis({
        onEnd: () => {
            console.log("End");
            dispatch(setEndVid(false));
        },
    });

    useEffect(() => {
        setLoading(true);
        console.log(currChat)
        setChatData(currChat);
        setLoading(false);
    }, [currChat]);

    useEffect(() => {
        setLoading(true);
        const fetchChatData = async () => {
            await Api.getAllChats({ email: user.email })
                .then((res) => {
                    console.log(res.data)
                    if (res.data.message === 'success') {
                        const lastIdx = res.data.chat.length - 1;
                        dispatch(setCurrChat(res.data.chat[lastIdx]?.chatInfo));
                        setChatData(res.data.chat[lastIdx]?.chatInfo);
                        setLoading(false);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
        fetchChatData();
    }, [change]);

    function timeout(delay) {
        return new Promise(res => setTimeout(res, delay));
    }

    const sendMessage = async () => {
        if (message.trim() === '') {
            toast.error('Message cannot be empty');
            return;
        }
        let chat = currChat;
        console.log(currChat)
        if (!chat) {
            chat = [];
        }
        console.log(chat)
        // chat.push({ sender: 'user', message: message });
        const newChat = {
            name: 'User',
            message: message
        }
        chat = [...chat, newChat];
        dispatch(setCurrChat(chat));
        setChatData(chat);
        await Api.testChat({ email: user.email, query: message, start: startLocationInfo?.formatted_address, end: destinationInfo?.formatted_address})
        .then(async (res) => {
            console.log(res.data)
            await timeout(2000);
            console.log(audio, video)
            if (!audio && video) {
                speak({ text: res.data.text, voice: voices[0], rate: 1 });
                console.log('speaking')
                dispatch(setEndVid(true));
            }
            setMessage('');
                if (res.data.message === 'success') {
                    setChange(!change);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <div className='bg-white relative w-full h-full shadow-2xl shadow-slate rounded-xl p-4 flex flex-col'>
            {loading ? 
            (<div className='w-full h-full flex items-center justify-center'>
                <CircularProgress />
            </div>) 
            : (<>
            <div className='w-full h-[88%]'>
                <Chat chatData={currChat} />
            </div>
            {(!currChat || currChat?.length === 0) && (<div
            style={{
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} 
            className='absolute w-full text-center text-7xl font-bold opacity-15'>
                ANY TRAVEL PLANS?
            </div>)}
            <div className='bg-white w-full flex items-center gap-2 justify-evenly p-4'>
                <TextField
                    id="outlined-multiline-static"
                    label="Type your Query"
                    multiline
                    maxRows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    variant="outlined"
                    className='w-full h-full'
                    sx={{
                        '& .MuiInputBase-root': {
                            backgroundColor: '#F5F5F5',
                            borderRadius: '100px',
                        },
                    }}
                />
                <span>
                    <Tooltip title='Upload Image' arrow>
                        <IconButton>
                            <UploadFileIcon sx={{ fontSize: '2rem', color: '#662d91' }} />
                        </IconButton>
                    </Tooltip>
                </span>
                <span>
                    <Tooltip title='Send' arrow>
                    <IconButton onClick={sendMessage}>
                        <SendIcon sx={{ fontSize: '2rem', color: '#662d91' }} />
                    </IconButton>
                    </Tooltip>
                </span>
            </div>
            </>)}
        </div>
    );
};

export default ChatBox;