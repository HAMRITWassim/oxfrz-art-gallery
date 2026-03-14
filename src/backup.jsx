import { motion, transform, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState, useRef } from 'react'

function App() {

    const mainTitle = useRef();

    // FRAMER MOTION
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (current) => {
        const previous = scrollY.getPrevious() ?? 0
        if (current > 80)
        {
            setHidden(true);
        }
        else
        {
            setHidden(false);
        }
    })

    const coloredDiv = {
        initial : {
            opacity: "0%",
            y: "5%",
        },
        animate: {
            opacity: "100%",
            y:"0%",
        },

    };

    const TV = {
        initial: {
            x:"-50%",
            y: "5%",
            scale:0.9,
            transformOrigin: "bottom",

        },

        animate: {
            x:"-50%",
            y: hidden ? "-12%" : "0%",
            scale: hidden ? 1.2 : 1.1,
            transition: {duration: 0.5, ease: "backOut"}
        },



    };


  return (
    <div className='flex flex-col w-full'>
    
    {/* TITRE */}

      <motion.div
      ref={mainTitle}
      className='h-[75vh] flex flex-col pt-32'

      animate={{y: hidden ? "-30%" : "0%", opacity: hidden ? "0%" : "100%"}}
      transition= {{
      duration: 0.5,
      ease: [0.87, 0, 0.13, 1],
        }}
      >

        <h1 className="text-[#6E3918] font-persona text-8xl text-center">

            OXFRZ's

             <br />

            <span className=' font-david font-bold'>
              art gallery
            </span>
        </h1>


      </motion.div>


      {/* TV + BLOCS */}

      <div className='relative w-[90%] mx-auto h-[60vh] mb-32'>

        {/* DIV TV & SCREEN */}
        <motion.div  
        className='absolute left-1/2 top-0 z-10 h-[90vh] w-max flex justify-center'
            initial="initial"
            animate="animate"
            variants={TV}

        >


            <img
            src='./tv_clear.png'
            className='h-full w-auto object-contain relative z-20 pointer-events-none'
            alt='TV'
            / >


            {/* SCREEN */}
            <div 
            className='absolute z-10 bg-yellow-200 top-[33%] left-[2%] w-[80%] h-[56%] rounded-xl overflow-hidden flex items-center justify-center'
            >

                <motion.div
                initial={{opacity: "0%"}}
                animate={{opacity: hidden ? "100%" : "0%"}}
                transition= {{
                duration: 0.5,
                ease: [0.87, 0, 0.13, 1],
                }}
                >

                    <span className='text-[#6E3918] text-6xl absolute left-[5%]'>▸</span>

                    <h2 className='font-persona text-[#6E3918] text-5xl '>
                        DRAWINGS 
                    </h2>


                </motion.div>

            </div>




        </motion.div>


        {/* 3DIVS CONTAINER */}
        <motion.div 
        className='w-full h-full'
        initial={{y:"0%"}}
        animate={{y: hidden ? "30%" : "0%"}}
        transition={{ ease:"easeOut"}}
        
        
        >


            <motion.div 
            
            className='bg-[#FBE106] w-full h-full relative rounded-xl z-0'
            initial="initial"
            animate="animate"
            variants={coloredDiv}
            transition={{ duration: 0.3, ease: "easeInOut" }}

            >

                <motion.div className='bg-[#FF9D00] absolute inset-8 rounded-xl'
                initial="initial"
                animate="animate"
                variants={coloredDiv}
                transition={{ duration: 0.3, ease: "easeOut", delay:0.3 }}
                >

                <motion.div className='bg-[#6E3918] absolute inset-8 rounded-xl'
                initial="initial"
                animate="animate"
                variants={coloredDiv}
                transition={{ duration: 0.5, ease: "easeOut", delay:0.5 }}
                / >

                </motion.div>

            </motion.div>


        </motion.div>



      </div>


    </div>
  )
}

export default App
