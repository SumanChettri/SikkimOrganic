import { useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Autoplay } from "swiper/modules";
import gsap from "gsap";

export default function Home() {
  useEffect(() => {
    const isLowEndDevice = window.innerWidth < 768;

    if (!isLowEndDevice) {
      // Glowing Buttons Animation
      gsap.to(".glow-btn", {
        scale: 1.05,
        boxShadow: "0px 0px 20px rgba(22, 163, 74, 0.8)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
      });

      // Neon Border Animation
      gsap.to(".glowing-border", {
        boxShadow: "0px 0px 20px rgba(255, 165, 0, 0.8)",
        repeat: -1,
        yoyo: true,
        duration: 2,
      });
    }
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center mt-10 md:mt-20 sm:mt-10">
      {/* 🔥 Stylish Centered Container with Neon Glowing Border */}
      <div className="relative w-[95%] md:w-[85%] h-[85vh] rounded-3xl overflow-hidden glowing-border border-orange-500 bg-opacity-20 backdrop-blur-md mb-12">
        
        {/* 🔥 Swiper Background */}
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          className="w-full h-full absolute top-0 left-0 z-0"
        >
          <SwiperSlide>
            <motion.img
              src="/images/image1.jpg" // Optimized image format
              loading="lazy" // Lazy loading
              alt="Fresh Vegetables"
              className="w-full h-full object-cover brightness-[0.3] border-4 border-green-400 rounded-3xl shadow-xl"
            />
          </SwiperSlide>
          <SwiperSlide>
            <motion.img
              src="/images/image2.jpg"
              loading="lazy"
              alt="Organic Farm"
              className="w-full h-full object-cover brightness-[0.3] border-4 border-orange-400 rounded-3xl shadow-xl"
            />
          </SwiperSlide>
          <SwiperSlide>
            <motion.img
              src="/images/image3.jpg"
              loading="lazy"
              alt="Healthy Lifestyle"
              className="w-full h-full object-cover brightness-[0.3] border-4 border-blue-400 rounded-3xl shadow-xl"
            />
          </SwiperSlide>
        </Swiper>

        {/* 🔥 Text & Buttons */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
          <motion.h1
            className="text-5xl md:text-7xl font-extrabold drop-shadow-2xl leading-tight"
            initial={window.innerWidth > 768 ? { opacity: 0, y: -50 } : {}}
            animate={window.innerWidth > 768 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
          >
            Fresh Organic <span className="text-orange-500">Fruits</span> &{" "}
            <span className="text-green-500">Vegetables</span>
          </motion.h1>
          
          <motion.p
            className="mt-4 text-lg md:text-2xl max-w-3xl drop-shadow-lg"
            initial={window.innerWidth > 768 ? { opacity: 0, y: 50 } : {}}
            animate={window.innerWidth > 768 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            100% fresh, organic, and delivered to your doorstep with care.
          </motion.p>

          <motion.div
            className="mt-6 flex space-x-4"
            initial={window.innerWidth > 768 ? { opacity: 0, scale: 0.8 } : {}}
            animate={window.innerWidth > 768 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.button
              className="glow-btn px-8 py-3 bg-green-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-green-600 transition-all"
            >
              Shop Now
            </motion.button>
            <motion.button
              className="px-8 py-3 bg-orange-500 text-white text-lg font-semibold rounded-full shadow-lg hover:bg-orange-600 transition-all"
            >
              Learn More
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}