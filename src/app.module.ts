import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'trolley.proxy.rlwy.net',   
      port: 16592,                       
      username: 'postgres',              
      password: 'OntLpvbmaDvQudOFSERrcfcheKiFdOue', 
      database: 'railway',              
      autoLoadEntities: true,
      synchronize: true,                  
      ssl: {
        rejectUnauthorized: false,        
      },
    }),
  AuthModule
    
  ],
})
export class AppModule { }
