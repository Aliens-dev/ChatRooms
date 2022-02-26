import React, { useEffect, useState } from 'react';

const useAudio = (url) => {

    const [audio] = useState(new Audio(url))
    const [play,setPlay] = useState(false);

    const toggle = () => {
        setPlay(! play);
    }

    useEffect(() => {
        play ? audio.play() : audio.pause();
    }, [play])

    useEffect(() => {
        audio.addEventListener('ended', () => setPlay(false))
        return () => audio.removeEventListener('ended', () => setPlay(false))
    }, [])

    
    return [play, toggle];
};

export default useAudio;