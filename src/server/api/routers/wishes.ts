import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const wishRouter = createTRPCRouter({
	getAll: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.wish.findMany();
	}),
	addWish: publicProcedure
		.input(
			z.object({
				wishName: z.string(),
				linkToProduct: z.string().nullish(),
			})
		)
		.mutation(({ input, ctx }) => {
			const { wishName, linkToProduct } = input;

			return ctx.prisma.wish.create({
				data: {
					name: wishName,
					linkToProduct: linkToProduct,
				},
			});
		}),
	reserveWish: publicProcedure
		.input(z.object({ wishId: z.string(), wishIsReserved: z.boolean() }))
		.mutation(({ input, ctx }) => {
			const { wishId, wishIsReserved } = input;

			return ctx.prisma.wish.update({
				where: {
					id: wishId,
				},
				data: {
					reserved: wishIsReserved,
				},
			});
		}),
});
