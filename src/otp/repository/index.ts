import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { AbstractRepositoryMongoBase } from "src/common/base/repository-mongo.base";
import { OtpDocument, OtpEntity } from "../entity";

@Injectable()
export class OtpRepository extends AbstractRepositoryMongoBase<OtpDocument> {
    constructor(
        @InjectModel(OtpEntity.name)
        private readonly otpRepository: Model<OtpDocument>,
    ) {
        super(otpRepository);
    }
}
