import { ApiProperty } from '@nestjs/swagger';

export class AdminResponseDto {
  @ApiProperty({
    example: '1kvgfckkkkghlllljhfhjkkjhv',
    description: 'Unique id',
  })
  id: string;

  @ApiProperty({ example: 'email@gmail.com', description: 'User  email' })
  email: string;

  @ApiProperty({ example: 'Mark', description: 'User First name' })
  firstName: string;

  @ApiProperty({ example: 'Spencer', description: 'User Last name' })
  lastName: string;

  @ApiProperty({
    example: 'default',
    description: 'Color schema site',
    required: true,
  })
  colorSchema: string;

  @ApiProperty({
    example: 'default',
    description: 'Sample site',
    required: true,
  })
  public sample: string;
}
