import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        index: true
    }
}, { timestamps: true });

export const NoteMongoModel = mongoose.model('Note', noteSchema);

export class NoteModel {

  // -------- CREATE NOTE --------
  static create({ title, content }) {
    const note = {
      id: Date.now().toString(),

      title,
      content,

      created_at: new Date(),
      updated_at: new Date(),
    };

    notes.push(note);

    return note;
  }

  // -------- GET ALL (sorted) --------
  static findAll() {
    return [...notes].sort(
      (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
    );
  }

  // -------- FIND BY ID --------
  static findById(id) {
    return notes.find((note) => note.id === id);
  }

  // -------- UPDATE --------
  static update(id, data) {
    const note = notes.find((n) => n.id === id);

    if (!note) return null;

    let changed = false;

    // update title
    if (
      data.title !== undefined &&
      data.title !== note.title
    ) {
      note.title = data.title;
      changed = true;
    }

    // update content
    if (
      data.content !== undefined &&
      data.content !== note.content
    ) {
      note.content = data.content;
      changed = true;
    }

    if (!changed) {
      return { note, changed: false };
    }

    note.updated_at = new Date();

    return { note, changed: true };
  }

  // -------- SEARCH --------
  static search(query) {
    const q = query.toLowerCase();

    return notes.filter((note) => {
      const text = (
        note.title +
        " " +
        note.content
      ).toLowerCase();

      return text.includes(q);
    });
  }
}
