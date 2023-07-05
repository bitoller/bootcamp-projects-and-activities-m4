import { z } from "zod";
import { addressCreateSchema, addressSchema } from "../schemas/address.schema";
import { Repository } from "typeorm";
import { Address } from "../entities";

export type TAddress = z.infer<typeof addressSchema>;
export type AddressCreate = z.infer<typeof addressCreateSchema>;
export type AddressRepo = Repository<Address>;
