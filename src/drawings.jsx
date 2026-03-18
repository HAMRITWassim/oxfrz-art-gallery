import { useState, useRef, } from 'react';

//components
import FaultyTerminal from './components/FaultyTerminal';
import BlurText from './components/BlurText';

function Drawings() {

    const evaText = "text-white font-[900] font-times inline-block scale-x-[0.57] origin-center uppercase [text-shadow:0_0_5px_rgba(255,255,255,0.8),0_0_15px_rgba(255,255,255,0.3)]"

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };


    return (

        <div className='w-full h-[100vh] relative bg-[#000000] flex flex-col justify-center '>
        
        
            {/* <h2 className={`${evaText} text-[30vh] `}> DRAWINGS</h2> */}
        
            <div className='self-center'>
                <BlurText
                text="DRAWINGS"
                delay={200}
                animateBy="words"
                direction="bottom"
                onAnimationComplete={handleAnimationComplete}
                className={`${evaText} text-[60vh] text-center `}
                />
            </div>
        
        </div>


    )
}


export default Drawings