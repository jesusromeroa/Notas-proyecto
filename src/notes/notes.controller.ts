import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

/**
 * Controlador para gestionar las notas.
 *  - JSDoc requerido
 */
@ApiTags('notes')
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva nota' })
  create(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener listado general (sin contenido)' }) // 
  @ApiQuery({ name: 'sort', required: false, description: 'Campo para ordenar (title, createdAt, updatedAt)' })
  findAll(@Query('sort') sort?: string, @Query('filter') filter?: string) {
    return this.notesService.findAll(sort, filter);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener nota específica (con contenido)' }) // 
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modificar título o contenido de una nota' }) // [cite: 20]
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Eliminar una o varias notas por ID' }) // 
  @ApiQuery({ name: 'ids', isArray: true, type: String })
  remove(@Query('ids') ids: string | string[]) {
    // Manejo simple para convertir query param a array si es un string único
    const idsArray = Array.isArray(ids) ? ids : [ids];
    return this.notesService.removeMany(idsArray);
  }
}