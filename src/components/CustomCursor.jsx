import React, { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);
    const pos = useRef({ x: -100, y: -100 });
    const followerPos = useRef({ x: -100, y: -100 });
    const rafRef = useRef(null);

    useEffect(() => {
        const move = (e) => {
            pos.current = { x: e.clientX, y: e.clientY };
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };

        const animate = () => {
            followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
            followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
            if (followerRef.current) {
                followerRef.current.style.left = `${followerPos.current.x}px`;
                followerRef.current.style.top = `${followerPos.current.y}px`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };

        const onEnter = (e) => {
            if (e.target.matches('a, button, [data-hover], input, textarea, select, .card-tilt')) {
                setIsHovering(true);
            }
        };

        const onLeave = (e) => {
            if (e.target.matches('a, button, [data-hover], input, textarea, select, .card-tilt')) {
                setIsHovering(false);
            }
        };

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseover', onEnter);
        document.addEventListener('mouseout', onLeave);
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseover', onEnter);
            document.removeEventListener('mouseout', onLeave);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div className={isHovering ? 'cursor-hover' : ''}>
            <div ref={cursorRef} className="custom-cursor" />
            <div ref={followerRef} className="cursor-follower" />
        </div>
    );
};

export default CustomCursor;
