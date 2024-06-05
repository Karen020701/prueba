const { gql } = require('apollo-server-express');

// Definir el esquema GraphQL
const typeDefs = gql`
  type Book {
    id: ID!
    title: String!
    autor: String!
    year: Int!
    coverImage: String
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, autor: String!, year: Int!, coverImage: String): Book
    updateBook(id: ID!, title: String!, autor: String!, year: Int!, coverImage: String): Book
    deleteBook(id: ID!): Book
  }
`;

// Datos de los libros (simulados)
let books = [
    {
        id: '1',
        title: 'La Isla Misteriosa',
        autor: 'Julio Verne',
        year: 1874,
        coverImage: 'https://images.cdn3.buscalibre.com/fit-in/360x360/4d/4f/4d4f33cfee946000b81e5ffab59340dd.jpg'
    },
    {
        id: '2',
        title: 'Once Minutos',
        autor: 'Paulo Cohelo',
        year: 2003,
        coverImage: 'https://www.planetadelibros.com.ec/usuaris/libros/fotos/363/m_libros/362355_portada_once-minutos_paulo-coelho_202012281134.jpg'
    },
    {
        id: '3',
        title: 'Cumandá',
        autor: 'Juan León Mera',
        year: 1879,
        coverImage: 'https://www.radmandi.com/wp-content/uploads/2019/01/literatura-ariel-clasicos-ecuatorianos-cumanda.jpg'
    }
];

// Resolvers para las consultas y mutaciones
const resolvers = {
    Query: {
        books: () => books,
        book: (_, { id }) => books.find(book => book.id === id),
    },
    Mutation: {
        addBook: (_, { title, autor, year, coverImage }) => {
            const id = String(books.length + 1);
            const newBook = { id, title, autor, year, coverImage };
            books.push(newBook);
            return newBook;
        },
        updateBook: (_, { id, title, autor, year, coverImage }) => {
            const index = books.findIndex(book => book.id === id);
            if (index === -1) {
                throw new Error('Book not found');
            }
            books[index] = { ...books[index], title, autor, year, coverImage };
            return books[index];
        },
        deleteBook: (_, { id }) => {
            const index = books.findIndex(book => book.id === id);
            if (index === -1) {
                throw new Error('Book not found');
            }
            const [deletedBook] = books.splice(index, 1);
            return deletedBook;
        }
    }
};

module.exports = { typeDefs, resolvers };
