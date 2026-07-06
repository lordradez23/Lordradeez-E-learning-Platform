"use client";
import { useState, useEffect, useRef } from "react";
export default function Counter({ target, label, duration = 1500 }: { target: number; label: string; duration?: number }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement | null>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry], obs) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true);

                    let step = 0;
                    const totalSteps = Math.floor(duration / 16);
                    const stepValue = target / totalSteps;

                    const timer = setInterval(() => {
                        step++;
                        setCount(() => {
                            const newValue = Math.min(Math.floor(step * stepValue), target);
                            return newValue;
                        });

                        if (step >= totalSteps) {
                            setCount(target);
                            clearInterval(timer);
                        }
                    }, 16);

                    obs.disconnect();
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, duration, hasAnimated]);

    return (
        <div ref={ref} className="flex flex-col items-center gap-2">
            <h3 className="text-4xl md:text-5xl font-semibold">{count}+</h3>
            <h3 className="text-muted-foreground font-medium">{label}</h3>
        </div>
    );
}
