import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import ActivePlanDTO from './ActivePlanDTO';

@Injectable()
export class ActivePlansService {
  private cacheFilePath: string;

  constructor() {
    this.cacheFilePath = path.join(__dirname, '..', '..', 'src', 'cache', 'cache.json');
  }

  private async readCache(): Promise<Record<string, boolean>> {
    try {
      const data = await fs.promises.readFile(this.cacheFilePath, 'utf-8');
      return JSON.parse(data) as Record<string, boolean>;
    } catch (error) {
      console.error('Erro ao ler o arquivo de cache:', error);
      return {};
    }
  }

  private async writeCache(cache: Record<string, boolean>): Promise<void> {
    try {
      await fs.promises.writeFile(this.cacheFilePath, JSON.stringify(cache, null, 2), 'utf-8');
    } catch (error) {
      console.error('Erro ao escrever no arquivo de cache:', error);
      throw new Error('Falha ao salvar no cache');
    }
  }

  async setPlanoAtivo(data: ActivePlanDTO): Promise<void> {
    try {
      const codAssinatura = data.codAssinatura;
      const status = true;

      console.log('Registrando no cache:', codAssinatura, status);

      const cache = await this.readCache();

      cache[codAssinatura] = status;

      await this.writeCache(cache);

      console.log('Plano ativo registrado no cache!');

      const checkValue = await this.getPlanoAtivo(codAssinatura);
      console.log('Valor gravado no cache após set:', checkValue);
    } catch (error) {
      console.error('Erro ao tentar registrar o plano ativo:', error);
      throw new Error('Falha ao registrar o plano ativo no cache');
    }
  }

  async getPlanoAtivo(codAssinatura: string): Promise<boolean> {
    try {
      console.log('Buscando chave no cache:', codAssinatura);

      const cache = await this.readCache();

      const result = cache[codAssinatura];

      console.log('Resultado do cache:', result);

      return result === true;
    } catch (error) {
      console.error('Erro ao tentar obter o plano ativo:', error);
      return false;
    }
  }
}
