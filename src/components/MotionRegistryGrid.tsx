import {
	m,
	useMotionValue,
	useReducedMotion,
	useScroll,
	useSpring,
	useTransform,
	type MotionValue,
} from 'framer-motion';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import MotionProvider from './MotionProvider';

const ease = [0.32, 0.72, 0, 1] as const;

interface RegistryCardProps {
	className: string;
	baseY: MotionValue<number>;
	baseRotate: MotionValue<number>;
	hoverY: number;
	hoverRotate: number;
	enableMotion: boolean;
	children: ReactNode;
}

function RegistryCard({
	className,
	baseY,
	baseRotate,
	hoverY,
	hoverRotate,
	enableMotion,
	children,
}: RegistryCardProps) {
	const hoverYValue = useMotionValue(0);
	const hoverRotateValue = useMotionValue(0);
	const hoverYSpring = useSpring(hoverYValue, { stiffness: 260, damping: 24, mass: 0.7 });
	const hoverRotateSpring = useSpring(hoverRotateValue, { stiffness: 260, damping: 24, mass: 0.7 });
	const y = useTransform([baseY, hoverYSpring], ([base, hover]) => base + hover);
	const rotate = useTransform([baseRotate, hoverRotateSpring], ([base, hover]) => base + hover);

	const resetHover = () => {
		hoverYValue.set(0);
		hoverRotateValue.set(0);
	};

	return (
		<m.article
			className={className}
			style={enableMotion ? { y, rotate } : undefined}
			onHoverStart={enableMotion ? () => {
				hoverYValue.set(hoverY);
				hoverRotateValue.set(hoverRotate);
			} : undefined}
			onHoverEnd={enableMotion ? resetHover : undefined}
			onFocus={enableMotion ? () => {
				hoverYValue.set(hoverY);
				hoverRotateValue.set(hoverRotate);
			} : undefined}
			onBlur={enableMotion ? resetHover : undefined}
		>
			{children}
		</m.article>
	);
}

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

	const featuredY = useTransform(smoothProgress, [0, 1], enableMotion ? [26, -14] : [0, 0]);
	const featuredRotate = useTransform(smoothProgress, [0, 1], enableMotion ? [-1.2, 0.1] : [0, 0]);
	const stackY = useTransform(smoothProgress, [0, 1], enableMotion ? [10, -10] : [0, 0]);
	const stackRotate = useTransform(smoothProgress, [0, 1], enableMotion ? [1, -0.15] : [0, 0]);
	const noteY = useTransform(smoothProgress, [0, 1], enableMotion ? [18, -6] : [0, 0]);
	const noteRotate = useTransform(smoothProgress, [0, 1], enableMotion ? [-0.7, 0.1] : [0, 0]);
	const roseX = useTransform(smoothProgress, [0, 1], enableMotion ? [0, 18] : [0, 0]);
	const roseY = useTransform(smoothProgress, [0, 1], enableMotion ? [10, -14] : [0, 0]);
	const sageY = useTransform(smoothProgress, [0, 1], enableMotion ? [16, -12] : [0, 0]);

	return (
		<MotionProvider>
			<div className="registry__grid registry__grid--motion" ref={gridRef}>
				<div className="registry__ambient" aria-hidden="true">
					<m.div className="registry__glow registry__glow--rose" style={enableMotion ? { x: roseX, y: roseY } : undefined} />
					<m.div className="registry__glow registry__glow--sage" style={enableMotion ? { y: sageY } : undefined} />
				</div>

				<RegistryCard
				className="bezel registry-card registry-card--featured"
				baseY={featuredY}
				baseRotate={featuredRotate}
				hoverY={-8}
				hoverRotate={-0.8}
				enableMotion={enableMotion}
				>
				<div className="bezel__inner registry-card__inner">
					<p className="registry-card__eyebrow">Contributo principale</p>
					<h3>Viaggio di nozze tra Kyoto e la costa di Setouchi</h3>
					<p className="body muted">
						Una raccolta pensata per sostenere tappe, soggiorni e piccoli rituali di viaggio.
						Abbiamo mantenuto la sezione intenzionalmente essenziale, senza trattarla come un
						catalogo.
					</p>
					<div className="registry-card__chips">
						<span className="detail-chip detail-chip--accent">Esperienze</span>
						<span className="detail-chip detail-chip--accent">Soggiorni</span>
						<span className="detail-chip detail-chip--accent">Cene speciali</span>
					</div>
					<div className="registry-card__support">
						<span className="registry-card__support-label">Ritmo del dono</span>
						<span className="registry-card__support-line" aria-hidden="true"></span>
						<span className="registry-card__support-copy">Pensato per contribuire con liberta', senza soglie rigide.</span>
					</div>
					<m.a
						className="button"
						href="https://example.com/lista-nozze"
						target="_blank"
						rel="noopener noreferrer"
						whileHover={enableMotion ? { y: -4, transition: { duration: 0.32, ease } } : undefined}
					>
						<span>Apri il link placeholder</span>
						<m.span className="button__icon" aria-hidden="true" whileHover={enableMotion ? { x: 4, y: -2, scale: 1.05 } : undefined}>
							↗
						</m.span>
					</m.a>
				</div>
			</RegistryCard>

				<div className="registry__stack">
					<RegistryCard
					className="bezel registry-card"
					baseY={stackY}
					baseRotate={stackRotate}
					hoverY={-7}
					hoverRotate={0.8}
					enableMotion={enableMotion}
					>
					<div className="bezel__inner registry-card__inner">
						<p className="registry-card__eyebrow">Modalita' alternativa</p>
						<h3>Bonifico dedicato</h3>
						<div className="detail-row detail-row--stacked">
							<span className="detail-row__label">Intestazione</span>
							<span className="detail-row__value">Igor e Giulia Rossi</span>
						</div>
						<div className="detail-row detail-row--stacked">
							<span className="detail-row__label">IBAN placeholder</span>
							<span className="detail-row__value">IT00 X0000 0000 0000 0000 0000 000</span>
						</div>
						<m.a
							className="button button--secondary"
							href="mailto:lista.nozze@example.com"
							whileHover={enableMotion ? { y: -4, transition: { duration: 0.32, ease } } : undefined}
						>
							<span>Richiedi i dettagli</span>
							<m.span className="button__icon" aria-hidden="true" whileHover={enableMotion ? { x: 4, y: -2, scale: 1.05 } : undefined}>
								↗
							</m.span>
						</m.a>
					</div>
				</RegistryCard>

					<m.aside
					className="bezel registry-note"
					style={enableMotion ? { y: noteY, rotate: noteRotate } : undefined}
				>
					<div className="bezel__inner registry-note__inner">
						<span className="eyebrow">Grazie</span>
						<p className="body">
							La vostra presenza restera&apos; il regalo piu' importante. Questa sezione usa testi,
							immagini e riferimenti placeholder, pronti per essere sostituiti con i dettagli
							definitivi.
						</p>
						<p className="registry-note__signature">Igor e Giulia</p>
					</div>
					</m.aside>
				</div>
			</div>
		</MotionProvider>
	);
}
