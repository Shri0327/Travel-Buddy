import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '@mui/material/Card';
import NoAccountsRoundedIcon from '@mui/icons-material/NoAccountsRounded';
import { toast } from 'react-toastify';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import { CircularProgress, IconButton, Tooltip } from '@mui/material';
import maleStatic from '../../assets/ai/Male-Static.png'
import femaleStatic from '../../assets/ai/Female-Static.png'
import maleSpeak from '../../assets/ai/Male.gif'
import femaleSpeak from '../../assets/ai/Female.gif'
import Api from '../../api';
import AiCard from './AiCard';
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import VideocamOffOutlinedIcon from '@mui/icons-material/VideocamOffOutlined';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import MicOffOutlinedIcon from '@mui/icons-material/MicOffOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';
import { toggleAudio, toggleVideo } from '../../redux/features/aiCard';

const AiBox = ({ setCustomMsg }) => {
    const dispatch = useDispatch();
    const { audio, video, endVid } = useSelector((state) => state.aiCard);

    return (
        <div className='w-full h-full flex flex-col items-center gap-4'>
            <AiCard />
            <div className='w-full flex items-center justify-around'>
                <Tooltip title={video ? 'Turn Off Video' : 'Turn On Video'} arrow>    
                <IconButton sx={{
                    color: 'white',
                    padding: '10px',
                    backgroundColor: '#662d91',
                    '&:hover': {
                        backgroundColor: '#662d91',
                    },
                }}
                    onClick={() => dispatch(toggleVideo(!video))}
                >
                    {video ? (<VideocamOffOutlinedIcon sx={{ fontSize: '2rem' }} />) : (<VideocamOutlinedIcon sx={{ fontSize: '2rem' }} />)}
                </IconButton>
                </Tooltip>
                <Tooltip title={audio ? 'Turn Off Audio' : 'Turn On Audio'} arrow>
                <IconButton sx={{
                    color: 'white',
                    padding: '10px',
                    backgroundColor: '#662d91',
                    '&:hover': {
                        backgroundColor: '#662d91',
                    }
                }}
                    onClick={() => dispatch(toggleAudio(!audio))}
                >
                    {audio ? (<MicOffOutlinedIcon sx={{ fontSize: '2rem' }} />) : (<MicNoneOutlinedIcon sx={{ fontSize: '2rem' }} />)}
                </IconButton>
                </Tooltip>
            </div>
            <button className='w-[80%] bg-[#662d91] p-2 flex items-center gap-2 text-white rounded-xl hover:shadow-xl'>
                <AutoAwesomeOutlinedIcon sx={{ fontSize: '2rem', color: 'white' }} />
                <span>
                    Generate an Example
                </span>
            </button>
        </div>
    );
};

export default AiBox;