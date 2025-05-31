import { IsNotEmpty } from "class-validator";

export class GoggleTokenDto {
    @IsNotEmpty()
    token: string;

    
}