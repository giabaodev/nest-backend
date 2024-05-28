import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}
  create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(createCategoryDto);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category | null> {
    const findCate = await this.categoryRepository.findOneBy({ id });
    if (!findCate) throw new NotFoundException('Category not found');
    return findCate;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const updateCategory = await this.categoryRepository.update(
      id,
      updateCategoryDto,
    );
    if (updateCategory.affected > 0)
      return await this.categoryRepository.findOneBy({ id });
    throw new BadRequestException('Failed to update');
  }

  remove(id: number): string {
    return `This action removes a #${id} category`;
  }
}
