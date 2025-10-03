import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { environment as envLocal } from './environments/environment.local';
import { environment as envProd } from './environments/environment.prod';

const env = process.env.NODE_ENV === 'production' ? envProd : envLocal;


@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: env.database.host,
      port: env.database.port,
      username: env.database.username,
      password: env.database.password,
      database: env.database.name,
      autoLoadEntities: true,
      synchronize: true, 
      ssl: env.database.ssl,
    }),
  AuthModule
    
  ],
})
export class AppModule { }
