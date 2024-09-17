import { Test, TestingModule } from '@nestjs/testing';
import { MentoService } from './mento.service';

describe('MentoService', () => {
  let service: MentoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MentoService],
    }).compile();

    service = module.get<MentoService>(MentoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
