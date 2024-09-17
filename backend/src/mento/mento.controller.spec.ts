import { Test, TestingModule } from '@nestjs/testing';
import { MentoController } from './mento.controller';

describe('MentoController', () => {
  let controller: MentoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MentoController],
    }).compile();

    controller = module.get<MentoController>(MentoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
