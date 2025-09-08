'use client'

import React, { useState } from 'react';
import { Instrument_Serif } from 'next/font/google';
import Image from 'next/image';

const instrumentSerif = Instrument_Serif({
    weight: "400",
    subsets: ["latin"],
});

const Hero = () => {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerateLogo = async () => {
        setIsLoading(true);
        setImageUrl('');

        const response = await fetch(`/api/createLogo?prompt=${encodeURIComponent(prompt)}`);
        const result = await response.json();
        console.log(result)
        const url = result.images[0].url;
        setImageUrl(url);
        setIsLoading(false);
    };

    return (
        <div className={`${instrumentSerif.className} mt-60 p-10 flex justify-center items-center flex-col font-bold`}>
            <h1 className='text-8xl'>
                LogoGen.
            </h1>
            <p className='font-semibold m-5 md:text-2xl text-xl'>
                Convert your idea into a professional logo!
            </p>
            <textarea
                className='shadow-2xl mt-10 h-50 md:w-130 w-60 p-2 scale-120'
                placeholder='Describe Your Startup Idea!'
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
            />
            <button
                className='bg-black p-3 rounded-3xl mt-10 cursor-pointer hover:opacity-90 hover:scale-120 transition-all transition-1 text-white'
                onClick={handleGenerateLogo}
            >
                {
                    isLoading == false ? (
                        <h1>Go →</h1>
                    ) : (
                        <h1>Generating...</h1>
                    )
                }
            </button>


            {imageUrl && (
                <div className='mt-10 flex flex-col items-center'>
                    <h2 className='text-4xl font-bold mb-4'>Your Logo:</h2>
                    <Image src={imageUrl} alt="Generated Logo" width={512} height={512} className='rounded-xl shadow-lg' />
                    <a
                        href={imageUrl}
                        download={`${prompt}.png`}
                        className='bg-black p-3 rounded-3xl mt-5 cursor-pointer hover:opacity-90 hover:scale-110 transition-all transition-1 text-white '
                    >
                        Download Logo
                    </a>
                </div>
            )}
        </div>
    );
};

export default Hero;