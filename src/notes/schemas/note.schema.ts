import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ required: true })
  title: string; // 

  @Prop({ required: true })
  content: string; // 

  @Prop({ default: Date.now })
  createdAt: Date; // 

  @Prop({ default: Date.now })
  updatedAt: Date; // [cite: 11, 19]
}

export const NoteSchema = SchemaFactory.createForClass(Note);

// Middleware para actualizar updatedAt automáticamente
NoteSchema.pre('save', function() {
  // Simplemente actualizamos el valor.
  // Al no pedir el parámetro 'next', Mongoose asume que es síncrono.
  this.updatedAt = new Date();
});