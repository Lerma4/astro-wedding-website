import { m, useReducedMotion } from 'framer-motion';
import MotionProvider from './MotionProvider';

const ease = [0.32, 0.72, 0, 1] as const;

const venuePhotos = [
	{
		src: '/ristorante/img-4372_2_100459.webp',
		alt: 'Vista luminosa degli spazi esterni di Agueta du Sciria ad Arenzano',
		label: 'La cornice',
		variant: 'main',
		width: 1280,
		height: 853,
	},
	{
		src: '/ristorante/img-4389_2_100459.webp',
		alt: 'Dettaglio del ristorante con tavoli allestiti e luce naturale',
		label: 'Il convivio',
		variant: 'convivio',
		width: 1280,
		height: 853,
	},
	{
		src: '/ristorante/bordo-piscina.webp',
		alt: 'Bordo piscina della location immerso nel verde',
		label: 'Bordo piscina',
		variant: 'piscina',
		width: 637,
		height: 420,
	},
] as const;

export default function MotionVenueVisual() {
	const reduceMotion = useReducedMotion() ?? false;

	return (
		<MotionProvider>
			<div className="venue__visual venue__visual--motion">
				<div className="venue__stage" aria-hidden="true">
					<div className="venue__halo venue__halo--rose" />
					<div className="venue__halo venue__halo--sage" />
				</div>

				<m.div
					className="bezel venue-gallery venue-gallery--motion"
					whileHover={
						reduceMotion
							? undefined
							: {
								scale: 1.012,
								transition: { duration: 0.32, ease },
							}
					}
				>
					<div className="bezel__inner venue-gallery__inner">
						<span className="venue-gallery__orbit" aria-hidden="true" />

						{venuePhotos.map((photo) => (
							<figure
								className={`venue-gallery__frame venue-gallery__frame--${photo.variant}`}
								key={photo.src}
							>
								<img
									src={photo.src}
									alt={photo.alt}
									width={photo.width}
									height={photo.height}
									loading="lazy"
									decoding="async"
								/>
								<figcaption className="venue-gallery__caption">
									<span className="detail-chip">{photo.label}</span>
								</figcaption>
							</figure>
						))}
					</div>
				</m.div>
			</div>
		</MotionProvider>
	);
}
