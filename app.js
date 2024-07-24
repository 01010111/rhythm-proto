const dot = document.querySelector('.dot');
const container = document.querySelector('.container');
const music = new Howl({
	src: ['music.ogg', 'music.wav'],
	loop: true,
});

function pulse() {
	dot.animate([
		{ scale: '0.08' },
		{ scale: '0.04' }
	], {
		duration: 250,
		easing: 'ease-out'
	});

	if (!music.playing()) music.play();
}

container.onpointerdown = (e) => pulse();
window.addEventListener('keydown', (e) => { if (e.key === ' ' && !e.repeat) pulse()} );