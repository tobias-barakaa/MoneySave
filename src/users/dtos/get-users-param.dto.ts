import { IsInt, IsOptional } from "class-validator";
import { Type } from "class-transformer";
import { ApiPropertyOptional } from "@nestjs/swagger";

export class GetUsersParamDto {
    @ApiPropertyOptional({
        description: 'ID of the user',
        type: Number,
        example: 1,
        required: false,
        default: 1
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    id: number;

}