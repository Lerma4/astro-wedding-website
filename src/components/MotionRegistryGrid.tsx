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
	const copyRotate = useTransform(smoothProgress, [0, 1], enableMotion ? [0.55, -0.08] : [0, 0]);

	return (
		<MotionProvider>
			<div className="registry__grid registry__grid--motion" ref={gridRef}>
				<div className="registry__ambient" aria-hidden="true">
					<div className="registry__glow registry__glow--rose" />
					<div className="registry__glow registry__glow--sage" />
				</div>
				<m.div
					className="bezel registry-plate"
					style={enableMotion ? { y: imageY, rotate: imageRotate } : undefined}
				>
					<figure className="bezel__inner registry-plate__inner">
						<img
							className="registry-plate__image"
							src="/lista_nozze.webp"
							alt="Registro di nozze con due scene: casa e mare, unite da un nastro a forma di infinito."
							loading="lazy"
							decoding="async"
						/>
						<figcaption className="registry-plate__caption">
							<span>Casa</span>
							<span aria-hidden="true">/</span>
							<span>Viaggio</span>
						</figcaption>
					</figure>
				</m.div>

				<m.article
					className="bezel registry-gift"
					style={enableMotion ? { y: copyY, rotate: copyRotate } : undefined}
				>
					<div className="bezel__inner registry-gift__inner">
						<p className="registry-gift__eyebrow">Contributo tramite PayPal</p>
						<h3 className="registry-gift__title">Una soglia tra cio' che costruiremo e cio' che scopriremo.</h3>
						<p className="body muted">
							Il dono non ha categorie o importi suggeriti: resta libero, personale e raccolto in un
							unico gesto. Lo useremo per alcuni dettagli della casa e per il viaggio che seguira'
							la festa.
						</p>

						<div className="registry-gift__duo" aria-label="Destinazione del contributo">
							<span>Casa</span>
							<span className="registry-gift__duo-line" aria-hidden="true" />
							<span>Vacanza</span>
						</div>

						<m.a
							className="button registry-gift__button"
							href="https://www.paypal.com/"
							target="_blank"
							rel="noopener noreferrer"
							whileHover={enableMotion ? { y: -4, transition: { duration: 0.32, ease } } : undefined}
						>
							<span>Contribuisci con PayPal</span>
							<m.span
								className="button__icon"
								aria-hidden="true"
								whileHover={enableMotion ? { x: 4, y: -2, scale: 1.05 } : undefined}
							>
								↗
							</m.span>
						</m.a>

						<p className="registry-gift__note">
							La vostra presenza resta il regalo piu' importante.
						</p>
					</div>
				</m.article>
			</div>
		</MotionProvider>
	);
}
