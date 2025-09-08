function CMP800() {
    // constructor function (can be empty or init stuff)
}

// The button that enables/disables scratching
CMP800.wheelTouch = function (channel, control, value, status, group) {
    var deck = script.deckFromGroup(group);
    if ((status & 0xF0) === 0x90) {    // If button down
        var alpha = 1.0/8;
        var beta = alpha/16;
        engine.scratchEnable(deck, 128, 33+1/3, alpha, beta);
    } else {    // If button up
        engine.scratchDisable(deck);
    }
}

// The wheel that actually controls the scratching
CMP800.wheelTurn = function (channel, control, value, status, group) {
    // --- Choose only one of the following!
    
    // A: For a control that centers on 0:
    var newValue;
    if (value < 64) {
        newValue = value;
    } else {
        newValue = value - 128;
    }

    // Or: For a control that centers on 0x40 (64):
    // var newValue = value - 64;
    
    // --- End choice
    
    // In either case, register the movement
    var deck = script.deckFromGroup(group);
    if (engine.isScratching(deck)) {
        engine.scratchTick(deck, newValue); // Scratch!
    } else {
        engine.setValue(group, 'jog', newValue); // Pitch bend
    }
}
