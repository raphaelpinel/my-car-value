import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  async findOne(id: number) {
    const found = await this.repo.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return found;
  }

  async find({ email }: { email: string }) {
    const found = await this.repo.find({
      where: {
        email,
      },
    });
    if (!found?.length) {
      throw new NotFoundException('User not found');
    }
    return found;
  }

  async update({ id, attrs }: { id: number; attrs: Partial<User> }) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repo.remove(user);
  }
}
