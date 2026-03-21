import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

//components
import Aurora from './components/Aurora';
import BlurText from './components/BlurText';
import GradualBlur from './components/GradualBlur'


import { useNavigate } from 'react-router-dom';




export default function Other() {

    const evaText = "font-[900] font-times inline-block scale-x-[0.57] origin-center uppercase [text-shadow:0_0_5px_rgba(255,255,255,0.8),0_0_15px_rgba(255,255,255,0.3)]"

    const[isTVClicked, setIsTVClicked] = useState();
    const[isIGhovered, setIsIGhovered] = useState(false);
    const[isTThovered, setIsTThovered] = useState(false);
    const[isMChovered, setIsMChovered] = useState(false);
    const[isSPhovered, setIsSPhovered] = useState(false);


    const videoRef = useRef();

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

    const navigate = useNavigate();

    const handleAnimationComplete = () => {
        console.log('Animation completed!');
    };

    const handleIGclick = () => {
        window.open("https://www.instagram.com/oxfrz", "_blank", "noopener,noreferrer")
    };

    const handleTTclick = () => {
        window.open("https://www.tiktok.com/@oxfrz", "_blank", "noopener,noreferrer")
    };

    const handleMCclick = () => {
        window.open("https://www.mangacollec.com/user/oxfrz/collection", "_blank", "noopener,noreferrer")
    };

    const handleSPclick = () => {
        window.open("https://open.spotify.com/user/31w6wuijlbszpb642s3y6ouhpqvy/playlists", "_blank", "noopener,noreferrer")
    };


    return (

        <div className="w-full h-[400vh] relative bg-[#0d0e18] overflow-hidden">


            <div className='w-[100%] h-[500vh] absolute top-0 left-0  pointer-events-none '>

                <Aurora
                colorStops={["#254c75","#34699e","#254c75"]}
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
                            text="OTHER"
                            delay={200}
                            animateBy="words"
                            direction="bottom"
                            onAnimationComplete={handleAnimationComplete}
                            className={`${evaText} text-[25cqw] text-[#8ea9a9]`}
                            />
                        </motion.div>

                                      
                        <div className="flex flex-col gap-20 pb-[50vh]">


                            {/* IG */}
                            <div className="relative flex w-fit mx-12 h-[400px] items-center rounded-3xl p-12">
                                
                                <div 
                                    className="absolute inset-0 bg-white/5 rounded-3xl pointer-events-none"
                                    style={{
                                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
                                        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)'
                                    }}
                                />

                                <svg 
                                onClick={handleIGclick}
                                onMouseOver={() => { setIsIGhovered(true) }}
                                onMouseOut={() => { setIsIGhovered(false) }}
                                className={`mr-4 bi bi-instagram hover:cursor-pointer ${isIGhovered ? "fill-[#ccc6ba]" : "fill-[#8ea9a9]" } transition-all duration-500 [filter:drop-shadow(0_0_5px_rgba(255,255,255,0.2))_drop-shadow(0_0_5px_rgba(255,255,255,0.3))]`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="120"
                                height="120"
                                viewBox="0 0 16 16">
                                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334"/>
                                </svg>

                                
                                <div className="relative flex flex-col items-start">

                                    <h2
                                    className={`hover:cursor-pointer ${isIGhovered ? "text-[#ccc6ba]" : "text-[#8ea9a9]" }  transition-all duration-500  relative z-10 ${evaText}  text-9xl origin-left ml-6`}
                                    onClick={handleIGclick}
                                    onMouseOver={() => { setIsIGhovered(true) }}
                                    onMouseOut={() => { setIsIGhovered(false) }}
                                    >
                                        INSTAGRAM
                                    </h2>
                                    
                                    <h2 
                                    className={`hover:cursor-pointer uppercase  ${isIGhovered ? "text-[#ccc6ba]" : "text-[#8ea9a9]" } transition-all duration-500  font-sans-serif uppercase font-[700] scale-x-[0.8] pl-2 text-3xl [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,255,0.3)]`}
                                    onClick={handleIGclick}
                                    onMouseOver={() => { setIsIGhovered(true) }}
                                    onMouseOut={() => { setIsIGhovered(false) }}
                                    >
                                        @oxfrz
                                    </h2>

                                </div>
    
                                
                                
                            </div>




                            {/* TIKTOK */}
                            <div className="relative flex w-fit mx-12 h-[400px] items-center rounded-3xl p-12 self-end">
                                
                                <div 
                                    className="absolute inset-0 bg-white/5 rounded-3xl pointer-events-none"
                                    style={{
                                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
                                        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)'
                                    }}
                                />



                                
                                <div className="relative flex flex-col items-end">

                                    <h2
                                    className={`hover:cursor-pointer ${isTThovered ? "text-[#ccc6ba]" : "text-[#8ea9a9]" }  transition-all duration-500  relative z-10 ${evaText}  text-9xl origin-right mr-3`}
                                    onClick={handleTTclick}
                                    onMouseOver={() => { setIsTThovered(true) }}
                                    onMouseOut={() => { setIsTThovered(false) }}
                                    >
                                        TIKTOK
                                    </h2>
                                    
                                    <h2 
                                    className={`hover:cursor-pointer uppercase  ${isTThovered ? "text-[#ccc6ba]" : "text-[#8ea9a9]" } transition-all duration-500  font-sans-serif uppercase font-[700] scale-x-[0.8] pl-2 text-3xl [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,255,0.3)]`}
                                    onClick={handleTTclick}
                                    onMouseOver={() => { setIsTThovered(true) }}
                                    onMouseOut={() => { setIsTThovered(false) }}
                                    >
                                        @oxfrz
                                    </h2>

                                </div>


                                <svg 
                                onClick={handleTTclick}
                                onMouseOver={() => { setIsTThovered(true) }}
                                onMouseOut={() => { setIsTThovered(false) }}
                                className={`ml-4 bi bi-tiktok hover:cursor-pointer ${isTThovered ? "fill-[#ccc6ba]" : "fill-[#8ea9a9]" } transition-all duration-500 [filter:drop-shadow(0_0_5px_rgba(255,255,255,0.2))_drop-shadow(0_0_5px_rgba(255,255,255,0.3))]`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="120"
                                height="120"
                                viewBox="0 0 16 16">
                                     <path d="M9 0h1.98c.144.715.54 1.617 1.235 2.512C12.895 3.389 13.797 4 15 4v2c-1.753 0-3.07-.814-4-1.829V11a5 5 0 1 1-5-5v2a3 3 0 1 0 3 3z"/>
                                </svg>
    
                                
                                
                            </div>



                            {/* MANGACOLLEC */}
                            <div className="relative flex w-fit mx-12 h-[400px] items-center rounded-3xl p-12">
                                
                                <div 
                                    className="absolute inset-0 bg-white/5 rounded-3xl pointer-events-none"
                                    style={{
                                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
                                        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)'
                                    }}
                                />

                                <svg 
                                onClick={handleMCclick}
                                onMouseOver={() => { setIsMChovered(true) }}
                                onMouseOut={() => { setIsMChovered(false) }}
                                className={` bi bi-book hover:cursor-pointer ${isMChovered ? "fill-[#ccc6ba]" : "fill-[#8ea9a9]" } transition-all duration-500 [filter:drop-shadow(0_0_5px_rgba(255,255,255,0.2))_drop-shadow(0_0_5px_rgba(255,255,255,0.3))]`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="120"
                                height="120"
                                viewBox="0 0 16 16">
                                <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
                                </svg>

                                
                                <div className="relative flex flex-col items-start ml-6">

                                    <h2
                                    className={`hover:cursor-pointer ${isMChovered ? "text-[#ccc6ba]" : "text-[#8ea9a9]" }  transition-all duration-500  relative z-10 ${evaText}  text-9xl origin-left ml-6`}
                                    onClick={handleMCclick}
                                    onMouseOver={() => { setIsMChovered(true) }}
                                    onMouseOut={() => { setIsMChovered(false) }}
                                    >
                                        Mangacollec
                                    </h2>
                                    
                                    <h2 
                                    className={`hover:cursor-pointer uppercase -ml-6  ${isMChovered ? "text-[#ccc6ba]" : "text-[#8ea9a9]" } transition-all duration-500  font-sans-serif uppercase font-[700] scale-x-[0.8]  text-3xl [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,255,0.3)]`}
                                    onClick={handleMCclick}
                                    onMouseOver={() => { setIsMChovered(true) }}
                                    onMouseOut={() => { setIsMChovered(false) }}
                                    >
                                        all the manga volumes i own
                                    </h2>

                                </div>
    
                                
                                
                            </div>

                            {/* SPOTIFY */}
                            <div className="relative flex w-fit mx-12 h-[400px] items-center rounded-3xl p-12 self-end">
                                
                                <div 
                                    className="absolute inset-0 bg-white/5 rounded-3xl pointer-events-none"
                                    style={{
                                        WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)',
                                        maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 100%)'
                                    }}
                                />



                                
                                <div className="relative flex flex-col items-end">

                                    <h2
                                    className={`hover:cursor-pointer ${isSPhovered ? "text-[#ccc6ba]" : "text-[#8ea9a9]" }  transition-all duration-500  relative z-10 ${evaText}  text-9xl origin-right mr-3`}
                                    onClick={handleSPclick}
                                    onMouseOver={() => { setIsSPhovered(true) }}
                                    onMouseOut={() => { setIsSPhovered(false) }}
                                    >
                                        SPOTIFY
                                    </h2>
                                    
                                    <h2 
                                    className={`hover:cursor-pointer uppercase  ${isSPhovered ? "text-[#ccc6ba]" : "text-[#8ea9a9]" } transition-all duration-500  font-sans-serif uppercase font-[700] scale-x-[0.8] pl-2 text-3xl [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,255,0.3)]`}
                                    onClick={handleSPclick}
                                    onMouseOver={() => { setIsSPhovered(true) }}
                                    onMouseOut={() => { setIsSPhovered(false) }}
                                    >
                                        My playlists
                                    </h2>

                                </div>


                                <svg 
                                onClick={handleSPclick}
                                onMouseOver={() => { setIsSPhovered(true) }}
                                onMouseOut={() => { setIsSPhovered(false) }}
                                className={`ml-4 bi bi-spotify hover:cursor-pointer ${isSPhovered ? "fill-[#ccc6ba]" : "fill-[#8ea9a9]" } transition-all duration-500 [filter:drop-shadow(0_0_5px_rgba(255,255,255,0.2))_drop-shadow(0_0_5px_rgba(255,255,255,0.3))]`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="120"
                                height="120"
                                viewBox="0 0 16 16">
                                    <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.669 11.538a.5.5 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686m.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858m.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288"/>
                                </svg>
    
                                
                                
                            </div>

      
                        </div>


                        <div className={`fixed bottom-0 left-0 w-full z-[100] pointer-events-none ${isTVClicked ? "opacity-0" : "opacity-100"}`}>
                            <GradualBlur
                                target="parent"
                                position="bottom"
                                height="7rem"    
                                strength={5}    
                                divCount={10}
                                curve="bezier"
                                opacity={1}
                            />
                        </div>









        </div>
    )
}