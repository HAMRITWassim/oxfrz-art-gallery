import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useState, useMemo, useLayoutEffect} from 'react';

//components
import CurvedLoop from './components/CurvedLoop';
import RotatingText from "./components/RotatingText";
import FaultyTerminal from './components/FaultyTerminal';
import BlurText from './components/BlurText';

import { useNavigate, useLocation } from 'react-router-dom';


if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}

function Home() {

    const evaText = " font-[900] font-times inline-block scale-x-[0.57] origin-center uppercase [text-shadow:0_0_5px_rgba(255,255,255,0.8),0_0_15px_rgba(255,255,255,0.3)]"


    const pageNames = ["DRAWINGS","ANIMATIONS","OTHER"];

    const navigate = useNavigate();
    const location = useLocation();

    const[i, set_i] = useState(0);
    const[isTextHovered, setIsTextHovered] = useState(false);
    const[isTextClicked, setIsTextClicked] = useState(false);
    const[direction, setDirection] = useState(1);
    const[upTri, setUpTri] = useState("△");
    const[downTri, setDownTri] = useState("▽");
    const isComingFromDrawings = location.state && location.state.scrollToBottom;
    const [isReady, setIsReady] = useState(!isComingFromDrawings);




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
    const titleOpacity = useTransform(smoothScrollY, [0,600], [1,0]);

   useLayoutEffect(() => {
        if (isComingFromDrawings) {
            const bottomPosition = document.documentElement.scrollHeight;
            
            window.scrollTo({ top: bottomPosition, behavior: 'auto' });

            scrollY.jump(bottomPosition);
            smoothScrollY.jump(bottomPosition);
            smoothScrollY2.jump(bottomPosition);


            window.history.replaceState({}, document.title);

            const timer = setTimeout(() => {
                setIsReady(true);
            }, 50);

            return () => clearTimeout(timer);
        } else {
            window.scrollTo({ top: 0, behavior: 'auto' });
            scrollY.jump(0);
            smoothScrollY.jump(0);
            smoothScrollY2.jump(0);
            setIsReady(true);
        }
    }, [isComingFromDrawings, scrollY, smoothScrollY, smoothScrollY2]);



    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };
    
  return (

   <div 
        className='w-full h-[800vh] z-0 relative bg-[#ffca2c]'
        style={{ 
            opacity: isReady ? 1 : 0, 
            transition: 'opacity 0.1s ease-out' 
        }}
    >

        <style dangerouslySetInnerHTML={{__html: `
          html, body {
            background-color: #ffca2c !important;
            overscroll-behavior: none !important;
            margin: 0;
            padding: 0;
          }
        `}} />




        <div className="fixed inset-0 -z-20 pointer-events-none bg-[#ffca2c] scale-[1.2]">
            
            {/* BACKGROUND */}
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

        {/* ASCII BILLY BAT */}
        <pre style={{ 
            fontFamily: 'monospace', 
            lineHeight: '1.1', 
            color: '#6E3918', 
            whiteSpace: 'pre',
            textAlign: 'center',
            marginTop: '2%',
            fontSize:"4px",
            height:"6cqw"
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



        <motion.div 
            className='relative flex flex-col items-center w-full mt-4 mb-20 pointer-events-none'
            style={{opacity: titleOpacity}}
        >
            <BlurText
                text="OXFRZ"
                delay={200}
                animateBy="words"
                direction="bottom"
                onAnimationComplete={handleAnimationComplete}
                className={`${evaText} text-[#6E3918] text-[28cqw] leading-none`}
            /> 


            <div className="flex justify-center items-center scale-x-[0.8]">

                <BlurText
                    text="✦"
                    delay={200}
                    animateBy="words"
                    direction="bottom"
                    onAnimationComplete={handleAnimationComplete}
                    className={`font-sans-serif text-[#6E3918] uppercase font-[700]  text-[6cqw] leading-none -mt-[4cqw] [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,255,0.3)]`}
                /> 


                <BlurText
                    text=" ART GALLERY "
                    delay={200}
                    direction="bottom"
                    onAnimationComplete={handleAnimationComplete}
                    className={`font-sans-serif text-[#6E3918] uppercase font-[700]  text-[10cqw] leading-none -mt-[4cqw] [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,255,0.3)]`}
                /> 


                <BlurText
                    text="✦"
                    delay={200}
                    animateBy="words"
                    direction="bottom"
                    onAnimationComplete={handleAnimationComplete}
                    className={`font-sans-serif text-[#6E3918] uppercase font-[700] text-[6cqw] leading-none -mt-[4cqw] [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,255,0.3)]`}
                /> 


            </div>

        </motion.div>

        

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

                    {/* MAIN TV */}
                    <img
                    src={`${import.meta.env.BASE_URL}tv_clear.png`}
                    className='h-full w-auto relative z-30 block pointer-events-none'
                    alt='TV'
                    />

                    {/* TV TRANSITION */}
                    {isTextClicked && (
                    <video 
                        width="100%" 
                        height="100%" 
                        muted
                        preload="auto" 
                        autoPlay 
                        className='absolute top-[34%] right-[4%] w-[100%] h-[55%] z-20 pointer-events-none object-cover'
                    >
                        <source src={`${import.meta.env.BASE_URL}TRANSITION.webm`} type='video/webm'/>
                    </video>
                    )}


                    <div 
                        className="absolute top-[34%] left-[2%] w-[80%] h-[55%] rounded-xl overflow-hidden flex items-center justify-center bg-[#000000] transition-colors duration-300"
                    >
                        <div 
                            className={`absolute inset-0 z-0 transition-opacity duration-700 
                                ${isTextClicked ? "opacity-0" : "opacity-100"} 
                                bg-[radial-gradient(circle,_#FBE106_0%,_#fac023_60%,_#e88f15_100%)]`}
                        />

                        <div className="relative z-10 w-full h-full pointer-events-none">

                            <span 
                            className={`absolute left-[45%] top-[5%] text-[2cqw] text-[#6E3918] pointer-events-auto hover:cursor-pointer transition-opacity duration-300 ${isTextClicked ? "opacity-0" : "opacity-100"}`}
                            
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

                            <span className={`pointer-events-auto ${ isTextHovered ? 'text-[#ff7700]' : 'text-[#6E3918]' } text-[3cqw] absolute left-[2%] top-[39%] transition-all duration-300 ${isTextClicked ? "opacity-0" : "opacity-100"}`}>
                                ▸
                            </span>

                            {/* TV TEXT */}
                            <div 
                                className={`pointer-events-auto w-full h-full transition-all duration-300 flex items-center justify-center ${isTextClicked ? "opacity-0" : "opacity-100"}`}

                            >
                                <RotatingText
                                    index={i}               
                                    texts={pageNames}  
                                    direction={direction}   
                                    mainClassName="font-persona text-[#6E3918] text-[2.8cqw] hover:text-[2.85cqw] hover:text-[#ff7700] transition-all duration-300 overflow-hidden py-8 hover:cursor-pointer"
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
                            className={`absolute left-[45%] bottom-[5%] text-[2cqw] text-[#6E3918] pointer-events-auto hover:cursor-pointer transition-opacity duration-300 ${isTextClicked ? "opacity-0" : "opacity-100"}`}
                        
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
                <img src={`${import.meta.env.BASE_URL}stripes.png`} alt="stripes" />
        </motion.div>

      </div>
  )
}

export default Home