import React, { useState } from 'react';
import AiBox from '../components/engage/AiBox';
import ChatBox from '../components/engage/ChatBox';
import Center from '../animated-components/Center';

const Engage = () => {
    const [customMsg, setCustomMsg] = useState('');

    return (
        <Center>
        <div className='w-full h-[90vh] flex items-center justify-center gap-4 p-4'>
            <div className='h-full md:w-1/5 w-[40%] flex items-center justify-center'>
                <AiBox setCustomMsg={setCustomMsg} />
            </div>
            <div className='h-full md:w-3/4 w-[60%]'>
                <ChatBox customMsg={customMsg} />
            </div>
        </div>
        </Center>
    );
};

export default Engage;