import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    default: 'Exemple task send with swagger',
  })
  title: string;

  @ApiPropertyOptional({
    default: 'Exemple description send with swagger',
  })
  description?: string;

  @ApiPropertyOptional({
    default: false,
  })
  completed?: boolean;
}
