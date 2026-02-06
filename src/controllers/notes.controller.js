import { NoteMongoModel } from "../models/note.model.js";
import { clean, isEmpty, normalize } from "../utils/helpers.js";
import rateLimit from "express-rate-limit";

// Rate limit for note creation
const createNoteLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Limit each IP to 5 requests per windowMs
  message: "Too many notes created from this IP, please try again later.",
  standardHeaders: true,
  legacyHeaders: false,
});

// CREATE NOTE
export const createNote = [
  createNoteLimiter,
  async (req, res) => {
    try {
      let { title, content } = req.body || {};

      if (isEmpty(title) || isEmpty(content)) {
        return res.status(400).json({
          success: false,
          message: "title and content are required and cannot be empty",
        });
      }

      const note = await NoteMongoModel.create({
        title: clean(title),
        content: clean(content),
      });

      res.status(201).json({
        success: true,
        data: note,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },
];

// GET ALL NOTES
export const getAllNotes = async (req, res) => {
  try {
    const data = await NoteMongoModel.find().sort({ updatedAt: -1 });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE NOTE
export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    let { title, content } = req.body || {};

    const existing = await NoteMongoModel.findById(id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    if (title !== undefined) {
      if (isEmpty(title)) {
        return res.status(400).json({
          success: false,
          message: "title cannot be empty",
        });
      }
      title = clean(title);
    }

    if (content !== undefined) {
      if (isEmpty(content)) {
        return res.status(400).json({
          success: false,
          message: "content cannot be empty",
        });
      }
      content = clean(content);
    }

    const updates = {};
    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;

    if (Object.keys(updates).length === 0) {
      return res.json({
        success: true,
        message: "No changes detected",
        data: existing,
      });
    }

    const result = await NoteMongoModel.findByIdAndUpdate(id, updates, { new: true });

    res.json({
      success: true,
      message: "Note updated",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// SEARCH NOTES
export const searchNotes = async (req, res) => {
  try {
    let q = req.query.q;

    if (isEmpty(q)) {
      return res.status(400).json({
        success: false,
        message: "Search query cannot be empty",
      });
    }

    q = normalize(q);

    const data = await NoteMongoModel.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { content: { $regex: q, $options: "i" } },
      ],
    });

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
