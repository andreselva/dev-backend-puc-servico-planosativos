import { Controller, Get, Param } from "@nestjs/common";
import { ActivePlansService } from "./ActivePlansService";
import { EventPattern, Payload } from "@nestjs/microservices";
import ActivePlanDTO from "./ActivePlanDTO";

@Controller('/activeplans')
export class ActivePlansController {
    constructor(
        private readonly service: ActivePlansService
    ) {}

    @Get('/:codassinatura')
    async getPlan(@Param('codassinatura') codassinatura: string) {
        return this.service.getPlanoAtivo(codassinatura);
    }

    @EventPattern('PAYMENT_REGISTERED')
    async setActivePlan(@Payload() data: ActivePlanDTO) {
        console.log('Registrando plano ativo');
        await this.service.setPlanoAtivo(data);
    }
}
