import {
	m,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
	type Variants,
} from 'framer-motion';
import { useRef } from 'react';
import MotionProvider from './MotionProvider';

type GalleryItem = {
	src: string;
	alt: string;
	meta: string;
	title: string;
};

interface MotionHeroProps {
	image: GalleryItem;
}

interface HeroImageProps {
	item: GalleryItem;
	reduceMotion: boolean;
}

const ease = [0.32, 0.72, 0, 1] as const;

const buttonVariants: Variants = {
	rest: { y: 0, scale: 1 },
	hover: {
		y: -4,
		scale: 1.01,
		transition: { duration: 0.45, ease },
	},
	tap: {
		y: 1,
		scale: 0.985,
		transition: { duration: 0.22, ease },
	},
};

const buttonIconVariants: Variants = {
	rest: { x: 0, y: 0, scale: 1 },
	hover: {
		x: 4,
		y: -2,
		scale: 1.06,
		transition: { duration: 0.45, ease },
	},
	tap: {
		x: 1,
		y: 0,
		scale: 1.02,
		transition: { duration: 0.22, ease },
	},
};

const contentEntry: Variants = {
	hidden: { opacity: 0, y: 42 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.95, ease, delay: 0.12 },
	},
};

const mediaEntry: Variants = {
	hidden: { opacity: 0, y: 56, scale: 0.985 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 1.08, ease, delay: 0.22 },
	},
};

function HeroImage({ item, reduceMotion }: HeroImageProps) {
	return (
		<m.figure
			className="bezel hero-portrait"
			whileHover={
				reduceMotion
					? undefined
					: {
						scale: 1.018,
						transition: { duration: 0.5, ease },
					}
			}
		>
			<div className="bezel__inner hero-portrait__inner">
				<img src={item.src} alt={item.alt} loading="eager" decoding="async" />
				<div className="hero-portrait__shade" aria-hidden="true" />
				<div className="hero-portrait__copy">
					<p className="hero-portrait__meta">{item.meta}</p>
					<h2>{item.title}</h2>
				</div>
			</div>
		</m.figure>
	);
}

export default function MotionHero({ image }: MotionHeroProps) {
	const heroRef = useRef<HTMLElement | null>(null);
	const reduceMotion = useReducedMotion() ?? false;
	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ['start start', 'end start'],
	});
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 110,
		damping: 24,
		mass: 0.34,
	});

	const contentY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -32]);
	const contentOpacity = useTransform(smoothProgress, [0, 0.84, 1], [1, 1, 0.72]);
	const mediaY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -18]);

	return (
		<MotionProvider>
			<section className="hero section section--hero" id="top" ref={heroRef}>
				<div className="container hero__grid hero__grid--motion">
					<m.div
						className="hero__content"
						variants={contentEntry}
						initial={reduceMotion ? false : 'hidden'}
						animate="visible"
						style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
					>
						<span className="eyebrow">21 giugno 2026 - Arenzano</span>
						<p className="hero__kicker">Un invito a condividere una giornata pensata con cura.</p>
						<h1 className="display-title hero__title">Igor e Eleonora</h1>
						<p className="body-lg hero__lead">
							Ci sposiamo tra il verde ligure e la luce del mare, in una lunga sera d&apos;estate da
							vivere insieme alle persone che contano davvero.
						</p>

						<div className="hero__actions">
							<m.a
								className="button"
								href="#lista-nozze"
								variants={buttonVariants}
								initial="rest"
								animate="rest"
								whileHover={reduceMotion ? undefined : 'hover'}
								whileTap={reduceMotion ? undefined : 'tap'}
							>
								<span>Scopri la lista nozze</span>
								<m.span className="button__icon" aria-hidden="true" variants={buttonIconVariants}>
									↗
								</m.span>
							</m.a>
							<m.a
								className="button button--secondary"
								href="#venue"
								variants={buttonVariants}
								initial="rest"
								animate="rest"
								whileHover={reduceMotion ? undefined : 'hover'}
								whileTap={reduceMotion ? undefined : 'tap'}
							>
								<span>Esplora la location</span>
								<m.span className="button__icon" aria-hidden="true" variants={buttonIconVariants}>
									↗
								</m.span>
							</m.a>
						</div>

						<a className="scroll-cue" href="#storia">
							<span className="scroll-cue__line" aria-hidden="true" />
							<span>Scorri per continuare</span>
						</a>
					</m.div>

					<m.div
						className="hero__media hero__media--motion"
						variants={mediaEntry}
						initial={reduceMotion ? false : 'hidden'}
						animate="visible"
						style={reduceMotion ? undefined : { y: mediaY }}
					>
						<div className="hero__stage" aria-hidden="true">
							<div className="hero__halo hero__halo--rose" />
							<div className="hero__halo hero__halo--champagne" />
							<div className="hero__halo hero__halo--sage" />
						</div>

						<HeroImage item={image} reduceMotion={reduceMotion} />
					</m.div>
				</div>
			</section>
		</MotionProvider>
	);
}
