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
