import React, { useEffect, useRef, useState } from 'react'
import Button from './Button';
import { TiLocationArrow } from 'react-icons/ti';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [loadedVideos, setLoadedVideos] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const totalVideos = 4;
    console.log(totalVideos)
    const nextVideoRef = useRef(null);

    const handleVideoLoad = () => {
        setLoadedVideos((prev) => prev + 1);
    }

    const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

    const handleMiniVdClick = ()=>{
        setHasClicked(true);
        setCurrentIndex(upcomingVideoIndex);
    }

    useEffect(()=>{
        if(loadedVideos === totalVideos - 1){
            setIsLoading(false);
        }
    })

    useGSAP(() => {
        if(hasClicked){
         gsap.set('#next-video', {visibility: 'visible'});

         gsap.to('#next-video', {
            transformOrigin: 'center center',
            scale: 1,
            width: '100%',
            height: '100%',
            duration: 1,
            ease: 'power1.inOut',
            onStart: () => nextVideoRef.current.play(),
         })

         gsap.from('#current-video', {
            transformOrigin: 'center center',
            scale: 0,
            duration: 1.5,
            ease: 'power1.inOut'
         })

        }
     
    }, {dependencies: [currentIndex], revertOnUpdate: true})

      useGSAP(() => {
      gsap.set("#video-frame", {
      clipPath: "polygon(28% 0, 72% 0, 86% 90%, 14% 90%)",
      borderRadius: "0% 0% 40% 10%",
       });

       gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });

      // MOBILE ONLY
    const mm = gsap.matchMedia();

    mm.add("(max-width: 768px)", () => {
    gsap.to(".gaming-text", {
      x: "-30vw",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  });
  });

    const getVideoSrc = (index) => `/videos/hero-${index}-fixed.mp4`;

  return (
    <div className='relative overflow-x-hidden w-screen h-dvh'>

       {isLoading && 
         <div className='flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50'>
            <div className='three-body'>
                <div className='three-body__dot'></div>
                <div className='three-body__dot'></div>
                <div className='three-body__dot'></div>
            </div>
         </div>

       }

        <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
            <div>
                <div className=' mask-clip-path absolute absolute-center z-50 size-64 max-md:translate-y-1 cursor-pointer overflow-hidden rounded-lg transition-transform duration-500 hover:scale-125'>
                    <div onClick={handleMiniVdClick} 
                     className='origin-center' >
                        <video
                        ref={nextVideoRef}
                        src={getVideoSrc(upcomingVideoIndex)}
                        muted
                        loop
                        autoPlay
                        id='current-video'
                        className='size-64 origin-center scale-150 object-cover object-center'
                        onLoadedData={handleVideoLoad}
                    />
                    </div>
                </div>
                 <video ref={nextVideoRef}
                    src={getVideoSrc(currentIndex)}   
                    loop
                    muted
                    id='next-video'
                    className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                    onLoadedData={handleVideoLoad}              
                />

                <video 
                 src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                 loop
                 muted
                 autoPlay
                 className='absolute left-0 top-0 size-full object-cover object-center'
                 onLoadedData={handleVideoLoad}              
                />
            </div>
            <h1 className='gaming-text special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75'>G<b>a</b>ming</h1>

            <div className='absolute left-0 top-0 z-40 size-full'>
                <div className='mt-24 px-5 sm:px-10'>
                  <h1 className='special-font hero-heading text-blue-100'>redefi<b>n</b>e</h1>

                  <p className='mb-5 max-w-64 font-robert-regular text-blue-100'>Enter the Metagame Layer <br /> Unleash the Play Economy </p>

                  <Button id="watch-trailer" title="Watch Trailer" containerClass = "!bg-yellow-300 flex-center gap-1" leftIcon={<TiLocationArrow/>} />
                </div>
            </div>
        </div>
        <h1 className='gaming-text special-font hero-heading absolute bottom-5 right-5  text-black'>G<b>a</b>ming</h1>
    </div>
  )
}

export default Hero
