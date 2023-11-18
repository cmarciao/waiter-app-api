import { Controller, Post } from '@nestjs/common';
import { HistoricService } from './historic.service';

@Controller('historic')
export class HistoricController {
    constructor(private readonly historicService: HistoricService) {}

    @Post()
    create() {
        return this.historicService.create();
    }
}
