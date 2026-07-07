'use client';

import { useLayoutEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type GsapScrollRevealOptions = {
  y?: number;
  duration?: number;
  delay?: number;
  ease?: string;
  start?: string;
  /** Skip rows already marked gsap-reveal-done (e.g. "View More" expansions). */
  skipRevealed?: boolean;
  /** Duration for rows revealed via expand/load-more. */
  expandDuration?: number;
  /** Stagger between rows when expanding. */
  expandStagger?: number;
};

function markRevealDone(target: HTMLElement) {
  target.classList.remove('gsap-reveal-pending');
  target.classList.add('gsap-reveal-done');
  gsap.set(target, { autoAlpha: 1, y: 0, clearProps: 'transform' });
}

function killTargetAnimations(target: HTMLElement) {
  gsap.killTweensOf(target);
  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger === target) trigger.kill();
  });
}

export function useGsapScrollRevealStagger(
  scopeRef: RefObject<HTMLElement | null>,
  targetsRef: RefObject<(HTMLElement | null)[]>,
  options?: GsapScrollRevealOptions,
  deps: unknown[] = [],
) {
  useLayoutEffect(() => {
    const scope = scopeRef.current;
    const targets = targetsRef.current.filter(Boolean) as HTMLElement[];
    if (!scope || targets.length === 0) return;

    const skipRevealed = options?.skipRevealed ?? false;
    const pendingTargets = skipRevealed
      ? targets.filter((target) => !target.classList.contains('gsap-reveal-done'))
      : targets;

    if (pendingTargets.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      pendingTargets.forEach((target) => {
        gsap.set(target, { opacity: 1, y: 0 });
        markRevealDone(target);
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const y = options?.y ?? 48;
    const duration = options?.duration ?? 1.6;
    const delay = options?.delay ?? 0.55;
    const ease = options?.ease ?? 'power2.out';
    const start = options?.start ?? 'top 88%';
    const expandDuration = options?.expandDuration ?? 0.55;
    const expandStagger = options?.expandStagger ?? 0.08;
    const isExpanding = skipRevealed && targets.some((target) => target.classList.contains('gsap-reveal-done'));

    const refresh = () => ScrollTrigger.refresh();
    const animatedTargets: HTMLElement[] = [];

    pendingTargets.forEach((target, index) => {
      target.classList.add('gsap-reveal-pending');
      target.classList.remove('gsap-reveal-done');
      animatedTargets.push(target);

      if (isExpanding) {
        gsap.fromTo(
          target,
          { autoAlpha: 0, y: y * 0.5, force3D: true },
          {
            autoAlpha: 1,
            y: 0,
            duration: expandDuration,
            delay: index * expandStagger,
            ease,
            force3D: true,
            onComplete: () => markRevealDone(target),
          },
        );
        return;
      }

      gsap.fromTo(
        target,
        { autoAlpha: 0, y, force3D: true },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease,
          force3D: true,
          scrollTrigger: {
            trigger: target,
            start,
            once: true,
          },
          onComplete: () => markRevealDone(target),
        },
      );
    });

    requestAnimationFrame(refresh);
    window.addEventListener('load', refresh, { once: true });

    return () => {
      window.removeEventListener('load', refresh);
      const doneBeforeCleanup = targets.filter((target) => target.classList.contains('gsap-reveal-done'));

      animatedTargets.forEach((target) => {
        if (target.classList.contains('gsap-reveal-done')) return;
        killTargetAnimations(target);
      });

      doneBeforeCleanup.forEach(markRevealDone);
    };
  }, [
    options?.delay,
    options?.duration,
    options?.ease,
    options?.expandDuration,
    options?.expandStagger,
    options?.skipRevealed,
    options?.start,
    options?.y,
    scopeRef,
    targetsRef,
    ...deps,
  ]);
}

export function useGsapScrollReveal<T extends HTMLElement>(
  triggerRef: RefObject<T | null>,
  targetRef: RefObject<T | null>,
  options?: GsapScrollRevealOptions,
) {
  useLayoutEffect(() => {
    const trigger = triggerRef.current;
    const target = targetRef.current;
    if (!trigger || !target) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      target.classList.remove('gsap-reveal-pending');
      target.classList.add('gsap-reveal-done');
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const y = options?.y ?? 48;
    const duration = options?.duration ?? 1.6;
    const delay = options?.delay ?? 0.55;
    const ease = options?.ease ?? 'power2.out';
    const start = options?.start ?? 'top 82%';

    target.classList.add('gsap-reveal-pending');
    target.classList.remove('gsap-reveal-done');

    const refresh = () => ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      const tween = gsap.fromTo(
        target,
        { autoAlpha: 0, y, force3D: true },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          delay,
          ease,
          force3D: true,
          paused: true,
          onComplete: () => {
            target.classList.remove('gsap-reveal-pending');
            target.classList.add('gsap-reveal-done');
            gsap.set(target, { clearProps: 'transform' });
          },
        },
      );

      ScrollTrigger.create({
        trigger,
        start,
        once: true,
        onEnter: () => tween.play(),
      });

      requestAnimationFrame(refresh);
      window.addEventListener('load', refresh, { once: true });
    }, trigger);

    return () => {
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, [options?.delay, options?.duration, options?.ease, options?.start, options?.y, targetRef, triggerRef]);
}
