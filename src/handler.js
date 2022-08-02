const {nanoid} = require('nanoid');
const {notes} = require('./notes');

const addNoteHandler = (req, h) => {
  const {title, tags, body} = req.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const newNote = {
    id, title, createdAt, updatedAt, tags, body,
  };

  notes.push(newNote);

  const isSuccess = notes.filter((note) => (note.id === id).length > 0);

  let status = {
    status: 'error',
    message: 'Catatan gagal untuk ditambahkan',
  };

  if (isSuccess) {
    status = {
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    };

    const response = h.response(JSON.stringify(status));
    response.type('application/json');
    // response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');

    return response;
  }

  const response = h.response(JSON.stringify(status));
  response.type('application/json');
  response.code(500);
  // response.header('Access-Control-Allow-Origin', 'http://notesapp-v1.dicodingacademy.com');

  return response;
};

const getAllNoteHandler = (req, h) => ({
  status: 'success',
  data: {
    notes,
  },
});

const getNotesByIdHandler = (req, h) => {
  const {id} = req.params;

  const note = notes.find((note) => note.id === id);

  if (note) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });

  response.code(404);

  return response;
};

const editNoteById = (req, h) => {
  const {title, tags, body} = req.payload;

  const {id} = req.params;
  // const note = notes.find((note) => note.id === id);
  const uid = notes.findIndex((note) => note.id === id);

  const updatedAt = new Date().toISOString();

  if (uid !== -1) {
    // looks clunky
    // note.title = title;
    // note.tags = tags;
    // note.body = body;
    // note.updatedAt = updatedAt;

    notes[uid] = {
      ...notes[uid],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response(
        {
          status: 'success',
          message: 'Catatan berhasil diperbarui',
        });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id catatan tidak ditemukan',
  });

  response.code(404);

  return response;
};

const deleteNoteById = (req, h) => {
  const {id} = req.params;

  const uid = notes.findIndex((note) => note.id === id);

  if (uid !== -1) {
    notes.splice(uid, 1);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });

    response.code(200);

    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id catatan tidak ditemukan',
  });

  response.code(404);

  return response;
};

module.exports = {
  addNoteHandler,
  getAllNoteHandler,
  getNotesByIdHandler,
  editNoteById,
  deleteNoteById,
};
