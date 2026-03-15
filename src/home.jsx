import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useRef, useMemo} from 'react';

//components
import CurvedLoop from './components/CurvedLoop';
import RotatingText from "./components/RotatingText";
import FaultyTerminal from './components/FaultyTerminal';

import { useNavigate } from 'react-router-dom';


if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function Home() {

    const container = useRef();
    const pageNames = ["DRAWINGS","ANIMATIONS","OTHERS"];

    const[i, set_i] = useState(0);
    const[isTextHovered, setIsTextHovered] = useState(false);
    const[isTextClicked, setIsTextClicked] = useState(false);
    const[direction, setDirection] = useState(1);
    const[upTri, setUpTri] = useState("△");
    const[downTri, setDownTri] = useState("▽");

    const navigate = useNavigate();


    // FRAMER MOTION
    const { scrollY } = useScroll();

    const smoothScrollY = useSpring(scrollY, {
        stiffness: 100,
        damping: 30,   
        restDelta: 0.001 
    });

    const smoothScrollY2 = useSpring(scrollY, {
        stiffness: 50,
        damping: 20,
        mass: 1.5, 
        restDelta: 0.001
    });

    const opacityTV = useTransform(smoothScrollY, [2000,3400], [0,1]);
    const scaleTV = useTransform(smoothScrollY, [2000,3400], [0, 1.2]);
    const scale1 = useTransform(smoothScrollY, [600,1100], [0,1]);
    const scale2 = useTransform(smoothScrollY, [1100,1600], [0,1]);
    const scale3 = useTransform(smoothScrollY, [1600,2100], [0,1]);
    const scaleY = useTransform(smoothScrollY2, [200, 800, 900, 1600], [0, 1, 1, 0]);
    const origin = useTransform(smoothScrollY, [200, 800, 900, 1600], [0, 0, 1, 1]);

    
  return (

    <div className='w-full h-[800vh] z-0 relative bg-[#ffca2c]' ref={container}>

        <style dangerouslySetInnerHTML={{__html: `
          html, body {
            background-color: #ffca2c !important;
            overscroll-behavior: none !important;
            margin: 0;
            padding: 0;
          }
        `}} />




        <div className="fixed inset-0 -z-20 pointer-events-none bg-[#ffca2c] scale-[1.2]">
            
            <div className="absolute inset-0 w-full h-full mix-blend-screen opacity-90">
                {useMemo(() => (
                    <FaultyTerminal
                        scale={2.4}
                        gridMul={[2, 1]}
                        digitSize={0.8}
                        timeScale={1}
                        pause={false}
                        scanlineIntensity={1.1}
                        glitchAmount={1}
                        flickerAmount={1}
                        noiseAmp={1}
                        chromaticAberration={0}
                        dither={0}
                        curvature={0.3}
                        tint="#faa622"
                        pageLoadAnimation={false}
                        brightness={0.8}
                    />
                ), [])}
            </div>
        </div>

        <pre style={{ 
            fontFamily: 'monospace', 
            lineHeight: '1.2', 
            color: '#6E3918', 
            whiteSpace: 'pre',
            textAlign: 'center',
            marginTop: '2%',
            fontSize:"30%"
        }}>
        {`
                                                                ██                                         
                                                                ████                                         
                                            ███              ██████                                         
                                            ████            ███████                                          
                                            █████         ██████████                                          
                                        ████████     █████████████                                          
                                        ██   ███████████      █████                                          
                                        ███  █████████   ██ █   ███   ██████████████                          
                            █████    █       █████  █      █  ███     █████████████████                     
                        ██████    ██        ███             ████       ███████████████████                 
                        ████████  ████   █     █               ███         ███████████████████████            
                    ███████████     ██ ██          ██ ███    ███         ██████████████████████████         
                    ████████████         █████         ████      ███      █████████████████████████████       
                ██████████████          █  ██ █ ██                ██  ██████████████████████████████████    
                ██████████████████                                   ███████████████████████████████████████  
            █████████████████████                       █  ███   ██████████████████████████████████  ██████
            ████████████████████████████             ███        ██████████████████████████████               
            ████████████████████████████████████      ███    ███████████████████████████████                  
        ██████████████████████████████████████          ████████████████████████████████                   
        ████████████████████████████████████████████████████████████████████████████████                    
        █████      █████████████████████████████████████████████████████████████████████                     
        ██             ███████████████████████████████████████████████████████                                
        █                ████       ████████████████████████████████████████                                  
                        █             ███████████████████████████████ ████                                  
                                        ███         ██████████████                                          
                                                        █████████                                           
                                                            ██████                                           
                                                                                                                                    
        `}
        </pre>

    
        {/* TITRE */}
        <div className="w-full z-10 relative -mt-96"> 
            <CurvedLoop 
                marqueeText="OXFRZ's ✦ ART ✦ GALLERYㅤㅤㅤ"
                speed={2}
                curveAmount={300}
                direction="right"
                interactive
                className="custom-text-style"
            />
        </div>


        

        {/* DIV TV & SCREEN */}
        <motion.div  
        className='sticky top-14 flex items-center justify-center  z-20'
        style={{
            opacity: opacityTV,
            scale: scaleTV,
        }}
        >

            <motion.div
            animate={{ 
                scale: isTextClicked ? 3.8 : 1, 
                x: isTextClicked ? "20%" : 1,
                y: isTextClicked ? "-30%" : 1,
            }}
            transition={{ 
                duration: 0.6, 
                ease: "backIn"
            }}
            >

                <div className='relative inline-block h-[40vh] md:h-[60vh] lg:h-[75vh]'>

                    <img
                    src='./tv_clear.png'
                    className='h-full w-auto relative z-30 block pointer-events-none'
                    alt='TV'
                    />

                    {isTextClicked && (
                    <video 
                        width="100%" 
                        height="100%" 
                        muted 
                        autoPlay 
                        className='absolute top-[34%] right-[4%] w-[100%] h-[55%] z-20 pointer-events-none object-cover'
                    >
                        <source src="TRANSITION.webm" type='video/webm'/>
                    </video>
                    )}

<div 
    className="absolute top-[34%] left-[2%] w-[80%] h-[55%] rounded-xl overflow-hidden flex items-center justify-center bg-zinc-700 transition-colors duration-300"
>
    <div 
        className={`absolute inset-0 z-0 transition-opacity duration-700 
            ${isTextClicked ? "opacity-0" : "opacity-100"} 
            bg-[radial-gradient(circle,_#FBE106_0%,_#fac023_60%,_#e88f15_100%)]`}
    />

    <div className="relative z-10 w-full h-full pointer-events-none">

        <span 
        className={`absolute left-[45%] top-[5%] text-2xl text-[#6E3918] pointer-events-auto hover:cursor-pointer transition-opacity duration-300 ${isTextClicked ? "opacity-0" : "opacity-100"}`}
        
        onClick={ () => {
            setDirection(-1)
            if(i==0) { set_i(pageNames.length - 1); } else { set_i(i-1) }
        }}
        
        onMouseEnter={ () => {
            setUpTri("▲");
        }} 
        
        onMouseLeave={ () => {
            setUpTri("△")
        }}

        >{upTri}</span>

        <span className={`pointer-events-auto ${ isTextHovered ? 'text-[#ff7700]' : 'text-[#6E3918]' } text-6xl absolute left-[2%] top-[40%] transition-all duration-300 ${isTextClicked ? "opacity-0" : "opacity-100"}`}>
            ▸
        </span>

        <div 
            className={`pointer-events-auto w-full h-full transition-all duration-300 flex items-center justify-center ${isTextClicked ? "opacity-0" : "opacity-100"}`}

        >
            <RotatingText
                index={i}               
                texts={pageNames}  
                direction={direction}   
                mainClassName="font-persona text-[#6E3918] text-[2.5em] hover:text-[2.7em] hover:text-[#ff7700] transition-all duration-300 overflow-hidden py-8 hover:cursor-pointer"
                staggerFrom={"last"}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5"

                onMouseEnter={() => setIsTextHovered(true)}
                onMouseLeave={() => setIsTextHovered(false)}

                onClick={() => {
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    setTimeout( () => { setIsTextClicked(true); }, 300)

                    const destination = pageNames[i].toLowerCase();

                    setTimeout(() => {
                        navigate(`/${destination}`)
                    }, 3400)
                }}
            />

        </div>

        <span
        className={`absolute left-[45%] bottom-[5%] text-2xl text-[#6E3918] pointer-events-auto hover:cursor-pointer transition-opacity duration-300 ${isTextClicked ? "opacity-0" : "opacity-100"}`}
       
        onClick={() => {
            setDirection(1);
            set_i((i+1) % pageNames.length);
        }}

        onMouseEnter={ () => {
            setDownTri("▼");
        }}  

        onMouseLeave={ () => {
            setDownTri("▽")
        }}

        >{downTri}</span>

    </div>
</div>

                </div>

            </motion.div>
        </motion.div>

        {/* 3DIVS CONTAINER */}
        <div 
        className='w-[80%] h-[70vh] mx-auto z-0 sticky top-32 pointer-events-none'>
            <motion.div className='bg-[#FBE106] w-full h-full relative rounded-xl z-0' 
            style={{ scale: scale1 }}
            >
                <motion.div className='bg-[#FF9D00] absolute inset-8 rounded-xl'
                style={{ scale: scale2 }}
                >
                    <motion.div className='bg-[#6E3918] absolute inset-8 rounded-xl'
                    style={{ scale: scale3 }}
                    / >
                </motion.div>
            </motion.div>
        </div>

        <motion.div
        className='fixed top-0 -z-10 pointer-events-none'
        style={{
            scaleY: scaleY,
            originY: origin,
        }}
        >
                <img src="./stripes.png" alt="stripes" />
        </motion.div>

      </div>
  )
}

export default Home