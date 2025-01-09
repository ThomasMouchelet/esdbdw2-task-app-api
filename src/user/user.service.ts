import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.save(createUserDto);

    delete user.password;

    return user;
  }

  findAll(): Promise<UserEntity[]> {
    return this.userRepository.createQueryBuilder('user').getMany();
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneById(id: number): Promise<UserEntity> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id })
      // exclude password
      .addSelect('user.password', 'password')
      .getOne();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.findOneById(id);

    const updateUser = {
      ...user,
      ...updateUserDto,
    };

    await this.userRepository.update(id, updateUserDto);

    return updateUser;
  }

  async remove(id: number): Promise<any> {
    await this.findOneById(id);

    return this.userRepository.softDelete(id);
  }
}
