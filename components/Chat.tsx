'use client';
import React, { useEffect, useState, KeyboardEvent } from 'react'
import Notification from './Notification';
type Props = {}

type Who = {
    who: string,
    text: string
}

function Chat({ messages, setMessages }: any) {

    const [inputMessage, setInputMessage] = useState<string>('');
    const [isLoading, setLoading] = useState<boolean>(false)

    const handleSubmit = async () => {
        setLoading(true);
        setMessages(current => [...current, { who: 'client', text: inputMessage }])
        let response = await fetch('http://localhost:11434/api/generate', { method: 'POST', body: JSON.stringify({ model: 'gemma:2b', prompt: inputMessage, stream: false }) })
        let parsed = await response.json();
        setInputMessage('');
        setMessages(current => [...current, { who: 'server', text: parsed.response }])
        setLoading(false);
    }

    const test = () => {
        setMessages(current => [...current, { who: 'server', text: inputMessage }])
    }
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className='w-full bg-primary lg:ml-[20px] ml-0 rounded-xl hh my-[48px] relative px-[20px] overflow-x-hidden'>
            {isLoading && <Notification />}
            <div className='w-full hh absolute bottom-0 justify-between pb-[100px] pr-10 overflow-y-scroll sh'>
                {messages?.map((item) => (
                    <div className={item.who == 'server' ? 'w-full flex flex-col items-start' : 'w-full flex flex-col  items-end'}>
                        <div className='text-text bg-box p-4 rounded-lg my-2 w-6/12 float-right'>
                            {item.text}
                        </div>
                    </div>
                ))}
            </div>
            <div className='absolute bottom-[0px] wc pb-[20px] flex items-center gap-x-4 bg-primary'>
                <input onKeyDown={handleKeyPress} value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} type="text" className='text-text bg-input wc border-none outline-none rounded-xl p-4' placeholder='Let the magic begin, Ask a question' />
                <button onClick={handleSubmit} className='text-text bg-input p-4 rounded-xl mr-4 hover:bg-[#36363a]'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                    </svg>
                </button>
            </div>
        </div>
    )
}

export default Chat