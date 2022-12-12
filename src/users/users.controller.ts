import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    const { email, password } = body;
    this.usersService.create(email, password);
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id));
  }

  @Get('/')
  getUserByEmail(@Query('email') email: string) {
    return this.usersService.find({ email });
  }

  @Patch('/:id')
  updateUser(@Param('id') id, @Body() attrs: Partial<CreateUserDto>) {
    return this.usersService.update({ id, attrs });
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
}
