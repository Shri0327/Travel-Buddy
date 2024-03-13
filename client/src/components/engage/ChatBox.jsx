import React, { useState } from 'react';
import { TextField, IconButton, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { BgText } from './BgText';

const ChatBox = ({ customMsg }) => {
    const [message, setMessage] = useState(customMsg || '');
    return (
        <div className='relative w-full h-full shadow-2xl shadow-slate rounded-xl p-4 flex flex-col'>
            <div
            style={{
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }} 
            className='absolute w-full text-center text-7xl font-bold opacity-15'>
                ANY TRAVEL PLANS?
            </div>
            <div className='absolute w-[98%] bottom-4 flex items-center gap-2 justify-evenly'>
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
                            backgroundColor: 'white',
                            borderRadius: '100px',
                        }
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
                    <IconButton>
                        <SendIcon sx={{ fontSize: '2rem', color: '#662d91' }} />
                    </IconButton>
                    </Tooltip>
                </span>
            </div>
        </div>
    );
};

export default ChatBox;