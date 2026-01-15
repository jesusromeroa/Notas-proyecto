import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotesModule } from './notes/notes.module'; // <--- IMPORTANTE

@Module({
  imports: [
    // Conexión a Mongo. Si falla, prueba quitar '/ucab-tasks' y dejar solo 'mongodb://localhost:27017'
    MongooseModule.forRoot('mongodb://localhost:27017/ucab-tasks'), 
    NotesModule, // <--- Aquí conectamos tus notas al servidor
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}