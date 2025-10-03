import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';



@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'postgres.railway.internal',
      port:5432,
      username:'postgres',
      password:'OntLpvbmaDvQudOFSERrcfcheKiFdOue',
      database:'railway',
      autoLoadEntities:true,
      synchronize:true,
    }),
    AuthModule
    
  ],
})
export class AppModule {}
