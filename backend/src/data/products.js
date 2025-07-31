//
// In-memory list of toy/game products for PlayPals backend.
//

const products = [
  {
    id: 'p1',
    name: 'Rainbow Building Blocks',
    images: [
      'https://placehold.co/300x300/toy1-1.png',
      'https://placehold.co/300x300/toy1-2.png',
    ],
    price: 19.99,
    age: 3,
    brand: 'PlayBlox',
    description: 'Colorful stacking blocks to boost fine motor skills and creativity.',
    bestseller: true,
  },
  {
    id: 'p2',
    name: 'Jungle Animal Puzzle',
    images: [
      'https://placehold.co/300x300/toy2-1.png',
      'https://placehold.co/300x300/toy2-2.png',
    ],
    price: 12.5,
    age: 4,
    brand: 'EduPuzzle',
    description: 'A fun wooden puzzle with adorable jungle animals.',
    bestseller: false,
  },
  {
    id: 'p3',
    name: 'Dinosaur Adventure Kit',
    images: [
      'https://placehold.co/300x300/toy3-1.png'
    ],
    price: 24.95,
    age: 5,
    brand: 'JurassicKids',
    description: 'Dig for dinosaur bones & build your own dino figures!',
    bestseller: true,
  },
  {
    id: 'p4',
    name: 'Magic Water Art Set',
    images: [
      'https://placehold.co/300x300/toy4-1.png'
    ],
    price: 15,
    age: 3,
    brand: 'CraftyKids',
    description: 'Reusable water coloring set for mess-free creative play.',
    bestseller: false,
  },
  {
    id: 'p5',
    name: 'Shape Sorting Cube',
    images: [
      'https://placehold.co/300x300/toy5-1.png'
    ],
    price: 11,
    age: 3,
    brand: 'PlayBlox',
    description: 'Classic cube sorter to help toddlers learn shapes and colors.',
    bestseller: true,
  },
];

module.exports = products;
