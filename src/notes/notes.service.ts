import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from './schemas/note.schema';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  // Crear nota
  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = new this.noteModel(createNoteDto);
    return createdNote.save();
  }

  // Listado General: Filtrado y Ordenamiento 
  // IMPORTANTE: Excluir el campo 'content' en la proyección
  async findAll(sort?: string, filter?: string): Promise<Note[]> {
    let query = this.noteModel.find().select('-content'); //  Excluye contenido

    if (filter) {
      // Ejemplo simple de filtro por título
      query = query.where('title', new RegExp(filter, 'i'));
    }

    if (sort) {
      // sort puede ser 'title', 'createdAt', 'updatedAt'
      const sortObj = {};
      sortObj[sort] = 1; // 1 para ascendente
      query = query.sort(sortObj);
    }

    return query.exec();
  }

  // Búsqueda específica: Trae todo incluyendo contenido 
  async findOne(id: string): Promise<Note> {
    const note = await this.noteModel.findById(id).exec();
    if (!note) throw new NotFoundException(`Nota con ID ${id} no encontrada`);
    return note;
  }

  // Actualizar: Solo título y contenido, updateAt automático
  async update(id: string, updateNoteDto: UpdateNoteDto): Promise<Note> {
    const updatedNote = await this.noteModel.findByIdAndUpdate(
      id, 
      { ...updateNoteDto, updatedAt: new Date() }, 
      { new: true }
    ).exec();

    // Si no encuentra la nota, lanzamos un error 404 (igual que en findOne)
    if (!updatedNote) {
      throw new NotFoundException(`Nota con ID ${id} no encontrada`);
    }

    return updatedNote;
  }

  // Eliminar: Acepta uno o varios IDs 
  async removeMany(ids: string[]): Promise<any> {
    return this.noteModel.deleteMany({ _id: { $in: ids } }).exec();
  }
}