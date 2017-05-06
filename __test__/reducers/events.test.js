/* eslint-disable */

import events from '../../src/reducers/events';
import { EVENT } from '../../src/constants/actionTypes';

describe('Events reducer', () => {

  it('Has default state', () => {
    expect(
      events(undefined, { type: undefined })
    ).toEqual({});
  });

  it('Handles add all event', () => {
    expect(
      events({}, {
        type: EVENT.addAll,
        payload: {
          "3gxrbj7": {
            "balance": false,
            "end": "2017-05-03T09:00:00",
            "fitting": true,
            "phone": "098",
            "qty": "4",
            "start": "2017-05-03T08:30:00",
            "title": "test",
            "uid": "3gxrbj7",
            "vehicle": "test"
          },
          "3w9avme": {
            "balance": false,
            "end": "2017-05-02T04:30:00",
            "fitting": true,
            "phone": "098",
            "qty": "4",
            "start": "2017-05-02T04:00:00",
            "title": "marin",
            "uid": "3w9avme",
            "vehicle": "au"
          },
          "ss8gmsy": {
            "balance": false,
            "end": "2017-05-03T09:00:00",
            "fitting": true,
            "phone": "097",
            "qty": "4",
            "start": "2017-05-03T08:30:00",
            "title": "hah",
            "uid": "ss8gmsy",
            "vehicle": "hh"
          }
        }
      })
    ).toEqual({
      "3gxrbj7": {
        "balance": false,
        "end": "2017-05-03T09:00:00",
        "fitting": true,
        "phone": "098",
        "qty": "4",
        "start": "2017-05-03T08:30:00",
        "title": "test",
        "uid": "3gxrbj7",
        "vehicle": "test"
      },
      "3w9avme": {
        "balance": false,
        "end": "2017-05-02T04:30:00",
        "fitting": true,
        "phone": "098",
        "qty": "4",
        "start": "2017-05-02T04:00:00",
        "title": "marin",
        "uid": "3w9avme",
        "vehicle": "au"
      },
      "ss8gmsy": {
        "balance": false,
        "end": "2017-05-03T09:00:00",
        "fitting": true,
        "phone": "097",
        "qty": "4",
        "start": "2017-05-03T08:30:00",
        "title": "hah",
        "uid": "ss8gmsy",
        "vehicle": "hh"
      }
    });
  });

  it('Handles add event', () => {
    expect(
      events({
        'p2fsxc6': {
          title: 'Test',
          phone: '092',
          vehicle: 'ford',
          fitting: true,
          balance: false,
          qty: '4',
          start: '2017-04-27T02:30:00.000Z',
          end: '2017-04-27T01:00:00.000Z',
          uid: 'p2fsxc6',
        }
      }, {
          type: EVENT.add,
          payload: {
            title: 'Marin',
            phone: '091',
            vehicle: 'audi',
            fitting: true,
            balance: false,
            qty: '4',
            start: '2017-04-27T02:30:00.000Z',
            end: '2017-04-27T01:00:00.000Z',
            uid: 'p2fsxc5',
          }
        })
    ).toEqual({
      'p2fsxc6': {
        title: 'Test',
        phone: '092',
        vehicle: 'ford',
        fitting: true,
        balance: false,
        qty: '4',
        start: '2017-04-27T02:30:00.000Z',
        end: '2017-04-27T01:00:00.000Z',
        uid: 'p2fsxc6',
      },
      'p2fsxc5': {
        title: 'Marin',
        phone: '091',
        vehicle: 'audi',
        fitting: true,
        balance: false,
        qty: '4',
        start: '2017-04-27T02:30:00.000Z',
        end: '2017-04-27T01:00:00.000Z',
        uid: 'p2fsxc5',
      }
    });
  })

  it('Handles update event', () => {
    expect(
      events({
        'p2fsxc6': {
          title: 'Test',
          phone: '091',
          vehicle: 'audi',
          fitting: true,
          balance: false,
          qty: '4',
          start: '2017-04-27T02:30:00.000Z',
          end: '2017-04-27T01:00:00.000Z',
          uid: 'p2fsxc6',
        }
      }, {
          type: EVENT.update,
          payload: {
            title: 'Marin',
            phone: '091',
            vehicle: 'audi',
            fitting: true,
            balance: false,
            qty: '4',
            start: '2017-04-27T02:30:00.000Z',
            end: '2017-04-27T03:00:00.000Z',
            uid: 'p2fsxc6',
          }
        })
    ).toEqual({
      'p2fsxc6': {
        title: 'Marin',
        phone: '091',
        vehicle: 'audi',
        fitting: true,
        balance: false,
        qty: '4',
        start: '2017-04-27T02:30:00.000Z',
        end: '2017-04-27T03:00:00.000Z',
        uid: 'p2fsxc6',
      },
    });
  })

});
