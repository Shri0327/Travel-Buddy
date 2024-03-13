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

const AiCard = () => {
    const dispatch = useDispatch();
    const { audio, video, endVid } = useSelector((state) => state.aiCard);

    return (
        <div className='h-1/2 w-full shadow-slate shadow-md rounded-xl'>
            {!video ? (
                <div className='w-full h-full flex items-center justify-center gap-4'>
                    <NoAccountsRoundedIcon sx={{ fontSize: 100 }} />
                </div>
            ) : (
                <div className='w-full h-full flex items-center justify-center gap-4'>
                    <img src={endVid ? maleSpeak : maleStatic} alt="" className='w-full h-full object-cover' />
                </div>
            )}

        </div>
    );
};

export default AiCard;