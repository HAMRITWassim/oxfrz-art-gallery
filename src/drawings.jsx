import { useState, useRef, useEffect} from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"
import { Wind } from 'lucide-react';

//components
import FaultyTerminal from './components/FaultyTerminal';
import BlurText from './components/BlurText';
import Window from './components/Window';

import { mediaDates } from './mediaDates';

import { useNavigate } from 'react-router-dom';


const mediaModules = import.meta.glob('./assets/drawings/*.{png,jpg,jpeg,avif,webp,mp4}', { 
    eager: true, 
    import: 'default' 
});
const rawImages = Object.entries(mediaModules).map(([path, url]) => ({
    originalFilename: decodeURIComponent(path.split('/').pop()),
    url: url
}));



    
function Drawings() {

    const navigate = useNavigate();

    
    const evaText = "text-white font-[900] font-times inline-block scale-x-[0.57] origin-center uppercase [text-shadow:0_0_5px_rgba(255,255,255,0.8),0_0_15px_rgba(255,255,255,0.3)]"

    useEffect( () => {
        window.scrollTo(0,0);
    }, []);

    

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    const videoRef = useRef(null);

    const [sortedMedia, setSortedMedia] = useState([]);
    const [isTVClicked, setIsTVClicked] = useState(false);

    useEffect(() => {
        if (isTVClicked && videoRef.current) {
            videoRef.current.play().catch(error => console.log("Erreur de lecture :", error));
        }
    }, [isTVClicked]);

    useEffect(() => {
        window.scrollTo(0,0);

        // TRIE LES IMAGES (ratio 16/9 ou 9/16)
        const organizeMedia = async () => {
            const portraits = [];
            const landscapes = [];

            
           const checkDimensions = rawImages.map((mediaItem) => {
                return new Promise((resolve) => {
                    
                    const date = mediaDates[mediaItem.originalFilename] || "Date not found";
                    const url = mediaItem.url;

                    const cleanTitle = mediaItem.originalFilename.replace(/\.[^/.]+$/, "");

                    const isVideo = url.match(/\.(mp4|webm|ogg)$/i);
                    if (isVideo) {
                        const video = document.createElement('video');
                        video.onloadedmetadata = () => {
                            resolve({ url, isLandscape: video.videoWidth > video.videoHeight, date, title: cleanTitle });
                        };
                        video.src = url;
                    } else {
                        const img = new Image();
                        img.onload = () => {
                            resolve({ url, isLandscape: img.naturalWidth > img.naturalHeight, date, title: cleanTitle });
                        };
                        img.src = url;
                    }
                });
            });

            const results = await Promise.all(checkDimensions);

            results.forEach(item => {
                if (item.isLandscape) landscapes.push(item);
                else portraits.push(item);
            });

            const arranged = [];
            let pIndex = 0;
            let lIndex = 0;

            while (pIndex < portraits.length || lIndex < landscapes.length) {
                if (pIndex < portraits.length) arranged.push(portraits[pIndex++]);
                if (pIndex < portraits.length) arranged.push(portraits[pIndex++]);
                if (lIndex < landscapes.length) arranged.push(landscapes[lIndex++]);
            }

            setSortedMedia(arranged.filter(item => item !== undefined));
        };

        organizeMedia();
    }, []);

    
    //FRAMER MOTION
    const { scrollY } = useScroll();

        const smoothScrollY = useSpring(scrollY, {
        stiffness: 50,
        damping: 20,   
        restDelta: 0.001 
    });

    const titleOpacity = useTransform(smoothScrollY, [0,290], [1,0]);

    return (

        <div className='w-full h-full relative bg-[#000000] pb-32'>


            {/* TV TRANSITION */}
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
        
            {/* NAV TV */}
            <div className='w-full flex justify-center pt-6'>
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
            <motion.div className='self-center relative flex justify-center items-center  w-[100%] h-[60vh] mb-64 pointer-events-none'
            style={{opacity: titleOpacity}}
            >
                <BlurText
                text="DRAWINGS"
                delay={200}
                animateBy="words"
                direction="bottom"
                onAnimationComplete={handleAnimationComplete}
                className={`${evaText} text-[28cqw] `}
                />

                

            </motion.div>
        
            {/* DRAWINGS GRID */}
            {sortedMedia.length === 0 ? (
                            <div className="text-white text-center w-full mt-20"></div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-64 w-full max-w-7xl mx-auto auto-rows-[minmax(300px,_auto)]">
                                {sortedMedia.map((item, index) => (
                                    <div key={index} className={`flex flex-col relative ${item.isLandscape ? 'md:col-span-2' : ''}`}>
                                        <Window 
                                            media={item.url} 
                                            isLandscape={item.isLandscape} 
                                            date={item.date} 
                                            title={item.title} 
                                        />
                                    </div>
                                ))}
                            </div>
                        )}




                


        </div>
    )
}


export default Drawings