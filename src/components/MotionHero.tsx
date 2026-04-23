import {
	m,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
	type MotionValue,
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
	gallery: GalleryItem[];
}

interface HeroCardProps {
	item: GalleryItem;
	index: number;
	progress: MotionValue<number>;
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

const cardMotion = [
	{ y: [14, -24], rotate: [-3, -6] },
	{ y: [-16, -36], rotate: [0, 1.6] },
	{ y: [28, -10], rotate: [3, 5.4] },
];

function HeroCard({ item, index, progress, reduceMotion }: HeroCardProps) {
	const motionConfig = cardMotion[index] ?? cardMotion[cardMotion.length - 1];
	const y = useTransform(progress, [0, 1], reduceMotion ? [0, 0] : motionConfig.y);
	const rotate = useTransform(
		progress,
		[0, 1],
		reduceMotion ? [0, 0] : motionConfig.rotate,
	);
	const scale = useTransform(progress, [0, 1], reduceMotion ? [1, 1] : [1, 1.02]);

	return (
		<m.article
			className={`bezel hero-card hero-card--${index + 1}`}
			style={reduceMotion ? undefined : { y, rotate, scale }}
			whileHover={
				reduceMotion
					? undefined
					: {
						scale: 1.028,
						transition: { duration: 0.35, ease },
					}
			}
		>
			<div className="bezel__inner hero-card__inner">
				<img src={item.src} alt={item.alt} loading="lazy" decoding="async" />
				<div className="hero-card__copy">
					<p className="hero-card__meta">{item.meta}</p>
					<h2>{item.title}</h2>
				</div>
			</div>
		</m.article>
	);
}

export default function MotionHero({ gallery }: MotionHeroProps) {
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

	const contentY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -52]);
	const contentOpacity = useTransform(smoothProgress, [0, 0.78, 1], [1, 1, 0.52]);
	const mediaY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -34]);
	const railRotate = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -1.2]);
	const stageX = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, 10]);
	const stageY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [0, -26]);
	const cueScale = useTransform(smoothProgress, [0, 0.65, 1], reduceMotion ? [1, 1, 1] : [1, 1.14, 0.94]);

	return (
		<MotionProvider>
			<section className="hero section section--hero" id="top" ref={heroRef}>
				<div className="container hero__grid hero__grid--motion">
					<m.div
					className="hero__content"
					style={reduceMotion ? undefined : { y: contentY, opacity: contentOpacity }}
					>
					<span className="eyebrow">21 giugno 2026 - Langhe</span>
					<p className="hero__kicker">Un invito a condividere una giornata pensata con cura.</p>
					<h1 className="display-title hero__title">Igor e Giulia</h1>
					<p className="body-lg hero__lead">
						Ci sposiamo tra colline luminose, tavole raccolte e una lunga sera d&apos;estate da
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
						<m.span
							className="scroll-cue__line"
							aria-hidden="true"
							style={reduceMotion ? undefined : { scaleX: cueScale, transformOrigin: 'left center' }}
						/>
						<span>Scorri per continuare</span>
					</a>
					</m.div>

					<m.div className="hero__media hero__media--motion" style={reduceMotion ? undefined : { y: mediaY }}>
						<m.div className="hero__stage" aria-hidden="true" style={reduceMotion ? undefined : { x: stageX, y: stageY }}>
							<div className="hero__halo hero__halo--rose" />
							<div className="hero__halo hero__halo--champagne" />
							<div className="hero__halo hero__halo--sage" />
						</m.div>

						<m.div className="hero__media-rail" style={reduceMotion ? undefined : { rotate: railRotate }}>
							{gallery.map((item, index) => (
								<HeroCard
								key={item.src}
								item={item}
								index={index}
								progress={smoothProgress}
								reduceMotion={reduceMotion}
								/>
							))}
						</m.div>
					</m.div>
				</div>
			</section>
		</MotionProvider>
	);
}
