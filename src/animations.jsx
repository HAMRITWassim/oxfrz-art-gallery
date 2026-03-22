import { useState, useRef, useEffect, useCallback} from 'react';
import { motion, useScroll, useSpring, useTransform, useInView} from 'framer-motion';

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

const rawAnimations = Object.entries(animationModules).map(([path, url]) => {
    return {
        originalName: decodeURIComponent(path.split('/').pop()), 
        url: url 
    };
});

// 2. On crée le tableau trié par date
const animations = rawAnimations.sort((a, b) => {
    // On va chercher les dates dans ton fichier mediaDates.js
    const dateStrA = mediaDates[a.originalName];
    const dateStrB = mediaDates[b.originalName];

    // On convertit en "vrai" format date pour le JavaScript
    // Si une vidéo n'a pas de date, on lui donne une date très ancienne (0)
    const timeA = dateStrA ? new Date(dateStrA).getTime() : 0;
    const timeB = dateStrB ? new Date(dateStrB).getTime() : 0;
    
    // Si une des dates est au mauvais format, on la renvoie à la fin
    if (isNaN(timeA)) return 1;
    if (isNaN(timeB)) return -1;

    // Tri décroissant (les plus récents en premier)
    return timeB - timeA;
});

const VideoSlide = ({ item, index, videoName, videoDate, evaText, isActive }) => {
    const [isLandscape, setIsLandscape] = useState(false);
    
    const slideVideoRef = useRef(null);

    useEffect(() => {
        if (slideVideoRef.current) {
            if (isActive) {
                slideVideoRef.current.currentTime = 0;
                slideVideoRef.current.play().catch(e => console.log("Erreur lecture:", e));
            } else {
                slideVideoRef.current.pause();
            }
        }
    }, [isActive]);

    const handleMetadataLoad = (e) => {
        const { videoWidth, videoHeight } = e.target;
        if (videoWidth > videoHeight) {
            setIsLandscape(true);
        } else {
            setIsLandscape(false);
        }
    };

    return (
        <div 
            className={`flex-[0_0_100%] min-w-0 h-[70vh] md:h-[80vh] flex justify-center 
                ${isLandscape ? "flex-col items-center gap-6" : "flex-row items-center justify-start pl-8 md:pl-16 lg:pl-24 gap-8 md:gap-16"}`
            }
        >
            <div 
                className={`relative shrink-0 transition-all duration-500 flex items-center justify-center 
                    ${isLandscape ? "w-[70vw] md:w-[60vw] lg:w-[50vw] aspect-video h-auto" : "h-[70vh] md:h-[80vh] aspect-[9/16] w-auto"}`
                }
            >
                <video 
                    ref={slideVideoRef}
                    src={item.url}
                    muted
                    preload="metadata" 
                    loop 
                    playsInline
                    onLoadedMetadata={handleMetadataLoad}
                    className="w-full h-full object-cover rounded-xl cursor-pointer shadow-[0_0_25px_rgba(0,0,0,0.5)]" 
                    onClick={(e) => {
                        if (e.target.paused) e.target.play();
                        else e.target.pause();
                    }}
                />
            </div>

            <div 
                className={`flex flex-col text-[#ccc6ba] shrink-0
                    ${isLandscape ? "items-center text-center w-full" : "items-start max-w-sm md:max-w-md lg:max-w-lg pr-4 min-w-[250px]"}`
                }
            >
                <h2 className={`${evaText} text-8xl whitespace-nowrap ${isLandscape ? "origin-center" : "origin-left"}`}>
                    {videoName}
                </h2>
                <p className={`font-sans-serif text-[#ccc6ba] uppercase font-[700] scale-x-[0.8] text-4xl pb-4 leading-normal [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,255,0.3)] ${isLandscape ? "origin-center" : "origin-left"}`}>
                    {videoDate}
                </p>
            </div>
        </div>
    );
};



export default function Animations() {

    const evaText = "font-[900] font-times inline-block scale-x-[0.57] origin-center uppercase [text-shadow:0_0_5px_rgba(255,255,255,0.8),0_0_15px_rgba(255,255,255,0.3)]"

    const videoRef = useRef(null);
    const carouselContainerRef = useRef(null);
    

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

    const isCarouselVisible = useInView(carouselContainerRef, { amount: 0.2 });

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


            <div className="relative w-full max-w-6xl mx-auto z-20 cursor-grab active:cursor-grabbing"
            ref={carouselContainerRef}
            >
                    {animations.length === 0 ? (
                        <div className="text-white text-center">No Video Found</div>
                    ) : (
                        <>
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex touch-pan-y touch-pinch-zoom items-center">
                                    {animations.map((item, index) => {

                                        const rawFilename = item.originalName;
                                        const videoDate = mediaDates[rawFilename] || "";
                                        const videoName = rawFilename.replace(/\.[^/.]+$/, "");

                                        return (
                                            <VideoSlide 
                                                key={index}
                                                item={item}
                                                index={index}
                                                videoName={videoName}
                                                videoDate={videoDate}
                                                evaText={evaText}
                                                isActive={index === selectedIndex && isCarouselVisible}
                                            />
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