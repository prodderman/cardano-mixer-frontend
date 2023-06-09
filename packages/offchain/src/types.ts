import { Script, applyDoubleCborEncoding } from 'lucid-cardano';
import z from 'zod';

export const PoolInfo = z.object({
  txHash: z.string(),
  nominal: z.string(),
  treeTokenUnit: z.string(),
  vaultTokenUnit: z.string(),
  nullifiersTokenUnit: z.string(),
  zeroValue: z.string(),
  treeHeight: z.number(),
  address: z.string(),
  script: z
    .object({
      type: z
        .literal('PlutusV1')
        .or(z.literal('PlutusV2'))
        .or(z.literal('Native')),
      script: z.string().transform(applyDoubleCborEncoding),
    })
    .refine<Script>((script): script is Script => true),
});

export type PoolInfo = z.output<typeof PoolInfo>;
