import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetBookDetailDto {
  @ApiProperty({
    example: '9791196171742',
    description: 'ISBN 13자리',
  })
  @IsString()
  isbn13: string;
}
