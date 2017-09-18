const books = [
  {
    id: 1,
    title: 'Lord of the Flies',
    author: 'William Golding',
    price: '€7.50',
    genre: 'classic'
  },
  {
    id: 2,
    title: 'Treasure Island',
    author: 'Robert Louis Stevenson',
    price: '€7.50',
    genre: 'classic'
  },
  {
    id: 3,
    title: 'Animal Farm',
    author: 'George Orwell',
    price: '€7.50',
    genre: 'classic'
  },
  {
    id: 4,
    title: "The Hitchhiker's Guide to the Galaxy",
    author: 'Douglas Adams',
    price: '€7.50',
    genre: 'comedy'
  },
  {
    id: 5,
    title: 'Bossypants',
    author: 'Tina Fey',
    price: '€7.50',
    genre: 'comedy'
  },
  {
    id: 6,
    title: 'The Girl with the Dragon Tattoo',
    author: 'Stieg Larsson',
    price: '€7.50',
    genre: 'crime'
  },
  {
    id: 7,
    title: "The Cuckoo's Calling",
    author: 'Robert Galbraith',
    price: '€7.50',
    genre: 'crime'
  },
  {
    id: 8,
    title: 'And Then There Were None',
    author: 'Agatha Christie',
    price: '€7.50',
    genre: 'crime'
  },
  {
    id: 9,
    title: 'The Book Thief',
    author: 'Markus Zusak',
    price: '€7.50',
    genre: 'fiction'
  },
  {
    id: 10,
    title: 'Atonement',
    author: 'Ian McEwan',
    price: '€7.50',
    genre: 'fiction'
  },
  {
    id: 11,
    title: 'All The Light We Cannot See',
    author: 'Anthony Doerr',
    price: '€7.50',
    genre: 'fiction'
  },
  {
    id: 12,
    title: 'Gone Girl',
    author: 'Gillian Flynn',
    price: '€7.50',
    genre: 'horror'
  },
  {
    id: 13,
    title: 'Behind Closed Doors',
    author: 'B. A. Paris',
    price: '€7.50',
    genre: 'horror'
  },
  {
    id: 14,
    title: 'IT',
    author: 'Stephen King',
    price: '€7.50',
    genre: 'horror'
  },
  {
    id: 15,
    title: 'A Brief History of Time',
    author: 'Stephen Hawking',
    price: '€7.50',
    genre: 'non-fiction'
  },
  {
    id: 16,
    title: 'Tuesdays with Morrie',
    author: 'Mitch Alborn',
    price: '€7.50',
    genre: 'non-fiction'
  },
  {
    id: 17,
    title: 'Eats Shoots & Leaves',
    author: 'Lynne Truss',
    price: '€7.50',
    genre: 'non-fiction'
  },
  {
    id: 18,
    title: 'Eclipse',
    author: 'Stephanie Meyer',
    price: '€7.50',
    genre: 'young adult'
  },
  {
    id: 19,
    title: 'Mockingjay',
    author: 'Suzanne Collins',
    price: '€7.50',
    genre: 'young adult'
  },
  {
    id: 20,
    title: 'Harry Potter and the Deathly Hallows',
    author: 'J. K. Rowling',
    price: '€7.50',
    genre: 'young adult'
  },
  {
    id: 21,
    title: 'The Lion, the Witch and the Wardrobe',
    author: 'C. S. Lewis',
    price: '€7.50',
    genre: 'young adult'
  }
];

const genres = [
  {
    id: 0,
    name: 'all'
  },
  {
    id: 1,
    name: 'classic'
  },
  {
    id: 2,
    name: 'comedy'
  },
  {
    id: 3,
    name: 'crime'
  },
  {
    id: 4,
    name: 'fiction'
  },
  {
    id: 5,
    name: 'horror'
  },
  {
    id: 6,
    name: 'non-fiction'
  },
  {
    id: 7,
    name: 'young adult'
  }
];

function getBooks() {
  return new Promise(res => {
    setTimeout(() => {
      res(books);
    }, 2000);
  });
}
function getGenres() {
  return new Promise(res => {
    setTimeout(() => {
      res(genres);
    }, 1000);
  });
}
export default {
  getBooks,
  getGenres
};
