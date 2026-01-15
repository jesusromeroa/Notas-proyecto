import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
  @ApiProperty({ example: 'Comprar comida', description: 'El título de la nota' })
  title: string;

  @ApiProperty({ example: 'Leche, Huevos, Pan', description: 'Contenido de la nota' })
  content: string;
}