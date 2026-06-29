import { m, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import MotionProvider from './MotionProvider';

const ease = [0.32, 0.72, 0, 1] as const;

export default function MotionRegistryGrid() {
	const prefersReducedMotion = useReducedMotion();
	const [mounted, setMounted] = useState(false);
	const gridRef = useRef<HTMLDivElement | null>(null);
	const enableMotion = mounted && !prefersReducedMotion;

	useEffect(() => {
		setMounted(true);
	}, []);

	const { scrollYProgress } = useScroll({
		target: gridRef,
		offset: ['start end', 'end start'],
	});
	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 115,
		damping: 24,
		mass: 0.42,
	});

	const imageY = useTransform(smoothProgress, [0, 1], enableMotion ? [24, -16] : [0, 0]);
	const imageRotate = useTransform(smoothProgress, [0, 1], enableMotion ? [-0.7, 0.08] : [0, 0]);
	const copyY = useTransform(smoothProgress, [0, 1], enableMotion ? [14, -10] : [0, 0]);

	return (
		<MotionProvider>
			<div className="registry__grid registry__grid--motion" ref={gridRef}>
				<div className="registry__ambient" aria-hidden="true">
					<div className="registry__glow registry__glow--rose" />
					<div className="registry__glow registry__glow--sage" />
				</div>
				<m.div
					className="bezel registry-plate registry-plate--showcase"
					style={enableMotion ? { y: imageY, rotate: imageRotate } : undefined}
				>
					<figure className="bezel__inner registry-plate__inner">
						<img
							className="registry-plate__image"
							src="/nozze.webp"
							alt="Registro di nozze con due scene: casa e mare, unite da un nastro a forma di infinito."
							loading="lazy"
							decoding="async"
						/>

						<m.aside
							className="registry-paypal"
							aria-label="Contributo tramite PayPal"
							style={enableMotion ? { y: copyY } : undefined}
						>
							<p className="registry-paypal__eyebrow">Contributo libero</p>
							<m.a
								className="button registry-paypal__button"
								href="https://www.paypal.com/"
								target="_blank"
								rel="noopener noreferrer"
								whileHover={enableMotion ? { y: -4, transition: { duration: 0.32, ease } } : undefined}
							>
								<span>Paga con PayPal</span>
								<m.span
									className="button__icon"
									aria-hidden="true"
									whileHover={enableMotion ? { x: 4, y: -2, scale: 1.05 } : undefined}
								>
									↗
								</m.span>
							</m.a>
							<p className="registry-paypal__note">Grazie di cuore.</p>
						</m.aside>
					</figure>
				</m.div>
			</div>
		</MotionProvider>
	);
}
