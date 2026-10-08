import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ================= 1. CUSTOM VIDEO PLAYER =================
function CustomVideoPlayer({ src, poster }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="relative w-full max-w-lg sm:max-w-xl mx-auto z-20">
      {/* Decorative Vintage Outer Frame */}
      <div className="relative rounded-3xl p-2.5 sm:p-4 bg-gradient-to-b from-[#f3e3ce]/30 via-[#58323E]/70 to-[#2A151D]/90 backdrop-blur-md border-2 border-[#f3e3ce]/50 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(243,227,206,0.15)] ring-1 ring-white/10">
        
        {/* Inner Video Container that fits the video naturally without cropping */}
        <div className="relative overflow-hidden rounded-2xl bg-black flex items-center justify-center border border-[#f3e3ce]/20 shadow-inner group">
          <video
            ref={videoRef}
            className="w-full h-auto max-h-[70vh] object-contain block mx-auto cursor-pointer"
            poster={poster || undefined}
            controls={isPlaying}
            onClick={togglePlay}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            playsInline
            preload="metadata"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <AnimatePresence>
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={togglePlay}
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/25 backdrop-blur-[2px] cursor-pointer z-20"
              >
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  className="relative flex items-center justify-center"
                >
                  <span className="absolute -inset-3 rounded-full bg-[#f3e3ce]/25 blur-md animate-pulse"></span>
                  <div className="relative flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#58323E]/90 text-[#f3e3ce] shadow-2xl border-2 border-[#f3e3ce]/60 backdrop-blur-md transition-all group-hover:bg-[#43232E]">
                    <svg
                      className="w-10 h-10 sm:w-12 sm:h-12 ml-1 fill-current text-[#f3e3ce] drop-shadow-md"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ================= 2. MAIN APP COMPONENT =================
export default function App() {
  const [isEnvelopeOpened, setIsEnvelopeOpened] = useState(false);
  const [showMain, setShowMain] = useState(false);

  const PHOTOS = [
    { id: 1, src: '/images/photo3.jpg', classes: 'absolute top-[165px] sm:top-[16%] left-[4%] sm:left-[8%] w-[45%] sm:w-[32%]', rotate: -8 },
    { id: 2, src: '/images/photo4.jpg', classes: 'absolute top-[90px] sm:top-[6%] right-[3%] sm:right-[6%] w-[42%] sm:w-[30%]', rotate: 8 },
    { id: 3, src: '/images/photo5.jpg', classes: 'absolute top-[380px] sm:top-[42%] left-[3%] sm:left-[7%] w-[46%] sm:w-[34%]', rotate: -5 },
    { id: 4, src: '/images/photo6.jpg', classes: 'absolute top-[305px] sm:top-[36%] right-[4%] sm:right-[8%] w-[45%] sm:w-[33%]', rotate: 8 },
    { id: 5, src: '/images/photo7.jpg', classes: 'absolute top-[600px] sm:top-[72%] left-[5%] sm:left-[9%] w-[45%] sm:w-[32%]', rotate: -9 },
    { id: 6, src: '/images/photo8.jpg', classes: 'absolute top-[525px] sm:top-[68%] right-[4%] sm:right-[8%] w-[44%] sm:w-[31%]', rotate: 6 },
  ];

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`w-full bg-[#8c657a] text-white ${showMain ? 'overflow-y-auto' : 'h-screen overflow-hidden'}`}>
      
      {/* ================= SECTION 1: THE ENVELOPE ================= */}
      <AnimatePresence>
        {!showMain && (
          <motion.section
            key="envelope-screen"
            exit={{ opacity: 0 }} 
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex h-screen w-full flex-col items-center justify-center bg-[#8c657a]"
          >
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-10 sm:mb-12 -rotate-6 font-hand text-3xl sm:text-4xl text-[#f3e3ce] relative right-12 sm:right-16 drop-shadow-md z-30"
            >
              open me!
            </motion.p>

            <div 
              className="relative flex items-center justify-center w-full max-w-sm cursor-pointer mt-6"
              onClick={() => setIsEnvelopeOpened(true)}
            >
              <motion.img 
                src="/images/envelope-closed.png"
                alt="Closed Envelope"
                className="relative z-20 w-72 sm:w-80 object-contain drop-shadow-2xl"
                animate={isEnvelopeOpened ? { scale: 1.5, opacity: 0 } : { scale: 1, opacity: 1, rotate: -6 }}
                transition={{ duration: 0.8 }}
                onAnimationComplete={() => {
                  if (isEnvelopeOpened) {
                    setShowMain(true);
                  }
                }}
                whileHover={!isEnvelopeOpened ? { scale: 1.05 } : {}}
                whileTap={!isEnvelopeOpened ? { scale: 0.95 } : {}}
              />
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ================= SECTION 2: GREETING HERO ================= */}
      <section id="hero-section" className="relative flex min-h-screen flex-col items-center justify-center px-4 text-center overflow-hidden py-10">
        <div 
          className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div 
          className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        <p className="z-10 mt-8 font-serif text-sm uppercase tracking-[0.15em] text-[#f3e3ce] drop-shadow-sm max-w-xs sm:max-w-md">
          To the love of my life!
        </p>
        
        <h1 className="z-10 my-2 font-script text-[4.2rem] leading-none text-[#f3e3ce] drop-shadow-md sm:text-[7.5rem] tracking-normal">
          Abdelaziz
        </h1>
        
        <p className="z-10 font-serif text-sm uppercase tracking-[0.2em] text-[#f3e3ce] drop-shadow-sm">
          Happy birthday, love
        </p>

        <p className="z-10 mt-5 mb-2 font-sans text-[13px] text-white/90 tracking-wide sm:text-sm"></p>

        <div className="relative z-10 mt-10 h-64 w-[310px] sm:h-80 sm:w-[420px] flex items-end justify-center">
          <div className="absolute bottom-0 h-44 w-full bg-[#dcc6ad] rounded-md shadow-inner sm:h-56"></div>
          
          <div className="absolute bottom-28 left-4 z-10 h-44 w-32 -rotate-12 bg-white p-2 shadow-polaroid sm:bottom-36 sm:left-6 sm:h-56 sm:w-40">
            <img src="/images/photo2.jpg" className="h-full w-full object-cover" alt="Pic 1" />
          </div>
          <div className="absolute bottom-24 right-4 z-10 h-44 w-32 rotate-12 bg-white p-2 shadow-polaroid sm:bottom-32 sm:right-6 sm:h-56 sm:w-40">
            <img src="/images/photo1.jpg" className="h-full w-full object-cover" alt="Pic 2" />
          </div>

          <div 
            className="relative z-20 h-32 w-full bg-[#f3e3ce] shadow-[-2px_-4px_12px_rgba(0,0,0,0.08)] rounded-b-md sm:h-40"
            style={{ clipPath: 'polygon(0 0, 50% 15%, 100% 0, 100% 100%, 0 100%)' }}
          ></div>
        </div>

        <div className="z-10 mt-16 mb-8 rounded-full bg-[#58323E] px-14 py-3.5 font-serif text-sm uppercase tracking-[0.3em] text-[#f3e3ce] shadow-xl hover:scale-105 transition-transform cursor-pointer border border-[#f3e3ce]/20">
          I love u
        </div>
      </section>

      {/* ================= SECTION 3: VIDEO & LETTER ================= */}
      <section className="relative flex min-h-screen flex-col items-center justify-start sm:justify-center py-20 px-4 overflow-hidden">
        <div 
          className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div 
          className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        <div className="z-10 w-full px-2 max-w-4xl">
          <CustomVideoPlayer 
            src="/images/video.mp4" 
          />
        </div>

        {/* التعديل الجذري: الورقة أصبحت خلفية مطاطية تتسع للنص، مع هوامش أمان ضخمة لا يمكن اختراقها */}
        <div 
          className="z-10 mt-16 sm:mt-24 relative w-[95%] sm:w-[85%] max-w-[700px] mx-auto drop-shadow-2xl flex flex-col items-center justify-center text-center"
          style={{
            backgroundImage: "url('/images/lace paper.png')",
            backgroundSize: '150% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height:'800px'
          }}
        >
          <div className="w-full pt-[24%] pb-[28%] px-[18%] sm:pt-[22%] sm:pb-[26%] sm:px-[22%]">
            <p className="font-letter text-[16px] sm:text-2xl lg:text-3xl font-bold text-[#4a362f] mb-3 sm:mb-5">
              To my favorite person,
            </p>
            <p className="font-letter text-[11.5px] sm:text-[15px] lg:text-[17px] leading-[1.9] sm:leading-[2.2] font-bold text-[#4a362f]">
            عزيزي عبد العزيز،
بتمنى السنة دي تبقى مليانة ضحك وفرح ولَمّة حلوة مع بعض، وتكون بعيدة عن الحزن والخلافات، مع إني متأكدة إننا هنعدّي أي حاجة سوا.💘
فخورة بيك وبكل خطوة بتاخدها، وبحب فيك حكمتك وطريقتك في التعامل مع الأمور، وذكاءك وطموحك، وقد إيه بتعرف تحتوي خوفي وترددي وتخليني أحس إن كل حاجة أهون.🤏🏼🥹
بحب إنك بتخاف على زعلي، وبتعاملني بكل رقة واحترام، وإنك دايمًا بتحاول تديني كل اللي عندك بنفس راضية. ويمكن من أكتر الحاجات اللي بقدّرها فيك إنك بتحاول تطلع معايا للسحاب، مع إنك بطبعك بتحب تقف على أرض صلبة. 🤍
إنت أماني ونعمة من ربنا ليا، وأسأل الله إنه يديمك ليا خير رفيق في الدنيا والآخرة، ويبارك لنا في بعض، ويجمعني بيك في حلال الدنيا ونعيم الجنة.🫶🏼
كل سنة وإنت طيب يا عبد العزيز، ويا رب السنة الجديدة من عمرك تكون أحن وأجمل عليك.🥹
تحياتي،
صاحبك بدون الصاد 
يُمنى 🤍
            </p>
          </div>
        </div>
      </section>

      {/* ================= SECTION 4: PHOTO COLLAGE ================= */}
      <section className="relative w-full overflow-hidden px-4 py-10 sm:px-10 min-h-screen">
        
        <div 
          className="absolute left-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-left.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'left top' }}
        ></div>
        <div 
          className="absolute right-0 top-0 h-full w-20 sm:w-36 pointer-events-none z-0 opacity-95"
          style={{ backgroundImage: "url('/images/flowers-right.png')", backgroundRepeat: 'repeat-y', backgroundSize: '100% auto', backgroundPosition: 'right top' }}
        ></div>

        <div className="relative mx-auto w-full max-w-5xl h-[890px] sm:h-[1750px] z-10 mt-6 sm:mt-10">
          
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 left-[6%] sm:left-[8%] font-serif text-2xl sm:text-5xl uppercase leading-tight sm:leading-snug tracking-widest text-[#f3e3ce] drop-shadow-md z-30 pointer-events-none"
          >
            MY FAV PICS <br /> OF YOU
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute top-[32%] left-0 w-full text-center z-30 pointer-events-none"
          >
            <p className="font-sans text-[13px] sm:text-[18px] text-white font-semibold tracking-wide drop-shadow-lg px-2">
            </p>
          </motion.div>

          {PHOTOS.map((photo, i) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.8, rotate: photo.rotate }}
              animate={{ opacity: 1, scale: 1, rotate: photo.rotate }}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              whileHover={{ scale: 1.05, rotate: photo.rotate, zIndex: 40 }}
              className={`z-10 bg-white p-2 sm:p-3 pb-3 sm:pb-4 shadow-[0_10px_28px_rgba(0,0,0,0.28)] ring-1 ring-black/5 transition-transform duration-300 rounded-[2px] ${photo.classes}`}
            >
              <img 
                src={photo.src} 
                alt={`Collage pic ${photo.id}`} 
                className="w-full h-auto object-contain block rounded-[1px]" 
              />
            </motion.div>
          ))}

        </div>

        <div className="relative z-20 mt-8 pb-12 flex justify-center">
          <motion.button
            type="button"
            onClick={handleRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-full bg-[#58323e] px-10 py-4 font-serif text-sm uppercase tracking-widest text-[#f3e3ce] shadow-xl border border-[#f3e3ce]/20"
          >
            Read it again
          </motion.button>
        </div>

      </section>

    </div>
  );
}