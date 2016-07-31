/**
 * Created by 96664_000 on 30.07.2016.
 */
'use strict';

import EventEmitter from 'events';
import merge from 'merge';

class DnD extends EventEmitter{

    static get DEFAULT_OPTIONS() {
        if (!this._DEFAULT_OPTIONS) {
            this._DEFAULT_OPTIONS = {
                drags: [],
                drops: [],
                disabledDrags: [],
                disabledDrops: [],
                onDrop: function(){}
            };
        }
        return this._DEFAULT_OPTIONS;
    }

    static get EVENTS() {
        if (!this._Events) {
            this._Events = {
                DROP: 'drop'
            };
        }
        return this._Events;
    }

    constructor(options){
        super();
        this.options = merge.recursive(true, this.constructor.DEFAULT_OPTIONS, options);
        this._disabledDrags = new Set();
        this._disabledDrops = new Set();
        this._addEmitters();
        this._addListeners();
    }

    _addListeners(){
        this.options.drags.forEach((drag, index) => {
            drag.addEventListener('dragstart', event => {
                event.dataTransfer.setData("index", index);
            });
        });
        this.options.drops.forEach((drop, index) => {
            drop.addEventListener('dragover', event => {
                event.preventDefault();
            });
            drop.addEventListener('drop', event => {
                event.preventDefault();
                if(!this._disabledDrops.has(index)) {
                    let dragIndex = event.dataTransfer.getData("index");
                    drop.innerHTML = `${dragIndex}, ${index}`;
                    this.emit(this.constructor.EVENTS.DROP, dragIndex, index);
                }
            });
        });
    }
    
    _disableDrag(index){
        this._disabledDrags.add(index);
    }
    _disableDrop(index){
        this._disabledDrops.add(index);
    }
    
    _addEmitters(){
        this.on(this.constructor.EVENTS.DROP, (dragIndex, dropIndex) => {
            this.options.onDrop(dragIndex, dropIndex);
        });
    }
}

module.exports = DnD;