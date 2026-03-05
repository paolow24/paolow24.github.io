// State and DOM
const body = document.body;
const modeToggle = document.getElementById('mode-toggle');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const timeEl = document.getElementById('time');
const saveBtn = document.getElementById('save');
const downloadBtn = document.getElementById('download');

// Records stored in localStorage key
const STORE_KEY = 'hci_reading_records_v1';
let records = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');

// Mode handling
function applyMode(mode){
	if(mode === 'dark') body.classList.add('dark'); else body.classList.remove('dark');
	modeToggle.setAttribute('aria-pressed', mode === 'dark');
	localStorage.setItem('hci_mode', mode);
}
modeToggle.addEventListener('click', ()=>{
	const mode = body.classList.contains('dark')? 'light':'dark';
	applyMode(mode);
});
// Initialize mode from previous choice or system preference
(function initMode(){
	const stored = localStorage.getItem('hci_mode');
	if(stored) applyMode(stored);
	else if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyMode('dark');
	else applyMode('light');
})();

// Timer
let startTime = null;
let elapsed = 0;
let raf = null;
function updateTimer(){
	const now = performance.now();
	elapsed = (now - startTime)/1000;
	timeEl.textContent = `Elapsed: ${elapsed.toFixed(2)}s`;
	raf = requestAnimationFrame(updateTimer);
}
startBtn.addEventListener('click', ()=>{
	startBtn.disabled = true; stopBtn.disabled = false; resetBtn.disabled = false;
	// clear any previous stopped emphasis
	timeEl.classList.remove('stopped','pulse');
	startTime = performance.now();
	updateTimer();
});
stopBtn.addEventListener('click', ()=>{
	stopBtn.disabled = true; startBtn.disabled = false; resetBtn.disabled = false;
	if(raf) cancelAnimationFrame(raf);
	if(startTime){
		const duration = ((performance.now() - startTime)/1000);
		timeEl.textContent = `Elapsed: ${duration.toFixed(2)}s`;
		// store a provisional record (user may still pick preference and save)
		body.dataset.lastDuration = duration.toFixed(3);
		// emphasize the exact stop time visually and with a short pulse
		timeEl.classList.remove('pulse');
		timeEl.classList.add('stopped');
		// trigger pulse animation
		requestAnimationFrame(()=> timeEl.classList.add('pulse'));
	}
	startTime = null;
});

// Reset timer and UI state
if(resetBtn){
    resetBtn.addEventListener('click', ()=>{
        if(raf) cancelAnimationFrame(raf);
        startTime = null;
        elapsed = 0;
        timeEl.textContent = 'Elapsed: 0.00s';
        delete body.dataset.lastDuration;
		// remove any emphasis
		timeEl.classList.remove('stopped','pulse');
        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = true;
    });
}


