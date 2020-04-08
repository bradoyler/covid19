export function confirmedPCLayer () {
  return {
    id: 'confirmed-pc',
    type: 'circle',
    source: 'confirmed-pc',
    paint: {
      'circle-stroke-color': 'black',
      'circle-stroke-width': 1,
      'circle-opacity': 1,
      'circle-radius': [
        'step',
        ['get', 'rate'],
        0,
        2, // rate per 10k
        1.0,
        7, // ..
        2.0,
        15, // ..
        3.0,
        20,
        4.0,
        40,
        5.0,
        100, // ..
        6.0,
        200, // ..
        10.0,
        250, // ..
        12.5
      ],
      'circle-color': 'rgb(255, 51, 0)'
    }
  }
}

export function confirmedLayer () {
  return {
    id: 'confirmed',
    type: 'circle',
    source: 'confirmed',
    paint: {
      'circle-stroke-color': 'black',
      'circle-stroke-width': 1,
      'circle-opacity': 1,
      'circle-radius': [
        'step',
        ['get', 'cases'],
        0,
        2, // rate per 10k
        1.0,
        7, // ..
        2.0,
        15, // ..
        3.0,
        20,
        4.0,
        40,
        5.0,
        500,
        6.5,
        1000, // ..
        8.0,
        15000, // ..
        10.0,
        50000, // ..
        15.5
      ],
      'circle-color': 'rgb(255, 51, 0)'
    }
  }
}

export function deathsLayer () {
  return {
    id: 'deaths',
    type: 'circle',
    source: 'deaths',
    paint: {
      'circle-stroke-color': 'black',
      'circle-stroke-width': 1,
      'circle-opacity': 1,
      'circle-radius': [
        'step',
        ['get', 'cases'],
        0.0,
        2,
        1.0,
        10, // rate per 10k
        2.0,
        25, // ..
        3.0,
        75, // ..
        4.0,
        125, // ..
        5.0,
        250, // ..
        6.0,
        500, // ..
        7.0,
        1000, // ..
        8.0,
        2000, // ..
        9.0,
        3500, // ..
        11.0
      ],
      'circle-color': 'rgb(165,15,21)'
    }
  }
}

export function deathsPCLayer () {
  return {
    id: 'deaths',
    type: 'circle',
    source: 'deaths',
    paint: {
      'circle-stroke-color': 'black',
      'circle-stroke-width': 1,
      'circle-opacity': 1,
      'circle-radius': [
        'step',
        ['get', 'rate'],
        0.0,
        1, // rate per 10k
        2.0,
        2, // ..
        3.0,
        3, // ..
        4.0,
        4, // ..
        5.0,
        5, // ..
        6.0,
        6, // ..
        7.0,
        7, // ..
        8.0,
        8, // ..
        9.0
      ],
      'circle-color': 'rgb(165,15,21)'
    }
  }
}
