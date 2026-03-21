import { useState } from 'react'; 

export default function Window({ media, date, title }) {

    const isVideo = media?.match(/\.(mp4|webm|ogg)$/i);

    const [isLandscape, setIsLandscape] = useState(false);

    const handleImageLoad = (event) => {
        const { naturalWidth, naturalHeight } = event.target;
        if (naturalWidth > naturalHeight) {
            setIsLandscape(true);
        }
    };

    const evaText = "text-white font-[900] font-times inline-block scale-x-[0.57] origin-left uppercase [text-shadow:0_0_5px_rgba(255,255,255,0.8),0_0_15px_rgba(255,255,255,0.3)]";
    return (
        <>


            <div className={`flex relative flex-col ${isLandscape ? 'md:col-span-2' : ''}`}>

                <div className="window-container" >
                    <div className="top-bar">
                        <span className="top-bar-name">DRAWING</span>
                        <div className="top-bar-actions">
                            <div className="action-one"></div>
                            <div className="action-two"></div>
                            <div className="action-three"></div>
                        </div>
                    </div>

                    <figure>
                        {isVideo ? (
                            <>
                                <video 
                                    src={media} 
                                    autoPlay 
                                    muted 
                                    loop 
                                    playsInline
                                    onLoadedMetadata={(e) => {
                                        if (e.target.videoWidth > e.target.videoHeight) {
                                            setIsLandscape(true);
                                        }
                                    }}
                                ></video>
                            </>
                        ) : (
                            <>
                                <img 
                                    src={media} 
                                    alt="artwork" 
                                    onLoad={handleImageLoad} 
                                />
                            </>
                        )}
                    </figure>
                </div>


               <h1 className={`${evaText} text-5xl mt-4`}>{title}</h1>
                <h1 className={`font-sans-serif text-white uppercase font-[700] scale-x-[0.8] origin-left text-3xl [text-shadow:0_0_5px_rgba(255,255,255,0.5),0_0_15px_rgba(255,255,255,0.3)]`}>
                    {date}
                </h1>

            </div>

            <style>{`
                .window-container {
                    grid-column: span 1; 
                    width: 100%;
                    background-color: white;
                    border-radius: 6px;
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                }

                .window-container.landscape-window {
                    grid-column: 1 / -1; /* prend toute la largeur dispo */
                }

                .top-bar {
                    background-color: #d6d6d6;
                    display: flex;  
                    align-items: center;
                    justify-content: space-between;
                    padding: 6px;
                }

                span.top-bar-name {
                    font-size: 10px;
                    font-weight: 600;
                    text-transform: uppercase;
                    color: black;
                }

                figure {
                    flex-grow: 1;
                    width: 100%;
                    margin: 0;
                    overflow: hidden;
                }

                img, video {
                    height: 100%;
                    width: 100%;
                    object-fit: cover; 
                }

                .top-bar-actions {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 4px;
                }

                .action-one, .action-two, .action-three {
                    height: 8px;
                    width: 8px;
                    border-radius: 50%;
                }

                .action-one { background-color: #FFFFFF; }
                .action-two { background-color: #999999; }
                .action-three { background-color: #5e5e5e; }
            `}</style>
        </>
    );
}