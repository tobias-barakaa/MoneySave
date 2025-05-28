import { Injectable } from '@nestjs/common';
import { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
    public async hashPassword(data: string | Buffer): Promise<string> {
        // generate salt
        const bcrypt = await import('bcrypt');
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(data.toString(), salt);
    }
    
    async comparePassword(
        data: string | Buffer,
        encrypted: string
    ): Promise<boolean> {
        const bcrypt = await import('bcrypt');
        return bcrypt.compare(data, encrypted)
    }
}
