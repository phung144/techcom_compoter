import { useState, useEffect } from "react";
import styles from "../assets/css/module.module.css";

import banner1 from "../assets/img/banner1.webp";
import banner2 from "../assets/img/banner2.webp";
import banner3 from "../assets/img/banner3.webp";
import banner4 from "../assets/img/banner4.webp";
import banner5 from "../assets/img/banner5.webp";
import banner6 from "../assets/img/banner6.webp";
import banner7 from "../assets/img/banner7.webp";
import banner8 from "../assets/img/banner8.webp";

export function Banner() {
    const [currentIndex, setCurrentIndex] = useState(0);
    
    // Danh sách ảnh
    const images = [banner1, banner2, banner3, banner4, banner5, banner6, banner7, banner8, banner1];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    return (
        <div className={styles.sliderContainer}>
            <div 
                className={styles.slider} 
                style={{ transform: `translateX(-${currentIndex * (100 / 2)}%)` }}
            >
                {images.map((image, index) => (
                    <div key={index} className={styles.slide}>
                        <img src={image} alt={`Banner ${index + 1}`} />
                    </div>
                ))}
            </div>
            <button className={styles.prev} onClick={prevSlide}>&#10094;</button>
            <button className={styles.next} onClick={nextSlide}>&#10095;</button>
        </div>
    );
}
