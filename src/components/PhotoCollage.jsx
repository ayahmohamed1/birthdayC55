import { motion } from 'framer-motion'

export default function PhotoCollage({ onRestart }) {
  // مصفوفة الـ 6 صور مع نفس التوزيع، الزوايا، ومسافات متوازنة بدون تغطية على العنوان
  const PHOTOS = [
    { 
      id: 1, 
      src: '/images/photo3.jpg', 
      classes: 'absolute top-[165px] sm:top-[16%] left-[4%] sm:left-[8%] w-[45%] sm:w-[32%] -rotate-6' 
    },
    { 
      id: 2, 
      src: '/images/photo4.jpg', 
      classes: 'absolute top-[90px] sm:top-[6%] right-[3%] sm:right-[6%] w-[42%] sm:w-[30%] rotate-3' 
    },
    { 
      id: 3, 
      src: '/images/photo5.jpg', 
      classes: 'absolute top-[380px] sm:top-[42%] left-[3%] sm:left-[7%] w-[46%] sm:w-[34%] -rotate-3' 
    },
    { 
      id: 4, 
      src: '/images/photo6.jpg', 
      classes: 'absolute top-[305px] sm:top-[36%] right-[4%] sm:right-[8%] w-[45%] sm:w-[33%] rotate-6' 
    },
    { 
      id: 5, 
      src: '/images/photo7.jpg', 
      classes: 'absolute top-[600px] sm:top-[72%] left-[5%] sm:left-[9%] w-[45%] sm:w-[32%] -rotate-6' 
    },
    { 
      id: 6, 
      src: '/images/photo8.jpg', 
      classes: 'absolute top-[525px] sm:top-[68%] right-[4%] sm:right-[8%] w-[44%] sm:w-[31%] rotate-2' 
    },
  ]

  return (
    <div className="relative w-full overflow-hidden bg-[#8c657a] px-4 py-10 sm:px-10">
      
      {/* الإطارات الوردية (الخلفية) */}
      <img
        src="/images/flowers-left.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full w-24 sm:w-36 object-cover object-left opacity-95 z-0"
      />
      <img
        src="/images/flowers-right.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 h-full w-24 sm:w-36 object-cover object-right opacity-95 z-0"
      />

      {/* 
        حاوية متناسقة للموبايل والشاشات الكبيرة
      */}
      <div className="relative mx-auto w-full max-w-5xl h-[890px] sm:h-[1750px] z-10 mt-6 sm:mt-10">
        
        {/* العنوان */}
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-0 left-[6%] sm:left-[8%] font-serif text-2xl sm:text-5xl uppercase leading-tight sm:leading-snug tracking-widest text-[#f3e3ce] drop-shadow-md z-30 pointer-events-none"
        >
          MY FAV PICT <br /> OF YOU
        </motion.h2>

        {/* الجملة النصية التي تظهر فوق الصور */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute top-[32%] left-0 w-full text-center z-30 pointer-events-none"
        >
          <p className="font-sans text-[13px] sm:text-[18px] text-white font-semibold tracking-wide drop-shadow-lg px-2">
            POV: you are my favorite person in the whole world &lt;3
          </p>
        </motion.div>

        {/* توزيع الـ 6 صور */}
        {PHOTOS.map((photo, i) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.15 * i }}
            whileHover={{ scale: 1.05, zIndex: 40 }}
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

      {/* زر إعادة القراءة في أسفل الصفحة تماماً */}
      <div className="relative z-20 mt-8 pb-12 flex justify-center">
        <motion.button
          type="button"
          onClick={onRestart}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="rounded-full bg-[#58323e] px-10 py-4 font-serif text-sm uppercase tracking-widest text-[#f3e3ce] shadow-xl"
        >
          Read it again
        </motion.button>
      </div>

    </div>
  )
}