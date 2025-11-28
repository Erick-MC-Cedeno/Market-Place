import { Injectable } from '@nestjs/common';

const bcrypt: any = (() => {
    try {
        // prefer native bcrypt (faster) when available
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require('bcrypt');
    } catch (e) {
        // fall back to bcryptjs (pure JS) if native bindings are missing
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require('bcryptjs');
    }
})();

@Injectable()
export class HashService {
    async comparePassword(password: string, hash: string) {
        return await bcrypt.compare(password, hash);
    }

    async hashPassword(password: string) {
        return await bcrypt.hash(password, 12);
    }
}