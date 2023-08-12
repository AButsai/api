import { Controller } from '@nestjs/common';
import { PasswordService } from './password.service';

@Controller('api/password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  // Request for change password

  // Change password
}
