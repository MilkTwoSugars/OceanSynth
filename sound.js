var midi, data;
var oscs = {};
var oscType;
var waves;

// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status

    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    playNote(data);
}

function playNote(data) {
    if (data[2] != 127) {
        console.log("Note played")
        osc = new p5.Oscillator(oscType);
        osc.amp(0);
        osc.fade(0.075,0.25);
        osc.start();
        var freq = midiToFreq(data[1])
        osc.freq(freq);
        // lastOsc.osc = osc;
        // lastOsc.freq = freq;
        bubbles.push(new Bubble());
        oscs[data[1]] = osc;
    } else {
        //oscs[data[1]].fade(0,1);
        oscs[data[1]].stop(1.1);
        //setTimeout(function() {
        //
        //}, 50);
    }
}

function playNoise() {
    waves = new p5.Noise('brown');
    waves.amp(0)
    waves.start();
    waves.fade(0.01, 1)
}
