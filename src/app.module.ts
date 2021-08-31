import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';
import { Task } from './tasks/entities/task.entity';
import { LoggerMiddleware } from './logger.middleware';


@Module({
  imports: [UsersModule, TasksModule, AuthModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 8889,
    username: 'user',
    password: 'learn-nest',
    database: 'learn-nest',
    entities: [User, Task],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('/');
  }
}
