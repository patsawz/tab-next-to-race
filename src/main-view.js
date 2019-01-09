/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import './shared-styles.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-radio-button/vaadin-radio-group.js';
import '@vaadin/vaadin-radio-button/vaadin-radio-button.js';

class MainView extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }

        vaadin-radio-group {
          padding-right: 30px;
        }
      </style>

      <div class="card">
        <h1>Races</h1>
        <vaadin-radio-group label="Jurisdiction" name="jurisdiction" value="{{jurisdiction}}">
          <vaadin-radio-button value="NSW">NSW</vaadin-radio-button>
          <vaadin-radio-button value="VIC">VIC</vaadin-radio-button>
        </vaadin-radio-group>
        <vaadin-radio-group label="Race type" name="race-type" value="{{raceType}}">
          <vaadin-radio-button name="radio-group" value="R">Thoroughbred</vaadin-radio-button>
          <vaadin-radio-button name="radio-group" value="G">Greyhounds</vaadin-radio-button>
          <vaadin-radio-button name="radio-group" value="H">Harness</vaadin-radio-button>
        </vaadin-radio-group>
        <vaadin-grid items="[[races]]">
          <vaadin-grid-column path="raceStartTime" width="100px" flex-grow="0">
            <template class="header">Time to race</template>
            <template>[[computeTimeToRace(item.raceStartTime)]]</template>
          </vaadin-grid-column>
          <vaadin-grid-column path="raceNumber" header="#" width="50px" flex-grow="0"></vaadin-grid-column>
          <vaadin-grid-column path="raceName" header="Race Name"></vaadin-grid-column>
          <vaadin-grid-column path="meeting.meetingName" header="Meeting Name" width="180px" flex-grow="0"></vaadin-grid-column>
          <vaadin-grid-column path="meeting.location" header="Location" width="100px" flex-grow="0"></vaadin-grid-column>
        </vaadin-grid>
      </div>
    `;
  }

  static get properties() {
    return {
      races: {
        type: Array,
        value: []
      },
      jurisdiction: {
        type: String,
        observer: '_jurisdictionChanged'
      },
      raceType: {
        type: String,
        observer: '_raceTypeChanged'
      }
    }
  }
  computeTimeToRace(time) {
    const raceTime = new Date(time);
    let diff = raceTime - new Date();

    if (diff < 0) {
      return 'In Progress';
    }

    const hh = Math.floor(diff / 1000 / 60 / 60);
    diff -= hh * 1000 * 60 * 60;
    const mm = Math.floor(diff / 1000 / 60);
    diff -= mm * 1000 * 60;
    const ss = Math.floor(diff / 1000);
    diff -= ss * 1000;

    const displayMm = `0${mm}`.slice(-2);
    const displaySs = `0${ss}`.slice(-2);
    return `${hh}:${displayMm}:${displaySs}`;
  }

  _jurisdictionChanged(newVal) {
    this.dispatchEvent(new CustomEvent('jurisdiction-changed', {detail: {value: newVal}}));
  }

  _raceTypeChanged(newVal) {
    this.dispatchEvent(new CustomEvent('race-type-changed', {detail: {value: newVal}}));
  }
}

window.customElements.define('main-view', MainView);
