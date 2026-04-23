import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';
import MotionProvider from './MotionProvider';

const ease = [0.32, 0.72, 0, 1] as const;

export default function MotionVenueVisual() {
	const reduceMotion = useReducedMotion() ?? false;
	const visualRef = useRef<HTMLDivElement | null>(null);
	const { scrollYProgress } = useScroll({
		target: visualRef,
		offset: ['start end', 'end start'],
	});
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 110,
		damping: 24,
		mass: 0.38,
	});

	const frameY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [40, -28]);
	const frameRotate = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [1.8, -1.2]);
	const imageScale = useTransform(smoothProgress, [0, 1], reduceMotion ? [1, 1] : [1.06, 1.02]);
	const roseY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [18, -16]);
	const sageY = useTransform(smoothProgress, [0, 1], reduceMotion ? [0, 0] : [26, -18]);

	return (
		<MotionProvider>
			<m.div className="venue__visual venue__visual--motion" ref={visualRef}>
				<div className="venue__stage" aria-hidden="true">
					<m.div className="venue__halo venue__halo--rose" style={reduceMotion ? undefined : { y: roseY }} />
					<m.div className="venue__halo venue__halo--sage" style={reduceMotion ? undefined : { y: sageY }} />
				</div>

				<m.figure
				className="bezel venue-figure venue-figure--motion"
				style={reduceMotion ? undefined : { y: frameY, rotate: frameRotate }}
				whileHover={
					reduceMotion
						? undefined
						: {
							scale: 1.012,
							transition: { duration: 0.32, ease },
						}
				}
				>
				<div className="bezel__inner venue-figure__inner">
					<div className="venue__meta-band">
						<span className="detail-chip detail-chip--accent">Arrivo</span>
						<span className="detail-chip">Giardino e corte</span>
					</div>
					<m.img
						src="/placeholders/venue-landscape.svg"
						alt="Placeholder editoriale della location con architettura mediterranea e paesaggio collinare"
						loading="lazy"
						decoding="async"
						style={reduceMotion ? undefined : { scale: imageScale }}
					/>
					<figcaption className="venue__caption">
						<span className="detail-chip">Placeholder immagine</span>
						<p>
							Una cornice luminosa e sobria, pensata per restare elegante in ogni momento della
							giornata.
						</p>
					</figcaption>
				</div>
				</m.figure>
			</m.div>
		</MotionProvider>
	);
}
