import { AnimatePresence, m, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useId, useRef, useState } from 'react';
import logoImg from '../assets/logo.webp';
import MotionProvider from './MotionProvider';

type NavLink = {
	href: string;
	label: string;
};

interface MotionNavProps {
	links: NavLink[];
}

const ease = [0.32, 0.72, 0, 1] as const;

const overlayVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { duration: 0.45, ease, when: 'beforeChildren' },
	},
	exit: { opacity: 0, transition: { duration: 0.28, ease: [0.4, 0, 1, 1] } },
};

const panelVariants: Variants = {
	hidden: { opacity: 0, y: 30, scale: 0.96 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.6, ease, delayChildren: 0.08, staggerChildren: 0.08 },
	},
	exit: { opacity: 0, y: 18, scale: 0.98, transition: { duration: 0.24, ease: [0.4, 0, 1, 1] } },
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 22 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
	exit: { opacity: 0, y: 16, transition: { duration: 0.18 } },
};

export default function MotionNav({ links }: MotionNavProps) {
	const [open, setOpen] = useState(false);
	const [overlayActive, setOverlayActive] = useState(false);
	const reduceMotion = useReducedMotion() ?? false;
	const menuId = useId();
	const rootRef = useRef<HTMLElement | null>(null);
	const toggleRef = useRef<HTMLButtonElement | null>(null);
	const panelRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		document.body.dataset.menuOpen = overlayActive ? 'true' : 'false';
		return () => {
			document.body.dataset.menuOpen = 'false';
		};
	}, [overlayActive]);

	useEffect(() => {
		if (!open) {
			return;
		}

		const root = rootRef.current;
		const panel = panelRef.current;
		const islandHost = root?.closest('astro-island');
		const previouslyFocused = document.activeElement instanceof HTMLElement
			? document.activeElement
			: null;
		const inertExclusions = new Set<Element>([root, islandHost].filter(Boolean));
		const inertSiblings = Array.from(document.body.children).filter(
			(child) => !inertExclusions.has(child),
		);
		inertSiblings.forEach((child) => child.setAttribute('inert', ''));

		const focusables = panel
			? Array.from(
					panel.querySelectorAll<HTMLElement>(
						'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
					),
				)
			: [];

		(focusables[0] ?? panel)?.focus();

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setOpen(false);
				return;
			}

			if (event.key !== 'Tab' || focusables.length === 0) {
				return;
			}

			const first = focusables[0];
			const last = focusables[focusables.length - 1];
			const active = document.activeElement;

			if (event.shiftKey && active === first) {
				event.preventDefault();
				last.focus();
				return;
			}

			if (!event.shiftKey && active === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener('keydown', onKeyDown);
		return () => {
			inertSiblings.forEach((child) => child.removeAttribute('inert'));
			(previouslyFocused ?? toggleRef.current)?.focus();
			document.removeEventListener('keydown', onKeyDown);
		};
	}, [open]);

	const openMenu = () => {
		setOverlayActive(true);
		setOpen(true);
	};

	const closeMenu = () => setOpen(false);

	return (
		<MotionProvider>
			<header ref={rootRef} className="floating-nav-shell" data-floating-nav data-open={open ? 'true' : 'false'}>
			<div className="container floating-nav-wrap">
				<div className="bezel bezel--glass floating-nav" data-reveal>
					<div className="bezel__inner floating-nav__inner">
						<a className="nav-brand" href="#top" aria-label="Torna all'inizio">
							<img
								src={logoImg.src}
								alt=""
								style={{ height: '46px', width: 'auto', display: 'block' }}
							/>
							<span className="nav-brand__text">Igor & Giulia</span>
						</a>

						<nav className="nav-links" aria-label="Sezioni principali">
							{links.map((link) => (
								<a key={link.href} href={link.href} className="nav-links__item">
									{link.label}
								</a>
							))}
						</nav>

						<a className="button button--secondary nav-cta" href="#lista-nozze">
							<span>Lista nozze</span>
							<span className="button__icon" aria-hidden="true">↗</span>
						</a>

						<m.button
							ref={toggleRef}
							type="button"
							className="menu-toggle"
							onClick={() => (open ? closeMenu() : openMenu())}
							aria-expanded={open}
							aria-controls={menuId}
							aria-label={open ? 'Chiudi menu' : 'Apri menu'}
							whileTap={reduceMotion ? undefined : { scale: 0.96 }}
						>
							<m.span
								className="menu-toggle__line"
								animate={
									reduceMotion
										? { opacity: 1 }
										: open
											? { y: 0, rotate: 45 }
											: { y: -7, rotate: 0 }
								}
								transition={{ duration: 0.45, ease }}
							/>
							<m.span
								className="menu-toggle__line"
								animate={reduceMotion ? { opacity: open ? 0 : 1 } : open ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
								transition={{ duration: 0.3, ease }}
							/>
							<m.span
								className="menu-toggle__line"
								animate={
									reduceMotion
										? { opacity: 1 }
										: open
											? { y: 0, rotate: -45 }
											: { y: 7, rotate: 0 }
								}
								transition={{ duration: 0.45, ease }}
							/>
						</m.button>
					</div>
				</div>
			</div>

			<AnimatePresence onExitComplete={() => setOverlayActive(false)}>
				{open ? (
					<m.div
						className="menu-overlay"
						id={menuId}
						role="dialog"
						aria-modal="true"
						aria-label="Menu mobile"
						variants={overlayVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						<div className="menu-overlay__veil" aria-hidden="true">
							<div className="menu-overlay__orb menu-overlay__orb--rose"></div>
							<div className="menu-overlay__orb menu-overlay__orb--champagne"></div>
						</div>

						<m.div ref={panelRef} className="menu-overlay__panel" variants={panelVariants} tabIndex={-1}>
							<m.div className="menu-overlay__header" variants={itemVariants}>
								<div className="menu-overlay__brand">
									<img
										src={logoImg.src}
										alt=""
										style={{ height: '40px', width: 'auto', display: 'block' }}
									/>
									<span>Igor & Giulia</span>
								</div>
								<button
									type="button"
									className="menu-overlay__close"
									onClick={closeMenu}
									aria-label="Chiudi menu"
								>
									<span></span>
									<span></span>
								</button>
							</m.div>

							<m.div className="menu-overlay__intro" variants={itemVariants}>
								<span className="eyebrow">Menu</span>
								<p className="menu-overlay__lede">
									Una soglia morbida per entrare nel racconto della giornata.
								</p>
							</m.div>

							<nav className="menu-overlay__nav" aria-label="Menu mobile">
								{links.map((link, index) => (
									<m.a
										key={link.href}
										href={link.href}
										className="menu-overlay__link"
										onClick={closeMenu}
										variants={itemVariants}
										whileHover={
											reduceMotion ? undefined : { x: 8, transition: { duration: 0.35, ease } }
										}
									>
										<span className="menu-overlay__link-index">0{index + 1}</span>
										<span className="menu-overlay__link-label">{link.label}</span>
										<span className="menu-overlay__link-arrow" aria-hidden="true">↗</span>
									</m.a>
								))}
							</nav>

							<m.a
								className="button menu-overlay__cta"
								href="#lista-nozze"
								onClick={closeMenu}
								variants={itemVariants}
								whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.35, ease } }}
							>
								<span>Apri la sezione regali</span>
								<span className="button__icon" aria-hidden="true">↗</span>
							</m.a>

							<m.p className="menu-overlay__footer" variants={itemVariants}>
								Langhe, giugno, luce di sera.
							</m.p>
						</m.div>
					</m.div>
				) : null}
			</AnimatePresence>
			</header>
		</MotionProvider>
	);
}
