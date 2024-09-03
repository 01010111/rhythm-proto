const dot = document.querySelector('.dot');
const container = document.querySelector('.container');
const music = new Howl({
	src: ['music.ogg', 'music.wav'],
	loop: true,
});

var play_music = false;

function pulse() {
	dot.animate([
		{ scale: '0.08' },
		{ scale: '0.04' }
	], {
		duration: 250,
		easing: 'ease-out'
	});

	if (!music.playing() && play_music) music.play();
}

container.onpointerdown = (e) => pulse();
window.addEventListener('keydown', (e) => {
	if (e.key === 'm' && !e.repeat) play_music = true;
	if (e.key === ' ' && !e.repeat) pulse();
});

var bar_itr = 0;
var bar_count = document.querySelectorAll('.bar').length;
const max_bar_size = 32;
for (let bar of document.querySelectorAll('.bar')) {
	let s = 1 - Math.abs(bar_count/2 - bar_itr)/(bar_count/2);
	console.log(s, bar_count/2, bar_itr);
	bar.addEventListener('animationiteration', () => {
		let random = (Math.random() + Math.random()) / 2;
		let scale = Math.max(8, random * s * s * max_bar_size * 8);
		bar.style.setProperty('--sy', `${scale}px`);
	});
	bar_itr++;
}

function set_bpm(bpm) {
	bpm = parseInt(new URLSearchParams(window.location.search).get('bpm')) || 120;
	let bt = 60/bpm * 1000;
	document.documentElement.style.cssText = `--bt: ${bt}ms`
}

set_bpm();