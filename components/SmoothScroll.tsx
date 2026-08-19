'use client'
import Lenis from 'lenis'
import { useEffect } from 'react'
export function SmoothScroll({ children }: { children: React.ReactNode }) { useEffect(() => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; const lenis = new Lenis({ lerp: .09 }); let id=0; const raf=(time:number)=>{lenis.raf(time);id=requestAnimationFrame(raf)}; id=requestAnimationFrame(raf); return ()=>{cancelAnimationFrame(id);lenis.destroy()} }, []); return <>{children}</> }
