import { Controller, Get } from '@nestjs/common';

@Controller('roles')
export class RolesController {
  @Get()
  rolesHistory(): string {
    return 'Roles history page';
  }
  @Get('demo-page')
  rolesHistoryDemo(): string {
    return 'Roles history demo page';
  }
}
