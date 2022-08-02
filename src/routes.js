const {
  addNoteHandler,
  getAllNoteHandler,
  getNotesByIdHandler,
  editNoteById,
  deleteNoteById} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
    // options: {
    //   cors: {
    //     origin: ['http://notesapp-v1.dicodingacademy.com'],
    //   },
    // },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNoteHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNotesByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteById,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteById,
  },
];


module.exports = {routes};
