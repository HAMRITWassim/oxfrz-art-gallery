import { motion, transform, useMotionValueEvent, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react'


function App() {

    const mainTitle = useRef();
    const container = useRef();
    const pageName = useRef();
    const transition = useRef();

    const pageNames = ["DRAWINGS","ANIMATIONS","OTHERS"];

    const[i, set_i] = useState(0);
    const[isTextHovered, setIsTextHovered] = useState(false);
    const[isTextClicked, setIsTextClicked] = useState(false);


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

    const opacityTV = useTransform(
        smoothScrollY,
        [2000,3400],
        [0,1]
    );

    const scaleTV = useTransform(
        smoothScrollY,
        [2000,3400],
        [0, 1.2]
    );

    const scale1 = useTransform(
        smoothScrollY,
        [600,1100],
        [0,1]
    );
    
    const scale2 = useTransform(
        smoothScrollY,
        [1100,1600],
        [0,1]
    );

    const scale3 = useTransform(
        smoothScrollY,
        [1600,2100],
        [0,1]
    );

    const scaleY = useTransform(
        smoothScrollY2,
        [200, 800, 900, 1600],
        [0, 1, 1, 0]
    );

    const origin = useTransform(
        smoothScrollY,
        [200, 800, 900, 1600],
        [0, 0, 1, 1]
    );

    
  return (
    <div className='w-full h-[800vh] bg-[#FFCC00] z-0' ref={container}>

    
    
    {/* TITRE */}

      <div
      ref={mainTitle}
      className='pt-32'
      >


        <h1 className="text-[#6E3918] font-persona text-8xl text-center">

            OXFRZ's

             <br />

            <span className=' font-david font-bold'>
              art gallery
            </span>
        </h1>


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
                    className={`absolute z-10 ${isTextClicked ? "bg-zinc-700" : "bg-[#FBE106]"} top-[34%] left-[2%] w-[80%] h-[55%] rounded-xl overflow-hidden flex items-center justify-center transition-colors duration-300`}
                    >
                        <div>

                            <span 
                            className={`absolute left-[45%] top-[5%] text-2xl text-[#6E3918] hover:cursor-pointer ${isTextClicked ? "opacity-0" : "opacity-100"}`}
                            onClick={ () => {

                                if(i==0)
                                {
                                    set_i(pageNames.length - 1);
                                }

                                else{
                                    set_i(i-1)
                                }


                            }}
                            >△</span>


                            <span className={`${ isTextHovered ? 'text-[#ff7700]' : 'text-[#6E3918]' } text-6xl absolute left-[2%] top-[40%] transition-all duration-300 ${isTextClicked ? "opacity-0" : "opacity-100"}`}>
                                ▸
                            </span>


                            <h2 
                            className={`font-persona text-[#6E3918] text-[2.5em] hover:cursor-pointer hover:text-[2.7em] hover:text-[#ff7700] transition-all duration-300 ${isTextClicked ? "opacity-0" : "opacity-100"}`}
                            onMouseEnter={() => {
                                setIsTextHovered(true);
                            }}

                            onMouseLeave={() => {
                                setIsTextHovered(false);
                            }}

                            onClick={() => {

                                window.scrollTo({
                                    top: document.body.scrollHeight,
                                    behavior: 'smooth'
                                });

                                setTimeout( () => {

                                    setIsTextClicked(true);

                                }, 300)
                            }}
                            >
                                {pageNames[i]} 
                                
                            </h2>

                            <span
                            className={`absolute left-[45%] bottom-[5%] text-2xl text-[#6E3918] hover:cursor-pointer ${isTextClicked ? "opacity-0" : "opacity-100"}`}
                            onClick={() => {
                                set_i((i+1) % pageNames.length);
        

                            }}
                            >▽</span>

                        </div>
                    </div>

                </div>


            </motion.div>
        </motion.div>


        {/* 3DIVS CONTAINER */}
        <div 
        className='w-[80%] h-[70vh] mx-auto z-0 sticky top-32'>


            <motion.div className='bg-[#FBE106] w-full h-full relative rounded-xl z-0' 
            style={{

                scale: scale1,
            }}
            >

                <motion.div className='bg-[#FF9D00] absolute inset-8 rounded-xl'
                style={{
    
                    scale: scale2,
                }}
                >

                    <motion.div className='bg-[#6E3918] absolute inset-8 rounded-xl'
                    style={{
        
                        scale: scale3,
                    }}
                    / >

                </motion.div>

            </motion.div>


        </div>


        <motion.div
        className='fixed top-0 -z-10'
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

export default App
