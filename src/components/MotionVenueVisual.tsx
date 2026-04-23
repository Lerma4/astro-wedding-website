import { m, useReducedMotion } from 'framer-motion';
import MotionProvider from './MotionProvider';

const ease = [0.32, 0.72, 0, 1] as const;

export default function MotionVenueVisual() {
	const reduceMotion = useReducedMotion() ?? false;

	return (
		<MotionProvider>
			<div className="venue__visual venue__visual--motion">
				<div className="venue__stage" aria-hidden="true">
					<div className="venue__halo venue__halo--rose" />
					<div className="venue__halo venue__halo--sage" />
				</div>

				<m.figure
				className="bezel venue-figure venue-figure--motion"
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
			</div>
		</MotionProvider>
	);
}
