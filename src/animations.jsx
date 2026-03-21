import { useState, useRef, useEffect, useCallback} from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

//components
import Aurora from './components/Aurora';
import BlurText from './components/BlurText';
import useEmblaCarousel from 'embla-carousel-react'


import { mediaDates } from './mediaDates';
import { useNavigate } from 'react-router-dom';





const animationModules = import.meta.glob('./assets/animations/*.{mp4,webm,ogg}', { 
    eager: true, 
    import: 'default' 
});

const animations = Object.entries(animationModules).map(([path, url]) => {
    return {
        originalName: decodeURIComponent(path.split('/').pop()), 
        url: url 
    };
});



export default function Animations() {

    const evaText = "font-[900] font-times inline-block scale-x-[0.57] origin-center uppercase [text-shadow:0_0_5px_rgba(255,255,255,0.8),0_0_15px_rgba(255,255,255,0.3)]"

    const videoRef = useRef(null);
    

    const [isTVClicked, setIsTVClicked] = useState(false);


    const navigate = useNavigate();
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);
    

    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        
        onSelect(); 
        emblaApi.on('select', onSelect);
        emblaApi.on('reInit', onSelect); 
    }, [emblaApi, onSelect]);

    

    //FRAMER MOTION
    const { scrollY } = useScroll();

    const smoothScrollY = useSpring(scrollY, {
        stiffness: 50,
        damping: 20,   
        restDelta: 0.001 
    });

    const titleOpacity = useTransform(smoothScrollY, [0,290], [1,0]);

    useEffect(() => {
        if (isTVClicked && videoRef.current) {
            videoRef.current.play().catch(error => console.log("Erreur de lecture :", error));
        }
    }, [isTVClicked]);
    
    useEffect( () => {
        window.scrollTo(0,0);
    }, []);

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    return (

        <div className='w-[100%] h-[100%] overflow-hidden relative bg-[#1e1636]'>
        

            <div className='w-[100%] h-[500vh]  absolute top-0 left-0 z-0 pointer-events-none'>

                <Aurora
                colorStops={["#64397e","#a12c22","#64397e"]}
                amplitude={0.3}
                blend={0.5}
                />

            </div>

            {/* TRANSITION VIDEO */}
            {isTVClicked && (
                <>
                    <video
                        ref={videoRef}
                        width="100%" 
                        height="100%" 
                        muted
                        preload="auto"  
                        autoPlay 
                        className='fixed w-[100%] h-[100%] z-50 pointer-events-none object-cover'
                    >
                        <source src={`${import.meta.env.BASE_URL}REV.webm`} type='video/webm'/>
                    </video>

                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 1.2, ease: "easeInOut" }}
                        className='absolute top-0 left-0 h-full w-full bg-[#ffca2c] z-40 pointer-events-none'
                    />
                </>
            )}

            {/* HOME TV */}
            <div className='w-full flex justify-center pt-6 relative z-30'>
                <img 
                    src='./vortex_tv.png' 
                    alt="Vortex TV"
                    className='h-[100px] w-auto hover:cursor-pointer object-contain [filter:drop-shadow(0_0_2px_rgba(255,255,255,0.2))_drop-shadow(0_0_15px_rgba(255,255,255,0.3))]' 
                    onClick={() => {   
                        setIsTVClicked(true);
                        setTimeout(() => {
                            navigate("/", { state: { scrollToBottom: true } })
                        }, 3200)
                    }}
                />
            </div>

            {/* MAIN TITLE */}
            <motion.div 
            className='self-center relative z-20 flex justify-center items-center w-[100%] h-[60vh] mb-64 pointer-events-none'
            style={{opacity: titleOpacity}}
            >
                <BlurText
                text="ANIMATIONS"
                delay={200}
                animateBy="words"
                direction="bottom"
                onAnimationComplete={handleAnimationComplete}
                className={`${evaText} text-[25cqw] text-[#ccc6ba]`}
                />
            </motion.div>


            <div className="relative w-full max-w-6xl mx-auto z-20 cursor-grab active:cursor-grabbing">
                    {animations.length === 0 ? (
                        <div className="text-white text-center">No Video Found</div>
                    ) : (
                        <>
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex touch-pan-y touch-pinch-zoom">

                                    {animations.map((item, index) => {
    
                                        const rawFilename = item.originalName;
                                        const videoDate = mediaDates[rawFilename] || "";
                                        
                                        const videoName = rawFilename.replace(/\.[^/.]+$/, "");

                                        return (
                                            <div key={index} className="flex-[0_0_100%] min-w-0 h-[70vh] md:h-[80vh] flex items-center justify-start pl-8 md:pl-16 lg:pl-24 gap-8 md:gap-16">
                                                
                                                {/* LA VIDÉO */}
                                                <div className="relative h-full aspect-[9/16] shrink-0 hover:cursor-default">
                                                    <video 
                                                        src={item.url}
                                                        autoPlay 
                                                        muted
                                                        preload="auto" 
                                                        loop 
                                                        playsInline
                                                        className="w-full h-full object-cover rounded-xl cursor-pointer" 
                                                        onClick={(e) => {
                                                            if (e.target.paused) e.target.play();
                                                            else e.target.pause();
                                                        }}
                                                    />
                                                </div>

                                                {/* LE TEXTE */}
                                                <div className="flex flex-col text-[#ccc6ba] max-w-sm md:max-w-md lg:max-w-lg pr-4">
                                                    {/* TITRE */}
                                                    <h2 className={`${evaText} origin-left text-8xl`}>
                                                        {videoName}
                                                    </h2>
                                                    
                                                    {/* DATE */}
                                                    <p className="font-sans-serif text-[#ccc6ba] uppercase font-[700] scale-x-[0.8] origin-left text-4xl [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,255,0.3)]">
                                                        {videoDate}
                                                    </p>
                                                </div>
                                                
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            {/* NAV BUTTONS */}
                            <div className="flex justify-center gap-6 mt-8">
                                <button 
                                    className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white/30 transition-all "
                                    onClick={scrollPrev}
                                >
                                    ←
                                </button>
                                <button 
                                    className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full hover:bg-white/30 transition-all "
                                    onClick={scrollNext}
                                >
                                    →
                                </button>
                            </div>

                            {/* DOTS */}
                            <div className="flex justify-center gap-3 mt-8 pb-6">
                                {animations.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => scrollTo(index)}
                                        className={`h-2.5 rounded-full transition-all duration-300 ${
                                            index === selectedIndex 
                                                ? "w-8 bg-[#9f51b7]" 
                                                : "w-2.5 bg-white/30 hover:bg-white/60" 
                                        }`}
                                        aria-label={`Aller au slide ${index + 1}`}
                                    />
                                ))}
                            </div>

                        </>
                    )}
            </div>

        </div>



    )
}