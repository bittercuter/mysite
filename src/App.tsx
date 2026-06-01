const services = [
	{ title: "Web Application", body: "企画・設計から運用まで一貫した開発" },
	{ title: "System Development", body: "受託による業務システムの構築" },
	{ title: "Mobile Application", body: "個人向けアプリの企画・開発・運営" },
	{ title: "Technical Consulting", body: "技術選定・アーキテクチャ支援" },
];

const info = [
	{ label: "屋号", value: "bittercute" },
	{ label: "事業内容", value: "情報通信業（ソフトウェア開発）" },
	{ label: "拠点", value: "Tokyo, Japan" },
];

function App() {
	return (
		<div className="grain min-h-screen overflow-x-hidden font-sans text-coffee-900 bg-cream-50 selection:bg-coffee-700 selection:text-cream-50">
			<BackgroundOrbs />

			<main className="relative z-10 mx-auto w-full max-w-3xl px-5 sm:px-8 md:px-10 py-16 sm:py-24 md:py-28">
				<Hero />

				<div className="space-y-16 sm:space-y-20 md:space-y-24 mt-20 sm:mt-28 md:mt-32">
					<About />
					<Services />
					<Information />
					<Contact />
				</div>

				<Footer />
			</main>
		</div>
	);
}

function BackgroundOrbs() {
	return (
		<div
			aria-hidden
			className="pointer-events-none fixed inset-0 overflow-hidden"
		>
			<div className="absolute -top-40 -left-40 w-[24rem] sm:w-[32rem] md:w-[36rem] aspect-square rounded-full bg-cream-100 blur-3xl opacity-70" />
			<div className="absolute top-1/3 -right-24 sm:-right-32 w-[22rem] sm:w-[28rem] md:w-[30rem] aspect-square rounded-full bg-cream-200 blur-3xl opacity-60" />
			<div className="absolute bottom-0 left-1/4 w-[20rem] sm:w-[26rem] md:w-[28rem] aspect-square rounded-full bg-coffee-500/10 blur-3xl" />
		</div>
	);
}

function Eyebrow({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.65rem] sm:text-[0.7rem] tracking-[0.25em] sm:tracking-[0.3em] uppercase text-coffee-600/80">
			<span className="h-px w-6 sm:w-8 bg-coffee-600/40" />
			<span>{children}</span>
		</div>
	);
}

function Hero() {
	return (
		<header className="fade-up">
			<Eyebrow>Software Development Studio</Eyebrow>

			<h1
				className="mt-5 sm:mt-6 font-serif font-light text-[clamp(2.75rem,13vw,7.5rem)] leading-[0.95] tracking-tight text-coffee-800"
				style={{ fontVariationSettings: '"opsz" 144, "SOFT" 50' }}
			>
				bitter<em className="italic font-normal text-coffee-700">cute</em>
				<span className="text-coffee-500">.</span>
			</h1>

			<p className="mt-6 sm:mt-8 max-w-xl text-[0.9rem] sm:text-base text-coffee-800/75 leading-relaxed">
				一行のコードから、世界を少し心地よく。
				<br />
				Webアプリケーション、モバイル、システム開発を中心に、
				<wbr />
				小さくしなやかなソフトウェアを企画・開発しています。
			</p>
		</header>
	);
}

function SectionLabel({ children }: { children: React.ReactNode }) {
	return (
		<div className="mb-6 sm:mb-8">
			<Eyebrow>{children}</Eyebrow>
		</div>
	);
}

function About() {
	return (
		<section className="fade-up" style={{ animationDelay: "120ms" }}>
			<SectionLabel>About</SectionLabel>
			<p className="font-serif font-light text-xl sm:text-2xl md:text-3xl leading-[1.5] text-coffee-800">
				小さな個人・事業者のための、
				<br className="hidden sm:block" />
				丁寧で、長く使われるソフトウェアを。
			</p>
		</section>
	);
}

function Services() {
	return (
		<section className="fade-up" style={{ animationDelay: "200ms" }}>
			<SectionLabel>Services</SectionLabel>
			<ul className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-coffee-700/10 border border-coffee-700/10 rounded-2xl overflow-hidden">
				{services.map((s, i) => (
					<li
						key={s.title}
						className="min-w-0 bg-cream-50/80 backdrop-blur-sm p-5 sm:p-6 md:p-7 transition hover:bg-cream-100/80"
					>
						<div className="flex items-baseline gap-3">
							<span className="font-serif text-xs text-coffee-500 tabular-nums">
								{String(i + 1).padStart(2, "0")}
							</span>
							<h3 className="font-serif text-base sm:text-lg text-coffee-800">
								{s.title}
							</h3>
						</div>
						<p className="mt-2 text-[0.85rem] sm:text-sm text-coffee-800/70 leading-relaxed">
							{s.body}
						</p>
					</li>
				))}
			</ul>
		</section>
	);
}

function Information() {
	return (
		<section className="fade-up" style={{ animationDelay: "280ms" }}>
			<SectionLabel>Information</SectionLabel>
			<dl className="divide-y divide-coffee-700/10">
				{info.map((row) => (
					<div
						key={row.label}
						className="grid grid-cols-[6rem_1fr] sm:grid-cols-[9rem_1fr] gap-3 sm:gap-4 py-3 sm:py-4"
					>
						<dt className="text-[0.65rem] sm:text-xs tracking-widest uppercase text-coffee-500/80 pt-1.5 sm:pt-1">
							{row.label}
						</dt>
						<dd className="min-w-0 text-coffee-800/85 font-serif text-base sm:text-lg break-words">
							{row.value}
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}

function Contact() {
	return (
		<section className="fade-up" style={{ animationDelay: "360ms" }}>
			<SectionLabel>Contact</SectionLabel>
			<a
				href="mailto:contact@bittercute.dev"
				className="group inline-flex flex-wrap items-baseline gap-x-2 sm:gap-x-3 gap-y-1 font-serif text-[clamp(1.5rem,6vw,2.5rem)] text-coffee-800 hover:text-coffee-600 transition-colors break-all"
			>
				<span className="italic">contact</span>
				<span className="text-coffee-500/70">@</span>
				<span>bittercute.dev</span>
				<span
					aria-hidden
					className="text-coffee-500 transition-transform group-hover:translate-x-1"
				>
					→
				</span>
			</a>
			<p className="mt-3 sm:mt-4 text-[0.85rem] sm:text-sm text-coffee-800/60">
				お仕事のご相談・お問い合わせはこちらまで。
			</p>
		</section>
	);
}

function Footer() {
	return (
		<footer className="mt-20 sm:mt-28 md:mt-36 pt-6 sm:pt-8 border-t border-coffee-700/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2 text-[0.7rem] sm:text-xs text-coffee-500/80">
			<p>© 2026 bittercute. All rights reserved.</p>
			<p className="font-serif italic">Crafted in Tokyo</p>
		</footer>
	);
}

export default App;
