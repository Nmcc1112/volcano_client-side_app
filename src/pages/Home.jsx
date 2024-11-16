import React, { useState, useEffect } from 'react';
import { ReactTyped } from "react-typed";

const Home = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        require('../images/volcanoe1.jpg'),
        require('../images/volcanoe2.jpg'),
    ];


    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex((previousIndex) => (previousIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            <div className='h-[90vh] relative'>
                <img
                    src={images[currentImageIndex]}
                    alt="Volcano Image"
                    className='object-cover w-full max-h-[90vh]' />
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl font-bold text-center text-[#17EBA0]">
                    <ReactTyped strings={["Volcanoes of the World"]} typeSpeed={100} loop />
                </h1>
            </div>
        </>
    );
}

export default Home;
