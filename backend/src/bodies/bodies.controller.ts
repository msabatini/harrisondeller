import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BodiesService } from './bodies.service';
import { CreateBodyDto } from './dto/create-body.dto';
import { UpdateBodyDto } from './dto/update-body.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('bodies')
export class BodiesController {
  constructor(private readonly bodiesService: BodiesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createBodyDto: CreateBodyDto) {
    return this.bodiesService.create(createBodyDto);
  }

  @Get()
  findAll() {
    return this.bodiesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  findAllAdmin() {
    return this.bodiesService.findAllAdmin();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bodiesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBodyDto: UpdateBodyDto) {
    return this.bodiesService.update(id, updateBodyDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bodiesService.remove(id);
  }
}
