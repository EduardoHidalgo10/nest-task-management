import { Repository } from "typeorm";
import { User } from "./user.entity";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersRepository {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;

        // hash
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt)



        const user = this.userRepository.create({ username, password: hashedPassword });
        try {
            await this.userRepository.save(user);

        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Username already exists');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findByUsername(username: string): Promise<User | null> {
        return await this.userRepository.findOneBy({ username });
    }
}