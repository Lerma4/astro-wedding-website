import { AnimatePresence, m, useReducedMotion, type Variants } from 'framer-motion';
import { useEffect, useId, useRef, useState, type MouseEvent } from 'react';
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
		transition: { duration: 0.24, ease, when: 'beforeChildren' },
	},
	exit: { opacity: 0, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } },
};

const panelVariants: Variants = {
	hidden: { opacity: 0, y: 18, scale: 0.985 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
		transition: { duration: 0.34, ease, delayChildren: 0.02, staggerChildren: 0.045 },
	},
	exit: { opacity: 0, y: 12, scale: 0.99, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } },
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 14 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease } },
	exit: { opacity: 0, y: 10, transition: { duration: 0.12 } },
};

export default function MotionNav({ links }: MotionNavProps) {
	const [open, setOpen] = useState(false);
	const [overlayActive, setOverlayActive] = useState(false);
	const reduceMotion = useReducedMotion() ?? false;
	const menuId = useId();
	const rootRef = useRef<HTMLElement | null>(null);
	const toggleRef = useRef<HTMLButtonElement | null>(null);
	const panelRef = useRef<HTMLDivElement | null>(null);
	const pendingHashRef = useRef<string | null>(null);

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
		const inertExclusions = new Set<Element>(
			[root, islandHost].filter((element): element is Element => Boolean(element)),
		);
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

	const scrollToHash = (hash: string) => {
		const target = document.querySelector<HTMLElement>(hash);
		if (!target) {
			return;
		}

		target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
		window.history.pushState(null, '', hash);
	};

	const closeMenuAndScroll = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
		if (!href.startsWith('#')) {
			closeMenu();
			return;
		}

		event.preventDefault();
		pendingHashRef.current = href;
		closeMenu();
	};

	const handleMenuExitComplete = () => {
		setOverlayActive(false);

		const pendingHash = pendingHashRef.current;
		if (!pendingHash) {
			return;
		}

		pendingHashRef.current = null;
		requestAnimationFrame(() => scrollToHash(pendingHash));
	};

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
							<span className="nav-brand__text">Igor & Eleonora</span>
						</a>

						<nav className="nav-actions" aria-label="Sezioni principali">
							{links.map((link) => (
								<a
									key={link.href}
									href={link.href}
									className={`button button--secondary nav-action${link.href === '#location' ? ' nav-action--location' : ''}`}
								>
									<span>{link.label}</span>
									<span className="button__icon" aria-hidden="true">↗</span>
								</a>
							))}
						</nav>

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
								transition={{ duration: 0.28, ease }}
							/>
							<m.span
								className="menu-toggle__line"
								animate={reduceMotion ? { opacity: open ? 0 : 1 } : open ? { opacity: 0, scaleX: 0.2 } : { opacity: 1, scaleX: 1 }}
								transition={{ duration: 0.2, ease }}
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
								transition={{ duration: 0.28, ease }}
							/>
						</m.button>
					</div>
				</div>
			</div>

			<AnimatePresence onExitComplete={handleMenuExitComplete}>
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
									<span>Igor & Eleonora</span>
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
							</m.div>

							<nav className="menu-overlay__actions" aria-label="Menu mobile">
								{links.map((link) => (
									<m.a
										key={link.href}
										href={link.href}
										className={`button button--secondary menu-overlay__action${link.href === '#location' ? ' nav-action--location' : ''}`}
										onClick={(event) => closeMenuAndScroll(event, link.href)}
										variants={itemVariants}
										whileHover={reduceMotion ? undefined : { y: -4, transition: { duration: 0.35, ease } }}
									>
										<span>{link.href === '#location' ? 'Scopri la location' : 'Apri la lista nozze'}</span>
										<span className="button__icon" aria-hidden="true">↗</span>
									</m.a>
								))}
							</nav>

							<m.p className="menu-overlay__footer" variants={itemVariants}>
								Arenzano, 6 settembre 2026.
							</m.p>
						</m.div>
					</m.div>
				) : null}
			</AnimatePresence>
			</header>
		</MotionProvider>
	);
}
