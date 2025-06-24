let challengeCount = 0;
let totalTime = 0;

async function getRandomPageTitle() {
	const response = await fetch("https://en.wikipedia.org/api/rest_v1/page/random/summary");
	const data = await response.json();
	return {
		title: data.title,
		url: data.content_urls.desktop.page
	};
}

async function generateChallenge() {
	const btn = document.getElementById('generateBtn');
	const loading = document.getElementById('loading');
	const challengeDiv = document.getElementById('challenge');

	// Disable button and show loading
	btn.disabled = true;
	btn.textContent = '⏳ Generating...';
	loading.classList.add('show');
	challengeDiv.classList.remove('show');

	try {
		const start = await getRandomPageTitle();
		let end;

		do {
			end = await getRandomPageTitle();
		} while (end.title === start.title);

		challengeCount++;

		// Hide loading and show challenge
		loading.classList.remove('show');

		challengeDiv.innerHTML = `
			<div class="challenge-card">
				<div class="route-item">
					<div>
						<div class="route-label">Start Here</div>
						<div class="route-title">
							<a href="${start.url}" target="_blank" class="route-link">${start.title}</a>
						</div>
					</div>
				</div>

				<div class="arrow">⬇️</div>

				<div class="route-item">
					<div>
						<div class="route-label">Reach This Page</div>
						<div class="route-title">
							<a href="${end.url}" target="_blank" class="route-link">${end.title}</a>
						</div>
					</div>
				</div>

				<div class="instructions">
					<h3>🎮 How to Play</h3>
					<p>
						Click the start page link, then navigate to the target page using only Wikipedia's internal links.
						No external links, search bar, or back button allowed!
					</p>
				</div>

				<div class="stats">
					<div class="stat-item">
						<div class="stat-number">${challengeCount}</div>
						<div class="stat-label">Challenges</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">∞</div>
						<div class="stat-label">Possibilities</div>
					</div>
					<div class="stat-item">
						<div class="stat-number">🏆</div>
						<div class="stat-label">Your Speed</div>
					</div>
				</div>
			</div>
		`;

		challengeDiv.classList.add('show');

	} catch (error) {
		challengeDiv.innerHTML = `
			<div class="challenge-card">
				<p style="color: #ff6b6b;">❌ Failed to fetch challenge. Please try again!</p>
			</div>
		`;
		challengeDiv.classList.add('show');
	}

	// Re-enable button
	btn.disabled = false;
	btn.textContent = '🎯 New Challenge';
}

// Sparkle effect
document.addEventListener('mousemove', (e) => {
	if (Math.random() > 0.98) {
		createSparkle(e.clientX, e.clientY);
	}
});

function createSparkle(x, y) {
	const sparkle = document.createElement('div');
	sparkle.style.position = 'fixed';
	sparkle.style.left = x + 'px';
	sparkle.style.top = y + 'px';
	sparkle.style.width = '4px';
	sparkle.style.height = '4px';
	sparkle.style.background = 'white';
	sparkle.style.borderRadius = '50%';
	sparkle.style.pointerEvents = 'none';
	sparkle.style.zIndex = '9999';
	sparkle.style.animation = 'sparkle 1s ease-out forwards';

	document.body.appendChild(sparkle);

	setTimeout(() => {
		document.body.removeChild(sparkle);
	}, 1000);
}

// Add sparkle animation style
const style = document.createElement('style');
style.textContent = `
	@keyframes sparkle {
		0% {
			transform: scale(0) rotate(0deg);
			opacity: 1;
		}
		100% {
			transform: scale(1) rotate(180deg);
			opacity: 0;
		}
	}
`;
document.head.appendChild(style);